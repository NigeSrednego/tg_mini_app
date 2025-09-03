export default async function handler(req, res) {
  // CORS/preflight на всякий
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'authorization,content-type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 1) ЧИТАЕМ СЫРОЕ ТЕЛО КАК СТРОКУ (initData URL-encoded)
    const bodyString = await new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => (data += chunk));
      req.on('end', () => resolve(data));
      req.on('error', reject);
    });

    if (!bodyString || bodyString.length > 20_000) {
      return res.status(400).json({ error: 'Bad payload' });
    }

    // 2) ПРОКСИРУЕМ В ИХ /auth С НУЖНЫМИ ЗАГОЛОВКАМИ
    const upstream = await fetch('https://api.stickerdom.store/api/v1/auth', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        // Некоторые бэкенды проверяют Origin/Referer:
        'origin': 'https://stickerdom.store',
        'referer': 'https://stickerdom.store/',
        // Можно добавить accept-language, если понадобится:
        // 'accept-language': 'ru,en;q=0.9'
      },
      body: bodyString
    });

    const text = await upstream.text();
    // пробрасываем ровно их статус и тело, чтобы видеть их ответ
    res.status(upstream.status).send(text);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
