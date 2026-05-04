export default async function handler(req, res) {
  const TOKEN = 'RXKu2/hwZTvKWtyK6cXwUhiIoVZopV0+qP1IepkjkL+DYQKZVTXkDztJ25hFVRPnLncaW6NuJoT+I6xO7MHq9J1wEbm3NTXOQAbzMWt0prdLMnoLtzmiDZ3uf5BfVQyqL4pfbGMhT1+hBpfR1hNiDgdB04t89/1O/w1cDnyilFU=';

  const events = req.body.events || [];

  for (let event of events) {

    // 🟢 ตอน Add เพื่อน → มีข้อความ
    if (event.type === 'follow') {
      await reply(event.replyToken, [menuWithText()], TOKEN);
    }
    // 🟢 ตอนพิมพ์ → ไม่มีข้อความแล้ว
      if (event.type === 'message') {
      await reply(event.replyToken, [menuOnly()], TOKEN);
    }
  }

  res.status(200).end();
}

// 🔹 มีข้อความ (ใช้ครั้งเดียว)
function menuWithText() {
  return {
    type: 'text',
    text: '📘 เลือกหัวข้อที่อยากรู้ 👇',
    quickReply: { items: menuItems() }
  };
}

// 🔹 ไม่มีข้อความ (ใช้ตลอด)
function menuOnly() {
  return [
    btn('🎮 วิธีการเล่นเกม', 'howto'),
    btn('🎲 อัตราการสุ่ม', 'rate'),
    btn('🎉 อีเวนต์', 'event'),
    btn('💎 บัตรสุ่มเพชร', 'diamond'),
    btn('🧬 Evolution', 'evolution'),
    btn('🏆 ระบบ Rank', 'rank'),
    btn('🏅 Gymleader', 'gym'),
    btn('⭐ การเก็บคะแนน', 'score'),
  ];
}

// 🔹 เมนู
function menuItems() {
  return [
    btn('🎮 วิธีการเล่นเกม', 'howto'),
    btn('🎲 อัตราการสุ่ม', 'rate'),
    btn('🎉 อีเวนต์', 'event'),
    btn('💎 บัตรสุ่มเพชร', 'diamond'),
    btn('🧬 Evolution', 'evolution'),
    btn('🏆 ระบบ Rank', 'rank'),
    btn('🏅 Gymleader', 'gym'),
    btn('⭐ การเก็บคะแนน', 'score'),
  ];
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
