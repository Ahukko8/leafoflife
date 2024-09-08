import Navbar from "@/src/components/Navbar"
export const dynamic = "force-dynamic"

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Navbar />
            <div className="overflow-hidden">{children}</div>
        </>
    )
}