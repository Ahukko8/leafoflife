// app/api/sendMessage/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { 
      name, 
      email, 
      message, 
      phone, 
      idCardNumber,
      address,
      city,
      state,
      postalCode
    } = await req.json();

    // Validation
    if (!name || !email || !phone || !idCardNumber || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("❌ Missing Telegram credentials");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Format the enhanced message
    const text = `
🏥 *NEW APPOINTMENT REQUEST*

👤 *Patient Information:*
Name: ${name}
Email: ${email}
Phone: ${phone}
ID Card: ${idCardNumber}

📍 *Address:*
${address || 'Not provided'}
${city || ''}${state ? ', ' + state : ''}
${postalCode ? 'Postal Code: ' + postalCode : ''}

💬 *Treatment Details:*
${message}

⏰ *Submitted:* ${new Date().toLocaleString('en-US', { 
  timeZone: 'Indian/Maldives',
  dateStyle: 'full',
  timeStyle: 'short'
})}

✅ *Status:* Pending Review
    `.trim();

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
          parse_mode: 'Markdown',
        }),
      }
    );

    const data = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('❌ Telegram API error:', data);
      return NextResponse.json(
        { error: 'Failed to send notification', details: data.description },
        { status: telegramResponse.status }
      );
    }

    console.log('✅ Appointment notification sent successfully');

    return NextResponse.json({ 
      success: true,
      message: 'Appointment request sent successfully' 
    });

  } catch (error: any) {
    console.error('🔥 Error sending appointment to Telegram:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}