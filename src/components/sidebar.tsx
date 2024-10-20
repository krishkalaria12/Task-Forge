import Image from "next/image"
import Link from "next/link"

import { DottedSeperator } from "@/components/dotted-seperator"
import { Navigation } from "@/components/navigation"
import { WorkspaceSwitcher } from "@/components/workspace-switcher"
import { Projects } from "@/components/projects"

export const Sidebar = () => {
    return (
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <Link href="/">
                <div className="flex items-center space-x-2">
                    <Image src={"/logo.svg"} alt="Logo" width={40} height={40} />
                    <h2 className="text-xl font-bold">Task Forge</h2>
                </div>
            </Link>
            <DottedSeperator className="my-4" />
            <WorkspaceSwitcher />
            <DottedSeperator className="my-4" />
            <Navigation />
            <DottedSeperator className="my-4" />
            <Projects />
        </aside>
    )
}