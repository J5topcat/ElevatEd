exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { password } = JSON.parse(event.body);

    // Password is stored in Netlify environment variables — never in your code
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (password === correctPassword) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true })
      };
    } else {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, message: 'Incorrect password' })
      };
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: 'Bad request' })
    };
  }
};
