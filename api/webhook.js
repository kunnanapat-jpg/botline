export default async function handler(req, res) {
  const TOKEN = 'RXKu2/hwZTvKWtyK6cXwUhiIoVZopV0+qP1IepkjkL+DYQKZVTXkDztJ25hFVRPnLncaW6NuJoT+I6xO7MHq9J1wEbm3NTXOQAbzMWt0prdLMnoLtzmiDZ3uf5BfVQyqL4pfbGMhT1+hBpfR1hNiDgdB04t89/1O/w1cDnyilFU=';

const events = req.body.events || [];

  const keywords = [
    'score', 'howto', 'diamond', 'evolution',
    'rank', 'rate', 'event', 'gym'
  ];

  for (let event of events) {

    if (event.type !== 'message' && event.type !== 'follow') continue;

    let messages = [];

    // 🟢 ถ้าเป็น keyword → ใส่ response ก่อน
    if (event.type === 'message') {
      const text = event.message.text;

      if (keywords.includes(text)) {
        messages.push({
          type: 'text',
          text: `คุณเลือก: ${text}`
        });
      }
    }

    // 🟢 ใส่เมนูทุกครั้ง (สำคัญ)
    messages.push(menu());

    await reply(event.replyToken, messages, TOKEN);
  }

  res.status(200).end();
}

// =========================
function menu() {
  return {
    type: 'text',
    text: 'เลือกสิ่งที่อยากรู้จากเมนูด้านล่าง',
    quickReply: {
      items: [
        btn('🎮 วิธีการเล่นเกม', 'howto'),
        btn('💎 หาบัตรสุ่มเพชรได้จากไหน', 'diamond'),
        btn('🧬 Evolution', 'evolution'),
        btn('🏆 ระบบ Rank', 'rank'),
        btn('🎲 อัตราการสุ่ม', 'rate'),
        btn('🎉 อีเวนต์', 'event'),
        btn('🏅 Gymleader', 'gym'),
      ]
    }
  };
}

function btn(label, text) {
  return {
    type: 'action',
    action: { type: 'message', label, text }
  };
}

async function reply(replyToken, messages, TOKEN) {
  await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify({ replyToken, messages })
  });
}
