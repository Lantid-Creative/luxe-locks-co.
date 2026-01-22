import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

async function sendEmail(to: string[], subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Trazzy Beauty <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to send email");
  }
  
  return response.json();
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TestEmailRequest {
  templateType: string;
  toEmail: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { templateType, toEmail }: TestEmailRequest = await req.json();

    const testData = {
      name: "Test User",
      orderNumber: "TEST-12345",
      orderDate: new Date().toLocaleDateString(),
      total: "299.99",
      shopUrl: "https://trazzybeauty.com/shop",
      cartUrl: "https://trazzybeauty.com/cart",
      wishlistUrl: "https://trazzybeauty.com/wishlist",
      trackingUrl: "https://trazzybeauty.com/track",
      trackingNumber: "1Z999AA10123456784",
      carrier: "UPS",
      estimatedDelivery: "January 25, 2024",
      resetUrl: "https://trazzybeauty.com/reset-password?token=test",
    };

    const baseStyles = `
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f8f8; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 30px; text-align: center; }
        .logo { font-size: 28px; font-weight: bold; color: #d4af37; letter-spacing: 2px; }
        .content { padding: 40px 30px; }
        .button { display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #b8962e 100%); color: #1a1a2e !important; text-decoration: none; padding: 14px 30px; border-radius: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .footer { background-color: #1a1a2e; color: #999; padding: 30px; text-align: center; font-size: 12px; }
        .footer a { color: #d4af37; text-decoration: none; }
        h1 { color: #1a1a2e; margin: 0 0 20px; }
      </style>
    `;

    let subject = `[TEST] ${templateType.replace(/_/g, ' ').toUpperCase()} Email`;
    let html = `
      <!DOCTYPE html>
      <html>
      <head>${baseStyles}</head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">✨ TRAZZY BEAUTY</div>
            <p style="color: #ff6b6b; font-size: 12px;">⚠️ TEST EMAIL</p>
          </div>
          <div class="content">
            <h1>Test: ${templateType.replace(/_/g, ' ')}</h1>
            <p>This is a test email for the <strong>${templateType}</strong> template.</p>
            <p>Test data used:</p>
            <pre style="background: #f5f5f5; padding: 15px; border-radius: 8px; overflow: auto;">${JSON.stringify(testData, null, 2)}</pre>
          </div>
          <div class="footer">
            <p>This is a test email from Trazzy Beauty Admin</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const data = await sendEmail([toEmail], subject, html);

    console.log("Test email sent:", data);

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending test email:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
