const axios = require('axios');
const config = require('../config');

const getAccessToken = async () => {
  const { appId, appSecret } = config.facebook;

  const response = await axios.get(
    `https://graph.facebook.com/v13.0/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&grant_type=client_credentials`
  );

  return response.data.access_token;
};

const getPageMessages = async (accessToken, pageId) => {
  const response = await axios.get(
    `https://graph.facebook.com/v16.0/${pageId}/conversations?fields=messages&access_token=${accessToken}`

    // 'https://graph.facebook.com/v16.0/$pageId/conversations?access_token=$accessToken'
  );

  console.log(response.data.data);
  return response.data.data;
};

module.exports = { getAccessToken, getPageMessages };
