import { serve } from 'https://deno.land/std/http/server.ts'

serve((req: Request) => {
  const url = new URL(req.url)
  const isError = url.pathname.includes('error')

  const message = isError
    ? 'メール認証リンクが無効か期限切れです。再度認証メールを送信してください。'
    : 'メール認証が完了しました。引き続きアプリをご利用ください。'

  return new Response(message, {
    headers: {
      'Content-Type': 'text/plain; charset=UTF-8'
    }
  })
})
