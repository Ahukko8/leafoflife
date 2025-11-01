import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    const res = await fetch(process.env.BML_VERIFY_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BML_SECRET_KEY}`,
      },
      body: JSON.stringify({ order_id: orderId }),
    });

    const data = await res.json();

    if (data.status === "SUCCESS") {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      const message = `✅ *Payment Confirmed*\n🧾 *Order ID:* ${orderId}\n💰 *Amount:* ${data.amount} MVR`;

      if (botToken && chatId) {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown",
          }),
        });
      }

      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json({ success: false, data });
    }
  } catch (err) {
    console.error("Verify Error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
