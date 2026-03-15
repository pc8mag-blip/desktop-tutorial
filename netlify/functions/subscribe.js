exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured' }) };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { email, name } = data;
  if (!email) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Email is required' }) };
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
      return { statusCode: 404, body: JSON.stringify({ error: 'Group "Ebook" not found' }) };
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch groups' }) };
  }

  // Add subscriber to group
  try {
    const res = await fetch(`https://connect.mailerlite.com/api/subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        fields: { name: name || '' },
        groups: [groupId]
      })
    });

    const result = await res.json();

    if (res.ok || res.status === 200 || res.status === 201) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true })
      };
    } else {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: result.message || 'Failed to subscribe' })
      };
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Network error' }) };
  }
};
