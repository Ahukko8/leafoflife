import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 Received order:", body);

    const { 
      customerName, 
      customerEmail, 
      phone, 
      productName, 
      productId, 
      quantity, 
      amount,
      priceInCents,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPostalCode,
      shippingCountry,
      fullShippingAddress
    } = body;

    // Validation
    if (!customerName || !customerEmail || !productName || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get Telegram credentials
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("❌ Missing Telegram credentials");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Format the message with shipping details
    const message = `
🛒 *NEW ORDER RECEIVED*

👤 *Customer Details:*
Name: ${customerName}
Email: ${customerEmail}
Phone: ${phone || 'Not provided'}

📦 *Order Details:*
Product: ${productName}
Product ID: ${productId}
Quantity: ${quantity}
Unit Price: MVR ${priceInCents.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
*Total Amount: MVR ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}*

📍 *Shipping Address:*
${shippingAddress || 'Not provided'}
${shippingCity || ''}${shippingState ? ', ' + shippingState : ''}
${shippingPostalCode ? shippingPostalCode + ', ' : ''}${shippingCountry || ''}

💳 *Payment Status:* Pending (Customer redirected to BML)

⏰ Time: ${new Date().toLocaleString('en-US', { timeZone: 'Indian/Maldives' })}
    `.trim();

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error("❌ Telegram API Error:", telegramData);
      return NextResponse.json(
        { error: "Failed to send notification", details: telegramData },
        { status: 500 }
      );
    }

    console.log("✅ Telegram notification sent successfully");

    return NextResponse.json({ 
      success: true,
      message: "Order notification sent successfully"
    });

  } catch (error: any) {
    console.error("🔥 Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}