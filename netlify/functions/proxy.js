export async function handler(event) {
  const { path, method, body } = JSON.parse(event.body || "{}");

  const SUPABASE_URL = "https://opchdiaepihfxsihiuwv.supabase.co";
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const data = await res.json();
    return {
      statusCode: res.status,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
