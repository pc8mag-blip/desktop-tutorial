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

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.error('MAILERLITE_API_KEY environment variable is not set');
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Server configuration error' }) };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { email, name } = data;
  if (!email) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Email is required' }) };
  }

  // Get group ID by name
  let groupId;
  try {
    const groupsRes = await fetch('https://connect.mailerlite.com/api/groups?filter[name]=Ebook', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const groupsData = await groupsRes.json();
    if (groupsData.data && groupsData.data.length > 0) {
      groupId = groupsData.data[0].id;
    } else {
      console.error('MailerLite group "Ebook" not found');
      return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Subscription temporarily unavailable' }) };
    }
  } catch (err) {
    console.error('MailerLite groups fetch error:', err.message);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Subscription temporarily unavailable' }) };
  }

  // Add subscriber to group
  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email.trim(),
        fields: { name: (name || '').trim() },
        groups: [groupId]
      })
    });

    const result = await res.json();

    if (res.ok) {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: true })
      };
    } else {
      console.error('MailerLite subscribe error:', result.message);
      return {
        statusCode: res.status,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Subscription failed' })
      };
    }
  } catch (err) {
    console.error('MailerLite network error:', err.message);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Network error' }) };
  }
};
