class Message {
    constructor(messageId, messageText, fromMessage, toMessage, createdTime, conversationId) {
      this.messageId = messageId;
      this.messageText = messageText;
      this.fromMessage = fromMessage;
      this.toMessage = toMessage;
      this.createdTime = createdTime;
      this.conversationId = conversationId;
    }
  }
  
  module.exports = Message;
  