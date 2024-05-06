import { relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import personalChat from './personal-chat';
import message from './message';

const chat = pgTable('chat', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export const chatRelations = relations(chat, ({ one, many }) => ({
  messages: many(message),
  personalChat: one(personalChat, {
    fields: [chat.id],
    references: [personalChat.chatId]
  })
}));

export default chat;