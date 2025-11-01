import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const orderId = searchParams.get("order_id");

  console.log("Payment cancelled:", { orderId });

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (botToken && chatId) {
    const text = `❌ *Payment Cancelled*
🧾 *Order ID:* ${orderId}
⚠️ *Status:* User cancelled the payment`;

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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;
  return NextResponse.redirect(`${baseUrl}/payment/cancelled?order_id=${orderId}`);
}