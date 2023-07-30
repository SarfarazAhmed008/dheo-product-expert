const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool(config.postgres);

class ConfigRepository {
  async createTables() {
    const createConversationsTable = `
      CREATE SEQUENCE IF NOT EXISTS conversations_id_seq;
      CREATE TABLE IF NOT EXISTS public.conversations
      (
          id integer NOT NULL DEFAULT nextval('conversations_id_seq'::regclass),
          conversation_id text COLLATE pg_catalog."default",
          link text COLLATE pg_catalog."default",
          message_count integer,
          updated_time text COLLATE pg_catalog."default",
          CONSTRAINT conversations_pkey PRIMARY KEY (id),
          CONSTRAINT conversations_conversation_id_key UNIQUE (conversation_id)
      )
    `;

    const createMessagesTable = `
      CREATE SEQUENCE IF NOT EXISTS messages_id_seq;
      CREATE TABLE IF NOT EXISTS public.messages
      (
          id integer NOT NULL DEFAULT nextval('messages_id_seq'::regclass),
          message_id text COLLATE pg_catalog."default",
          message_text text COLLATE pg_catalog."default",
          from_message text COLLATE pg_catalog."default",
          to_message text COLLATE pg_catalog."default",
          created_time text COLLATE pg_catalog."default",
          conversation_id text COLLATE pg_catalog."default",
          from_message_id text COLLATE pg_catalog."default",
          to_message_id text COLLATE pg_catalog."default",
          CONSTRAINT messages_pkey PRIMARY KEY (id)
      )
    `;

    const client = await pool.connect();
    try {
      await client.query(createConversationsTable);
      await client.query(createMessagesTable);
    } finally {
      client.release();
    }
  }
}

module.exports = ConfigRepository;
