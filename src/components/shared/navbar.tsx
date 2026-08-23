"use client"
import Image from "next/image"
import SharedButton from "./button"
export default function Navbar() {
    const navLink = [
        { title: "Home", link: "/" },
        { title: "About", link: "/" },
        { title: "Gallery", link: "/" },
        { title: "Contact", link: "/" },
    ]
    return (
        <>
            <nav className="fixed top-0 left-0 w-full h-auto">
                <div className="px-6 py-3 flex flex-row items-center justify-between">
                    <Image src="/logo.jpg" alt="Logo IKAMAMIIND 2100" width={50} height={50} />
                    <div className="flex flex-row items-center justify-center gap-4">
                        {navLink.map((list) => {
                            return (
                                <ul key={list.title} className="list-none">
                                    <li className="">
                                        <a href={list.link}>{list.title}</a>
                                    </li>
                                </ul>
                            )
                        })}
                        < SharedButton className="" title="Login" url="/login" />
                        <SharedButton className="" title="Registrasi" url="/register" />
                    </div>
                </div>
            </nav>
        </>
    )
}