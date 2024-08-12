import Image from "next/image";
import { formatCurrency } from "@/src/lib/formatters";
import Stripe from "stripe";
import { notFound } from "next/navigation";
import db from "@/src/db/db";
import Link from "next/link"
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { payment_intent: string }
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  )
  if (paymentIntent.metadata.productId == null) return notFound()

  const product = await db.product.findUnique({
    where: { id: paymentIntent.metadata.productId },
  })
  if (product == null) return notFound()

  const isSuccess = paymentIntent.status === "succeeded"

  return (
    <div className="mt-20 max-w-5xl w-full mx-auto space-y-8">
      <h1 className="text-slate-600 text-center text-4xl font-bold">
        {isSuccess ? "Success!" : "Error!"}
      </h1>
      <Card className="w-auto h-full pb-5 m-5">
      <div className="flex overflow-hidden flex-col gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className="relative w-full h-auto aspect-video"
          />
        </div>
        <div>
          <div className="text-lg text-center text-slate-800 font-bold ext-[#62A83c]">
            {formatCurrency(product.priceInCents)}
          </div>
          <h1 className="text-2xl text-center font-bold  text-slate-800">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground text-center text-pretty">
            {product.description}
          </div>
        </div>
        <Button className="bg-[#62A83c] hover:bg-[#3E3C37]" size="lg" asChild>
          {isSuccess ? (
              <a
                href={`/products/download/${await createDownloadVerification(
                  product.id
                )}`}
              >
                Download
              </a>
            ) : (
              <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
            )}
          </Button>
      </div>
      </Card>
    </div>
  )
}


async function createDownloadVerification(productId: string) {
  return (
    await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
  ).id
}


 