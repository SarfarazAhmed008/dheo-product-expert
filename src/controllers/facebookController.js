const { getPageConversations, getConversationMessages } = require('../utils/facebookUtils');
const { formatTime, isWithin24Hours } = require('../utils/timeUtils');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const ConversationRepository = require('../repositories/conversationRepository');
const MessageRepository = require('../repositories/messageRepository');
const databaseController = require('./databaseController');
const config = require('../config');

const conversationRepository = new ConversationRepository();
const messageRepository = new MessageRepository();

const fetchAndStoreConversations = async (req, res) => {
  try {
    await fetchAndStoreConversationsAction();
    await databaseController.getConversations(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const fetchAndStoreConversationsAction = async() => {
  const { accessToken, pageId } = config.facebook;
  const conversations = await getPageConversations(accessToken, pageId);

  for (const conversation of conversations) {
    const conversationItem = new Conversation(conversation.id, conversation.link, 
      conversation.message_count, conversation.updated_time);
    await conversationRepository.create(conversationItem);
  }
  console.log('Conversation updated successfully!');
};

const fetchConversationMessages = async (req, res) => {
  const { accessToken } = config.facebook;
  const { conversationId } = req.params;
  try {
    const messages = await getConversationMessages(accessToken, conversationId);
    const { data: messageListData } = messages;
  
    for (const messageData of messageListData) {
      const message = new Message(messageData.id, messageData.message, messageData.from.name, 
        messageData.to.data[0].name, messageData.created_time, conversationId, messageData.from.id, messageData.to.data[0].id);
      await messageRepository.create(message);
    }
    console.log('Messages stored successfully!');
    await databaseController.getMessages(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const fetchLatestConversations = async (req, res) => {
  const { pageId, accessToken } = config.facebook;
  try {
    await fetchAndStoreConversationsAction();
    const conversationList = await databaseController.getLatestConversations();

    //response time
    const newConversationList = [];
    for(const conversationItem of conversationList){
      //insert all messages for latest conversation
      const messages = await getConversationMessages(accessToken, conversationItem.conversationId);
      const { data: messageListData } = messages;

      for (const messageData of messageListData) {
        const message = new Message(messageData.id, messageData.message, messageData.from.name, 
          messageData.to.data[0].name, messageData.created_time, conversationItem.conversationId, messageData.from.id, messageData.to.data[0].id);
        await messageRepository.create(message);
      }


      const messageList = await databaseController.getMessagesAction(conversationItem.conversationId);
      //new conversation list
      if(isWithin24Hours(messageList[0].createdTime)){
        newConversationList.push(conversationItem);
      }

      var customerMessageCreatedTime;
      var pageMessageCreatedTime
      if(messageList[0].toMessageId == pageId){
        //client message
        customerMessageCreatedTime = new Date(messageList[0].createdTime).getTime();
        for(const messageItem of messageList){
          if(messageItem.fromMessageId == pageId){
            //page response
            pageMessageCreatedTime = new Date(messageItem.createdTime).getTime();
            break;
          }
        }
        const timeDifferenceInSeconds = (pageMessageCreatedTime - customerMessageCreatedTime) / 1000;
        conversationItem.responseTimeDifference = formatTime(timeDifferenceInSeconds);
      }else{
        //page first - do nothing
      }
    }
    res.status(200).json({"all_list" : conversationList, "new_list" : newConversationList});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { fetchAndStoreConversations, fetchConversationMessages, fetchLatestConversations };
