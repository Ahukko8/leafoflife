import { Nav, NavLink } from "@/src/components/Nav"

export const dynamic = "force-dynamic"

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Nav>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/products">Products</NavLink>
                <NavLink href="/appointments">Appointments</NavLink>
                <NavLink href="/contact">Contact</NavLink>
                

            </Nav>
            <div className="container my-6">{children}</div>
        </>
    )
}