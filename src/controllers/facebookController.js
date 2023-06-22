const { getPageConversations, getConversationMessages } = require('../utils/facebookUtils');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const ConversationRepository = require('../repositories/conversationRepository');
const MessageRepository = require('../repositories/messageRepository');
const databaseController = require('./databaseController');
const config = require('../config');

const conversationRepository = new ConversationRepository();
const messageRepository = new MessageRepository();

const fetchAndStoreConversations = async (req, res) => {
  const { accessToken, pageId } = config.facebook;
  try {
    const conversations = await getPageConversations(accessToken, pageId);

    for (const conversation of conversations) {
      const conversationItem = new Conversation(conversation.id, conversation.link, 
        conversation.message_count, conversation.updated_time);
      await conversationRepository.create(conversationItem);
    }
    console.log('Conversation stored successfully!');
    await databaseController.getConversations(req, res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const fetchConversationMessages = async (req, res) => {
  const { accessToken } = config.facebook;
  const { conversationId } = req.params;
  try {
    const messages = await getConversationMessages(accessToken, conversationId);
    const { data: messageListData } = messages;
  
    for (const messageData of messageListData) {
      const message = new Message(messageData.id, messageData.message, messageData.from.name, 
        messageData.to.data[0].name, messageData.created_time, conversationId);
      await messageRepository.create(message);
    }
    console.log('Messages stored successfully!');
    await databaseController.getMessages(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { fetchAndStoreConversations, fetchConversationMessages };
