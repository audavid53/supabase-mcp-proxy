// netlify/functions/proxy.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async function(event) {
  const target = "https://mcp.supabase.com/mcp?project_ref=opchdiaepihfxsihiuwv";

  try {
    const response = await fetch(target, {
      method: event.httpMethod,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: event.httpMethod !== "GET" ? event.body : undefined,
    });

    const text = await response.text();
    return {
      statusCode: response.status,
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
