// netlify/functions/proxy.js

export async function handler(event) {
  // Replace this with your own project ref
  const targetBase = "https://opchdiaepihfxsihiuwv.supabase.co/rest/v1/";

  // Construct the full target URL (pass through the path from the request)
  const path = event.queryStringParameters?.path || "";
  const target = `${targetBase}${path}`;

  try {
    const response = await fetch(target, {
      method: event.httpMethod,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, // needed by Supabase REST
      },
      body: event.httpMethod !== "GET" && event.body ? event.body : undefined,
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
}
