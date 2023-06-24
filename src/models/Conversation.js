class Conversation {
    constructor(conversationId, link, messageCount, updatedTime, responseTimeDifference) {
      this.conversationId = conversationId;
      this.link = link;
      this.messageCount = messageCount;
      this.updatedTime = updatedTime;
      this.responseTimeDifference = responseTimeDifference;
    }
  }
  
  module.exports = Conversation;
  