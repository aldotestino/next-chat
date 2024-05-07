import { relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp, unique } from 'drizzle-orm/pg-core';
import message from './message';

const chat = pgTable('chat', {
  id: serial('id').primaryKey(),
  userId1: text('user_id_1').notNull(),
  userId2: text('user_id_2').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
}, t => ({
  unique: unique().on(t.userId1, t.userId2)
}));

export const chatRelations = relations(chat, ({ many }) => ({
  messages: many(message)
}));

export default chat;