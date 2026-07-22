import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SMTP2GO_API_KEY = Deno.env.get("SMTP2GO_API_KEY") ?? "api-85AA8152FA2B4B7EAE9DD18FFEC8A4D7";
const SMTP2GO_ENDPOINT = "https://api.smtp2go.com/v3/email/send";
const RECIPIENT = "msp@redstonets.com";
const SENDER = "website@redstonets.com";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { name, email, company, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email and message are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const subject = `Website enquiry from ${name} (${company || "No company"})`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : "",
      "",
      "Message:",
      message,
    ].filter(Boolean).join("\n");

    const payload = {
      api_key: SMTP2GO_API_KEY,
      to: [RECIPIENT],
      sender: SENDER,
      subject,
      text_body: body,
      html_body: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${body.replace(/</g, "&lt;")}</pre>`,
      custom_headers: [
        { header: "Reply-To", value: email },
      ],
    };

    const response = await fetch(SMTP2GO_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || result?.data?.error) {
      const errorMsg = result?.data?.error || result?.data?.error_code || "Email delivery failed";
      return new Response(
        JSON.stringify({ error: errorMsg }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
