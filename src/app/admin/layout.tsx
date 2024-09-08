
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
                <NavLink href="/admin">Dashboard</NavLink>
                <NavLink href="/admin/products">Products</NavLink>
                <NavLink href="/admin/categories">Categories</NavLink>
            </Nav>
            
            <div className="container my-6">{children}</div>
        </>
    )
}