import { addColumns, schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        addColumns({
          table: 'comments',
          columns: [
            { name: 'is_favorite', type: 'boolean', isOptional: false },
          ]
        }),
      ]
    },
    {
      toVersion: 3,
      steps: [
        addColumns({
          table: 'comments',
          columns: [
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ]
        },
        ),
        addColumns({
          table: 'posts',
          columns: [
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ]
        }),
      ]
    },
    {
      toVersion: 4,
      steps: [],
    },
    {
      toVersion: 5,
      steps: [
        addColumns({
          table: 'comments',
          columns: [
            { name: 'last_modified', type: 'number' },
          ]
        },
        ),
        addColumns({
          table: 'posts',
          columns: [
            { name: 'last_modified', type: 'number' },
          ]
        }),
      ],
    },
  ]
})
