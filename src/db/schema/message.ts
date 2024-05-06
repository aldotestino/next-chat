import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import chat from './chat';
import { relations } from 'drizzle-orm';

const message = pgTable('message', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  userId: text('user_id').notNull(),
  chatId: integer('chat_id').notNull().references(() => chat.id),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export const messageRelations = relations(message, ({ one }) => ({
  chat: one(chat, {
    fields: [message.chatId],
    references: [chat.id]
  })
}));

export default message;