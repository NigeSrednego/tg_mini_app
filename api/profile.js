export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

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
      },
    });

    const text = await upstream.text();
    res.status(upstream.status).send(text);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
