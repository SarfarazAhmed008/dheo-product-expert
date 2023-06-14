const { Pool } = require('pg');
const config = require('../config');
const Message = require('../models/Message');

const pool = new Pool(config.postgres);

class MessageRepository {
  async create(message) {
    const query = 'INSERT INTO messages (id, text, time) VALUES ($1, $2, $3) RETURNING *';
    const values = [message.id, message.messageText, message.createdTime];

    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return new Message(result.rows[0].id, result.rows[0].messageText, result.rows[0].createdTime);
    } finally {
      client.release();
    }
  }

  async findAll() {
    const query = 'SELECT * FROM messages';

    const client = await pool.connect();
    try {
      const result = await client.query(query);
      return result.rows.map(row => new Message(row.id, row.messageText, row.createdTime));
    } finally {
      client.release();
    }
  }
}

module.exports = MessageRepository;
