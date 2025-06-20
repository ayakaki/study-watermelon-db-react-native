import { serve } from 'https://deno.land/std/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

serve(async (req) => {
  try {
    const { last_pulled_at } = await req.json()

    const authHeader = req.headers.get('Authorization')
    const jwt = authHeader?.replace('Bearer ', '')

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(jwt)

    if (authError || !user) {
      console.error('[AUTH ERROR]', authError)
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const user_id = user.id
    const now = Date.now()

    const fetchTableChanges = async (table: string, deletedTable: string) => {
      const { data: updated } = await supabase
        .from(table)
        .select('*')
        .gte('last_modified', last_pulled_at)
        .eq('user_id', user_id)

      const { data: deletedIds } = await supabase
        .from(deletedTable)
        .select('id')
        .gte('deleted_at', last_pulled_at)
        .eq('user_id', user_id)

      return {
        created: [], // ← sendCreatedAsUpdated: true に対応するため空にする
        updated: updated ?? [],
        deleted: (deletedIds ?? []).map((d) => d.id),
      }
    }

    const posts = await fetchTableChanges('posts', 'deleted_posts')
    const comments = await fetchTableChanges('comments', 'deleted_comments')

    return new Response(
      JSON.stringify({
        changes: { posts, comments },
        timestamp: now,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (e) {
    console.error('[PULL ERROR]', e)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
  }
})
