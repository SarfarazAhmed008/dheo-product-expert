class Message {
    constructor(messageId, messageText, fromMessage, toMessage, createdTime, 
      conversationId, fromMessageId, toMessageId) {
      this.messageId = messageId;
      this.messageText = messageText;
      this.fromMessage = fromMessage;
      this.toMessage = toMessage;
      this.createdTime = createdTime;
      this.conversationId = conversationId;
      this.fromMessageId = fromMessageId;
      this.toMessageId = toMessageId;
    }
  }
  
  module.exports = Message;
  