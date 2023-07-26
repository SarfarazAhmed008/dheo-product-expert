const { Configuration, OpenAIApi } = require("openai");
const config = require('../config');

const configuration = new Configuration({
    apiKey: config.openai.apiKey
});
const openai = new OpenAIApi(configuration);

const gptResponse = async (messageContents) => {
    try {
        const chatCompletion = await openai.createChatCompletion({
            // model: "gpt-3.5-turbo",
            model: "gpt-3.5-turbo-16k",
            // messages: [{ role: "user", content: messageText }],
            messages: messageContents,
            max_tokens: 700,
            // temperature: 0.7
        });
        return chatCompletion.data.choices[0].message.content;
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
};

module.exports = { gptResponse };