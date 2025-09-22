// Discord Webhook経由でメッセージを送信する非同期関数
async function sendToDiscord(env, subject, message) {
  // context.env から環境変数（Secrets）を取得
  const { DISCORD_WEBHOOK_URL } = env;

  if (!DISCORD_WEBHOOK_URL) {
    throw new Error('DiscordのWebhook URLが設定されていません。');
  }

  // Discordに送信するメッセージのペイロードを作成（Embed形式）
  const payload = {
    embeds: [
      {
        title: `【Webサイトお問い合わせ】`,
        color: 3447003, // 16進数で #3498db
        fields: [
          { name: '件名', value: subject },
          { name: '本文', value: message },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  const response = await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Discord Webhook Error: ${errorText}`);
    throw new Error('Discord Webhookへの送信に失敗しました。');
  }
}

// Cloudflare Pages Functions のリクエストハンドラ
// POSTリクエストが /submit-contact に来るとこの関数が実行される
export async function onRequestPost(context) {
  try {
    const data = await context.request.json();

    // バリデーション
    if (!data.subject || !data.message) {
      return new Response('必須項目が不足しています', { status: 400 });
    }

    // Discordに送信する関数を呼び出す
    await sendToDiscord(context.env, data.subject, data.message);

    // フロントエンドに成功レスポンスを返す
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Function Error:', error);
    return new Response('内部サーバーエラーが発生しました。', { status: 500 });
  }
}