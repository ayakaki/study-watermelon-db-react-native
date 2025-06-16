import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
  version: 3,
  tables: [
    tableSchema({
      name: 'posts',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'subtitle', type: 'string', isOptional: true },
        { name: 'body', type: 'string' },
        { name: 'is_pinned', type: 'boolean' },
        { name: "created_at", type: 'number' },
        { name: "updated_at", type: 'number' }
      ]
    }),
    tableSchema({
      name: 'comments',
      columns: [
        { name: 'body', type: 'string' },
        { name: 'post_id', type: 'string', isIndexed: true },
        { name: 'is_favorite', type: 'boolean', isOptional: true },
        { name: "created_at", type: 'number' },
        { name: "updated_at", type: 'number' }
      ]
    }),
  ]
})
