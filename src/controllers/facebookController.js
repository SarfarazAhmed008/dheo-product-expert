const { getAccessToken, getPageMessages } = require('../utils/facebookUtils');
const Message = require('../models/Message');
const MessageRepository = require('../repositories/messageRepository');
const config = require('../config');

const messageRepository = new MessageRepository();

const fetchAndStoreMessages = async () => {
  const { accessToken, pageId } = config.facebook;

  const messages = await getPageMessages(accessToken, pageId);

  for (const conversation of messages) {
    const { data: conversationData } = conversation.messages;

    for (const messageData of conversationData) {
      const message = new Message(messageData.id, messageData.message.text);
      await messageRepository.create(message);
    }
  }

  console.log('Messages stored successfully!');
};

module.exports = { fetchAndStoreMessages };
