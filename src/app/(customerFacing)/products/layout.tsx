import Navbar from "@/src/components/Navbar"
export const dynamic = "force-dynamic"

export default function ProductLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            
            <div className="container my-6">{children}</div>
        </>
    )
}