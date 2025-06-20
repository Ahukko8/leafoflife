export const dynamic = "force-dynamic"

export default function ProductLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            
            <div className="my-20 pt-5">{children}</div>
        </>
    )
}