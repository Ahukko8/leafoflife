export const dynamic = "force-dynamic"

export default function ProductLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
            <div>{children}</div>
    )
}