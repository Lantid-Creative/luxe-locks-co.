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

interface EmailRequest {
  type: "welcome" | "order_confirmation" | "shipping_update" | "abandoned_cart" | "wishlist_reminder" | "password_reset" | "custom";
  to: string;
  data?: Record<string, unknown>;
  subject?: string;
  html?: string;
}

const getEmailTemplate = (type: string, data: Record<string, unknown> = {}) => {
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
      .product-card { border: 1px solid #eee; padding: 15px; margin: 10px 0; border-radius: 8px; }
      .product-image { width: 80px; height: 80px; object-fit: cover; border-radius: 4px; }
      h1 { color: #1a1a2e; margin: 0 0 20px; }
      h2 { color: #1a1a2e; margin: 0 0 15px; }
    </style>
  `;

  const templates: Record<string, { subject: string; html: string }> = {
    welcome: {
      subject: "Welcome to Trazzy Beauty! ✨",
      html: `
        <!DOCTYPE html>
        <html>
        <head>${baseStyles}</head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">✨ TRAZZY BEAUTY</div>
            </div>
            <div class="content">
              <h1>Welcome, ${data.name || "Beautiful"}!</h1>
              <p>We're thrilled to have you join the Trazzy Beauty family! Get ready to discover luxurious wigs and hair products that will transform your look and boost your confidence.</p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="${data.shopUrl || '#'}" class="button">Start Shopping</a>
              </p>
              <h2>Why You'll Love Us:</h2>
              <ul>
                <li>100% Premium Quality Hair</li>
                <li>Free Shipping on Orders Over $200</li>
                <li>30-Day Return Policy</li>
                <li>Expert Styling Advice</li>
              </ul>
              <p>Use code <strong>WELCOME15</strong> for 15% off your first order!</p>
            </div>
            <div class="footer">
              <p>Questions? Reply to this email or contact us at support@trazzybeauty.com</p>
              <p><a href="#">Unsubscribe</a> | <a href="#">View in browser</a></p>
              <p>© 2024 Trazzy Beauty. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    },
    order_confirmation: {
      subject: `Order Confirmed! #${data.orderNumber || ''}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>${baseStyles}</head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">✨ TRAZZY BEAUTY</div>
            </div>
            <div class="content">
              <h1>Thank You for Your Order!</h1>
              <p>Hi ${data.name || 'there'},</p>
              <p>Your order <strong>#${data.orderNumber || ''}</strong> has been confirmed and is being prepared with love!</p>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2>Order Summary</h2>
                <p><strong>Order Number:</strong> ${data.orderNumber || ''}</p>
                <p><strong>Order Date:</strong> ${data.orderDate || new Date().toLocaleDateString()}</p>
                <p><strong>Total:</strong> $${data.total || '0.00'}</p>
              </div>
              <p style="text-align: center; margin: 30px 0;">
                <a href="${data.trackingUrl || '#'}" class="button">Track Your Order</a>
              </p>
            </div>
            <div class="footer">
              <p>Need help? Contact us at support@trazzybeauty.com</p>
              <p>© 2024 Trazzy Beauty. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    },
    abandoned_cart: {
      subject: "You Left Something Behind... 💕",
      html: `
        <!DOCTYPE html>
        <html>
        <head>${baseStyles}</head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">✨ TRAZZY BEAUTY</div>
            </div>
            <div class="content">
              <h1>Don't Let Your Dream Look Slip Away!</h1>
              <p>Hi ${data.name || 'Beautiful'},</p>
              <p>We noticed you left some gorgeous items in your cart. They're waiting for you!</p>
              <p>Complete your order now and get <strong>10% off</strong> with code: <strong>COMEBACK10</strong></p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="${data.cartUrl || '#'}" class="button">Complete Your Order</a>
              </p>
              <p style="font-size: 12px; color: #666;">This offer expires in 24 hours!</p>
            </div>
            <div class="footer">
              <p><a href="#">Unsubscribe</a> | <a href="#">View in browser</a></p>
              <p>© 2024 Trazzy Beauty. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    },
    wishlist_reminder: {
      subject: "Your Wishlist Items Miss You! 💖",
      html: `
        <!DOCTYPE html>
        <html>
        <head>${baseStyles}</head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">✨ TRAZZY BEAUTY</div>
            </div>
            <div class="content">
              <h1>Your Favorites Are Calling!</h1>
              <p>Hi ${data.name || 'Beautiful'},</p>
              <p>The items on your wishlist are still available and waiting for you! Don't miss out on your dream look.</p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="${data.wishlistUrl || '#'}" class="button">View Your Wishlist</a>
              </p>
            </div>
            <div class="footer">
              <p><a href="#">Unsubscribe</a> | <a href="#">View in browser</a></p>
              <p>© 2024 Trazzy Beauty. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    },
    shipping_update: {
      subject: `Your Order is On Its Way! 📦`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>${baseStyles}</head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">✨ TRAZZY BEAUTY</div>
            </div>
            <div class="content">
              <h1>Your Order Has Shipped!</h1>
              <p>Hi ${data.name || 'there'},</p>
              <p>Great news! Your order <strong>#${data.orderNumber || ''}</strong> is on its way to you!</p>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Tracking Number:</strong> ${data.trackingNumber || 'N/A'}</p>
                <p><strong>Carrier:</strong> ${data.carrier || 'Standard Shipping'}</p>
                <p><strong>Estimated Delivery:</strong> ${data.estimatedDelivery || '3-5 business days'}</p>
              </div>
              <p style="text-align: center; margin: 30px 0;">
                <a href="${data.trackingUrl || '#'}" class="button">Track Your Package</a>
              </p>
            </div>
            <div class="footer">
              <p>© 2024 Trazzy Beauty. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    },
    password_reset: {
      subject: "Reset Your Password",
      html: `
        <!DOCTYPE html>
        <html>
        <head>${baseStyles}</head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">✨ TRAZZY BEAUTY</div>
            </div>
            <div class="content">
              <h1>Reset Your Password</h1>
              <p>Hi ${data.name || 'there'},</p>
              <p>We received a request to reset your password. Click the button below to create a new password.</p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="${data.resetUrl || '#'}" class="button">Reset Password</a>
              </p>
              <p style="font-size: 12px; color: #666;">If you didn't request this, please ignore this email. This link expires in 1 hour.</p>
            </div>
            <div class="footer">
              <p>© 2024 Trazzy Beauty. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    },
  };

  return templates[type] || { subject: "Message from Trazzy Beauty", html: "" };
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const emailRequest: EmailRequest = await req.json();
    
    let subject = emailRequest.subject;
    let html = emailRequest.html;

    if (emailRequest.type !== "custom") {
      const template = getEmailTemplate(emailRequest.type, emailRequest.data);
      subject = subject || template.subject;
      html = html || template.html;
    }

    if (!subject || !html) {
      throw new Error("Subject and HTML content are required");
    }

    const emailResult = await sendEmail([emailRequest.to], subject, html);

    console.log("Email sent successfully:", emailResult);

    return new Response(
      JSON.stringify({ success: true, data: emailResult }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending email:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
