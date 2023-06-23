const { Pool } = require('pg');
const config = require('../config');
const Conversation = require('../models/Conversation');

const pool = new Pool(config.postgres);

class ConversationRepository {
  async create(conversation) {
    const query = 'INSERT INTO conversations (conversation_id, link, message_count, updated_time) VALUES ($1, $2, $3, $4) ON CONFLICT (conversation_id) DO UPDATE SET link = EXCLUDED.link, message_count = EXCLUDED.message_count, updated_time = EXCLUDED.updated_time';
    const values = [conversation.conversationId, conversation.link, conversation.messageCount, conversation.updatedTime];

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
      return result.rows.map(row => new Conversation(row.conversation_id, row.link, row.message_count, row.updated_time));
    } finally {
      client.release();
    }
  }

  async findAllLatest() {
    const query = "SELECT * FROM conversations WHERE updated_time::timestamp with time zone >= NOW() - INTERVAL '24 hours'";

    const client = await pool.connect();
    try {
      const result = await client.query(query);
      return result.rows.map(row => new Conversation(row.conversation_id, row.link, row.message_count, row.updated_time));
    } finally {
      client.release();
    }
  }
}

module.exports = ConversationRepository;
