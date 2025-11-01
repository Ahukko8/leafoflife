export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      <h1 className="text-3xl font-bold text-red-700">❌ Payment Canceled</h1>
      <p className="mt-4 text-gray-700">Your order was canceled. You can try again anytime.</p>
    </div>
  );
}
