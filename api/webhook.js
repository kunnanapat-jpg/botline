export default async function handler(req, res) {
  const TOKEN = 'RXKu2/hwZTvKWtyK6cXwUhiIoVZopV0+qP1IepkjkL+DYQKZVTXkDztJ25hFVRPnLncaW6NuJoT+I6xO7MHq9J1wEbm3NTXOQAbzMWt0prdLMnoLtzmiDZ3uf5BfVQyqL4pfbGMhT1+hBpfR1hNiDgdB04t89/1O/w1cDnyilFU=';

  const events = req.body.events || [];

  for (let event of events) {
    if (event.type === 'follow' || event.type === 'message') {
      try {
        const r = await fetch('https://api.line.me/v2/bot/message/reply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
          },
          body: JSON.stringify({
            replyToken: event.replyToken,
            messages: [
              {
                type: 'text',
                text: 'เลือกหัวข้อที่อยากรู้👇',
                quickReply: {
                  items: [
                    btn('⭐ การเก็บคะแนน', 'score'),
                    btn('🎮 วิธีการเล่นเกม', 'howto'),
                    btn('💎 บัตรสุ่มเพชร', 'diamond'),
                    btn('🧬 Evolution', 'evolution'),
                    btn('🏆 ระบบ Rank', 'rank'),
                    btn('🎲 อัตราการสุ่ม', 'rate'),
                    btn('🎉 อีเวนต์', 'event'),
                    btn('🏅 Gymleader', 'gym'),
                  ]
                }
              }
            ]
          })
        });

        const text = await r.text();
        console.log('LINE RESPONSE:', text);
      } catch (e) {
        console.log('ERROR:', e);
      }
    }
  }

  res.status(200).end();
}

function btn(label, text) {
  return {
    type: 'action',
    action: { type: 'message', label, text }
  };
}
