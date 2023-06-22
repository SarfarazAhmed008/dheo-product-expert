const axios = require('axios');
const config = require('../config');

const getAccessToken = async () => {
  const { appId, appSecret } = config.facebook;

  const response = await axios.get(
    `https://graph.facebook.com/v13.0/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&grant_type=client_credentials`
  );

  return response.data.access_token;
};

const getPageConversations = async (accessToken, pageId) => {
  const response = await axios.get(
    `https://graph.facebook.com/v16.0/${pageId}/conversations?
    fields=link,id,message_count,updated_time&access_token=${accessToken}`
  );

  return response.data.data;
};

const getConversationMessages = async (accessToken, conversationId) => {
  const response = await axios.get(
    `https://graph.facebook.com/v16.0/${conversationId}?
    fields=messages{id,message,from,to,created_time}&access_token=${accessToken}`
  );

  return response.data.messages;
};

module.exports = { getAccessToken, getPageConversations, getConversationMessages };
