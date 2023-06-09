const { Pool } = require('pg');
const config = require('../config');
const Message = require('../models/Message');

const pool = new Pool(config.postgres);

class MessageRepository {
  async create(message) {
    const query = 'INSERT INTO messages (message_id, message_text, from_message, to_message, created_time, conversation_id, from_message_id, to_message_id) SELECT $1, $2, $3, $4, $5, $6, $7, $8 WHERE NOT EXISTS (SELECT message_id FROM messages WHERE message_id = $1)';
    
    const values = [message.messageId, message.messageText, message.fromMessage, message.toMessage, message.createdTime, message.conversationId, message.fromMessageId, message.toMessageId];

    const client = await pool.connect();
    try {
      await client.query(query, values);
    } finally {
      client.release();
    }
  }

  async findAll(conversationId) {
    const query = 'SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_time ASC';
    const value = [conversationId];

    const client = await pool.connect();
    try {
      const result = await client.query(query, value);
      return result.rows.map(row => new Message(row.message_id, row.message_text, row.from_message, row.to_message, row.created_time, row.conversation_id, row.from_message_id, row.to_message_id));
    } finally {
      client.release();
    }
  }

  async findById(messageId) {
    const query = 'SELECT * FROM messages WHERE message_id = $1 ORDER BY created_time ASC';
    const value = [messageId];

    const client = await pool.connect();
    try {
      const result = await client.query(query, value);
      return result.rows.map(row => new Message(row.message_id, row.message_text, row.from_message, row.to_message, row.created_time, row.conversation_id, row.from_message_id, row.to_message_id));
    } finally {
      client.release();
    }
  }
}

module.exports = MessageRepository;
