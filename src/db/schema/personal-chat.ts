import { pgTable, integer, text } from 'drizzle-orm/pg-core';
import chat from './chat';
import { relations } from 'drizzle-orm';

const personalChat = pgTable('personal_chat', {
  chatId: integer('chat_id').notNull().references(() => chat.id).primaryKey(),
  user1: text('user1').notNull(),
  user2: text('user2').notNull()
});

export const personalChatRelations = relations(personalChat, ({ one }) => ({
  chat: one(chat, {
    fields: [personalChat.chatId],
    references: [chat.id]
  })
}));

export default personalChat;