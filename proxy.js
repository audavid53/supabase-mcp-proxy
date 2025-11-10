const SUPABASE_URL = "https://opchdiaepihfxsihiuwv.supabase.co";
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const path = url.searchParams.get("path");
  const method = req.method;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: req.body,
  });

  return new Response(await res.text(), { status: res.status });
});
