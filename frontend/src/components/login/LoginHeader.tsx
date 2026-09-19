import {Link} from "react-router"

import logo from "@/assets/image/logo-trimmed.png"
import {StickyHeader} from "@/components/layout/StickyHeader"

function LoginHeader() {
    return (
        <StickyHeader>
            <div
                data-slot="header-content"
                className="mx-auto flex h-full w-full max-w-[1480px] items-center px-5 sm:px-8 xl:px-8"
            >
                <Link to="/" aria-label="返回 StudyMate 首页" className="inline-flex items-center">
                    <img
                        src={logo}
                        alt="StudyMate"
                        className="h-10 w-auto select-none"
                    />
                </Link>
            </div>
        </StickyHeader>
    )
}

export {LoginHeader}
