const MessageRepository = require('../repositories/messageRepository');
const ConversationRepository = require('../repositories/conversationRepository');

const conversationRepository = new ConversationRepository();
const messageRepository = new MessageRepository();

const getConversations = async (req, res) => {
  try {
    const conversations = await conversationRepository.findAll();
    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await messageRepository.findAll(conversationId);
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getMessageById = async (messageId) => {
  const message = await messageRepository.findById(messageId);
  return message;
};

module.exports = { getConversations, getMessages, getMessageById };
