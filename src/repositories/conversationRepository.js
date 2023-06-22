const { Pool } = require('pg');
const config = require('../config');
const Conversation = require('../models/Conversation');

const pool = new Pool(config.postgres);

class ConversationRepository {
  async create(conversation) {
    const query = 'INSERT INTO conversations (conversation_id, link, message_count) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT conversation_id FROM conversations WHERE conversation_id = $1)';
    
    // const query = 'INSERT INTO conversations (conversation_id, link, message_count) VALUES ($1, $2, $3) RETURNING *';
    const values = [conversation.conversationId, conversation.link, conversation.messageCount];

    const client = await pool.connect();
    try {
      await client.query(query, values);
    } finally {
      client.release();
    }
  }

  async findAll() {
    const query = 'SELECT * FROM conversations';

    const client = await pool.connect();
    try {
      const result = await client.query(query);
      return result.rows.map(row => new Conversation(row.conversationId, row.link, row.messageCount));
    } finally {
      client.release();
    }
  }
}

module.exports = ConversationRepository;
