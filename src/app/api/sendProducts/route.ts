// // app/api/sendMessage/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { customerName, productName, priceInCents, email, phone } = await req.json();
    const botToken = process.env.TELEGRAM_BOT_TOKEN; // Replace with your bot token
    const chatId = process.env.TELEGRAM_CHAT_ID; // Replace with your chat ID
    const text = `Customer Name: ${customerName}\nProduct Name: ${productName}\nPrice: ${priceInCents}\nEmail: ${email}\nPhone: ${phone}`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      }
    );

    const data = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', data);
      return NextResponse.json({ message: data.description }, { status: telegramResponse.status });
    }

    return NextResponse.json({ message: 'Product request sent successfully' });
  } catch (error) {
    console.error('Error sending product request to Telegram:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
