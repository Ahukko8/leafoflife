"use client"

import Image from "next/image";
import { Button } from "./ui/button";


interface ButtonProps {
    isLoading: boolean;
    className?: string;
    children: React.ReactNode
}

const SubmitButton = ({isLoading, className, children}: ButtonProps) => {
    return (
        <Button type="submit" disabled={isLoading} className={className ?? "bg-[#62A83c] hover:bg-[#62A83c]/80 w-full"}>
            {isLoading ? (
                <div className="flex items-center gap-4">
                    <Image
                        src="/icons/loader.svg"
                        width={24}
                        height={24}
                        className="animate-spin"
                        alt="loader"

                    />
                    Loading...
                </div>
            ) : children}
            
        </Button>
    )
}


export default SubmitButton