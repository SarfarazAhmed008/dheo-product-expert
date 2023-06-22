const { getPageConversations } = require('../utils/facebookUtils');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const ConversationRepository = require('../repositories/conversationRepository');
const MessageRepository = require('../repositories/messageRepository');
const config = require('../config');

const conversationRepository = new ConversationRepository();
const messageRepository = new MessageRepository();

const fetchAndStoreConversations = async () => {
  const { accessToken, pageId } = config.facebook;

  const conversations = await getPageConversations(accessToken, pageId);

  for (const conversation of conversations) {
    const conversationItem = new Conversation(conversation.id, conversation.link, conversation.message_count);
    await conversationRepository.create(conversationItem);
  }

  console.log('Conversation stored successfully!');
};

// const fetchAndStoreConversations = async () => {
//   const { accessToken, pageId } = config.facebook;

//   const conversations = await getPageConversations(accessToken, pageId);

//   for (const conversation of messages) {
//     const { data: conversationData } = conversation.messages;

//     for (const messageData of conversationData) {
//       //add created time
//       const message = new Message(messageData.id, messageData.message); // add time and sender
//       await messageRepository.create(message);
//     }
//   }

//   console.log('Messages stored successfully!');
// };

module.exports = { fetchAndStoreConversations };
