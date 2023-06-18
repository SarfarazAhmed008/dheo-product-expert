class Message {
    constructor(id, messageText, createdTime, sender) {
      this.id = id;
      this.messageText = messageText;
      this.createdTime = createdTime;
      this.sender = sender;
    }
  }
  
  module.exports = Message;
  