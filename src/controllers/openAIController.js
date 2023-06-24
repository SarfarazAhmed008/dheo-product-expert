const { gptResponse } = require('../utils/openAIUtils');
const databaseController = require('./databaseController');

const { Configuration, OpenAIApi } = require("openai");
const config = require('../config');

const configuration = new Configuration({
    apiKey: config.openai.apiKey
});
const openai = new OpenAIApi(configuration);

const getGPTResponse = async (req, res) => {
  try {
    const response = await gptResponse([{ role: "user", content: "hello" }]);
    res.status(200).json({message: response});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getGPTResponseByMessageId = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await databaseController.getMessageById(messageId);
    const response = await gptResponse([{ role: "user", content: message[0].messageText }]);
    res.status(200).json({message: response});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getGPTResponseByConversationId = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messagesList = await databaseController.getMessagesAction(conversationId);
    var messageContents = [];
    for(const messageItem of messagesList){
      var messageContent = {role: "user", content: messageItem.messageText};
      messageContents.push(messageContent);
    }
    const response = await gptResponse(messageContents);
    res.status(200).json({message: response});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getGPTResponse, getGPTResponseByMessageId, getGPTResponseByConversationId };
