import { serve } from 'https://deno.land/std/http/server.ts';

serve((req: Request) => {

  const msg = 'ご登録ありがとうございした。本アプリケーションをお楽しみください。';

  return new Response(msg, {
    headers: {
      'Content-Type': 'text/plain; charset=UTF-8'
    }
  })
})
