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
    }]
})
