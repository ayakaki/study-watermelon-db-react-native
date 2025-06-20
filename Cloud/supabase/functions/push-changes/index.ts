import { serve } from 'https://deno.land/std/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

serve(async (req) => {
  try {
    const { changes, last_pulled_at } = await req.json();

    const authHeader = req.headers.get('Authorization');
    const jwt = authHeader?.replace('Bearer ', '');

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
    );

    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser(jwt);

    console.log('user:', user);


    if (authError || !user) throw new Error('認証ユーザーが取得できません');
    const user_id = user.id;

    const cleanRow = ({ _status, _changed, ...rest }) => rest;

    const tables = ['posts', 'comments'];

    for (const table of tables) {
      const created = changes[table]?.created ?? [];
      const updated = changes[table]?.updated ?? [];
      const deleted = changes[table]?.deleted ?? [];

      for (const row of created) {
        try {
          const cleaned = cleanRow(row);
          cleaned.user_id = user_id;
          const { error } = await supabase.from(table).upsert(cleaned, { onConflict: 'id' });
          if (error) console.error(`[CREATE ERROR] ${table}:`, error, cleaned);
        } catch (e) {
          console.error(`[CREATE EXCEPTION] ${table}:`, e);
        }
      }

      for (const row of updated) {
        try {
          const cleaned = cleanRow(row);
          cleaned.user_id = user_id;
          const { error } = await supabase.from(table).upsert(cleaned, { onConflict: 'id' });
          if (error) console.error(`[UPDATE ERROR] ${table}:`, error, cleaned);
        } catch (e) {
          console.error(`[UPDATE EXCEPTION] ${table}:`, e);
        }
      }

      for (const id of deleted) {
        try {
          const { error } = await supabase.from(table).delete().match({ id, user_id });
          if (error) console.error(`[DELETE ERROR] ${table}:`, error, id);
        } catch (e) {
          console.error(`[DELETE EXCEPTION] ${table}:`, e);
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('[UNEXPECTED ERROR]', e);
    return new Response(JSON.stringify({ success: false, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
