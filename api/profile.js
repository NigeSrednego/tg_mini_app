export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'authorization,content-type');
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.query;
  const bearer = req.headers['authorization'];
  if (!id || !bearer) {
    return res.status(400).json({ error: 'Missing id or Authorization header' });
  }

  try {
    const upstream = await fetch(`https://api.stickerdom.store/api/v1/user/${encodeURIComponent(id)}/profile`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'authorization': bearer,
        'origin': 'https://stickerdom.store',
        'referer': 'https://stickerdom.store/',
        // 'accept-language': 'ru,en;q=0.9'
      }
    });

    const text = await upstream.text();
    res.status(upstream.status).send(text);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
