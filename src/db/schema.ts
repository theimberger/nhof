import { pgTable, serial, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const names = pgTable('names', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  userId: integer('user_id'),
  bio: text('bio'),
  score: integer('score').default(0),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export type Name = typeof names.$inferSelect;
export type NewName = typeof names.$inferInsert;
