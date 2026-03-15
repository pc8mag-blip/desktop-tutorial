const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY environment variable is not set');
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Server configuration error' }) };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { name, email, message, lang } = data;

  if (!name || !name.trim()) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Name is required' }) };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Valid email is required' }) };
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = (message || '').trim();
  const subject = lang === 'en'
    ? `New message from website (EN) — ${trimmedName}`
    : `Nowa wiadomość ze strony (PL) — ${trimmedName}`;

  const htmlBody = `
    <h2>${subject}</h2>
    <p><strong>${lang === 'en' ? 'Name' : 'Imię'}:</strong> ${trimmedName}</p>
    <p><strong>Email:</strong> ${trimmedEmail}</p>
    <p><strong>${lang === 'en' ? 'Message' : 'Wiadomość'}:</strong></p>
    <p>${trimmedMessage || (lang === 'en' ? '(no message)' : '(brak wiadomości)')}</p>
    <hr>
    <p style="color:#888;font-size:12px">${lang === 'en' ? 'You can reply directly to this email to respond to the client.' : 'Możesz odpowiedzieć bezpośrednio na tego maila, żeby odpisać klientowi.'}</p>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Strona WWW <noreply@piotrchmielewski.com>',
        to: ['kontakt@piotrchmielewski.com'],
        reply_to: trimmedEmail,
        subject: subject,
        html: htmlBody
      })
    });

    const result = await res.json();

    if (res.ok) {
      return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ success: true }) };
    } else {
      console.error('Resend error:', result);
      return { statusCode: res.status, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Failed to send message' }) };
    }
  } catch (err) {
    console.error('Resend network error:', err.message);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Network error' }) };
  }
};
