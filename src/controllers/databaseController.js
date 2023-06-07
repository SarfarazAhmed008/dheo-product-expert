const MessageRepository = require('../repositories/messageRepository');

const messageRepository = new MessageRepository();

const getMessages = async (req, res) => {
  try {
    const messages = await messageRepository.findAll();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getMessages };
