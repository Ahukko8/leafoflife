// src/pages/api/sendAppointment.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { patientName, email, phone } = req.body;

  try {
    const message = `Appointment Request\nPatient Name: ${patientName}\nEmail: ${email}\nPhone: ${phone}`;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    });

    return res.status(200).json({ message: 'Appointment request sent successfully' });
  } catch (error) {
    console.error('Error sending appointment to Telegram:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default handler;
