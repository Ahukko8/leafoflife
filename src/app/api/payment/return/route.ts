import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  
  const orderId = searchParams.get("order_id");
  const status = searchParams.get("status");
  const transactionId = searchParams.get("transaction_id");

  // Log the payment confirmation
  console.log("Payment return callback:", { orderId, status, transactionId });

  // Send Telegram notification for successful payment
  if (status === "success" || status === "approved") {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (botToken && chatId) {
      const text = `✅ *Payment Successful*
🧾 *Order ID:* ${orderId}
💳 *Transaction ID:* ${transactionId}
✨ *Status:* Payment Confirmed`;

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "Markdown",
          }),
        });
      } catch (err) {
        console.error("Telegram notification failed:", err);
      }
    }
  }

  // Redirect to success page
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;
  return NextResponse.redirect(
    `${baseUrl}/payment/success?order_id=${orderId}&transaction_id=${transactionId}`
  );
}

export async function POST(req: NextRequest) {
  // Some gateways send POST callbacks
  try {
    const body = await req.json();
    console.log("Payment POST callback:", body);

    // Process the callback data
    const { order_id, status, transaction_id } = body;

    if (status === "success" || status === "approved") {
      // Send Telegram notification
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      
      if (botToken && chatId) {
        const text = `✅ *Payment Successful*
🧾 *Order ID:* ${order_id}
💳 *Transaction ID:* ${transaction_id}
✨ *Status:* Payment Confirmed`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "Markdown",
          }),
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Payment callback error:", err);
    return NextResponse.json({ error: "Invalid callback" }, { status: 400 });
  }
}

