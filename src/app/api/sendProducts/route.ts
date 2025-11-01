import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, reference, customerEmail, customerName } = body;

    if (!amount || !reference || !customerEmail || !customerName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const BML_GATEWAY_URL = process.env.BML_GATEWAY_URL!;
    const BML_APPLICATION_ID = process.env.BML_APPLICATION_ID!;
    const BML_API_KEY = process.env.BML_API_KEY!;
    const RETURN_URL = process.env.NEXT_PUBLIC_BML_RETURN_URL!;
    const CANCEL_URL = process.env.NEXT_PUBLIC_BML_CANCEL_URL!;

    // Convert amount to Lari (multiply by 100)
    const amountInLari = Math.round(Number(amount) * 100);

    // BML Payment Payload
    const payload = {
      amount: amountInLari, // Amount in Lari (e.g., 100.00 MVR = 10000)
      currency: "MVR",
      reference,
      customerEmail,
      customerName,
      redirectUrl: RETURN_URL,
      cancelUrl: CANCEL_URL,
    };

    console.log("📦 Sending to BML:", payload);

    // Send payment request
    const response = await fetch(`${BML_GATEWAY_URL}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "applicationId": BML_APPLICATION_ID,
        "Authorization": `Bearer ${BML_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("💳 BML Response:", data);

    if (!response.ok) {
      return NextResponse.json(
        { error: "BML Error", details: data },
        { status: 400 }
      );
    }

    const redirectUrl = data?.url || data?.redirectUrl;

    if (!redirectUrl) {
      return NextResponse.json(
        { error: "No redirect URL returned by BML", details: data },
        { status: 400 }
      );
    }

    return NextResponse.json({ redirect_url: redirectUrl });
  } catch (error: any) {
    console.error("🔥 BML Integration Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
