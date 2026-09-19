import {GeneratedLibraryCard} from "@/components/questions/GeneratedLibraryCard"
import type {GeneratedLibrary} from "@/data/aiLibraries"

type GeneratedLibrarySectionProps = {
    title: string
    description: string
    count: number
    limit: number
    libraries: GeneratedLibrary[]
}

function GeneratedLibrarySection({title, description, count, limit, libraries}: GeneratedLibrarySectionProps) {
    return (
        <section aria-label={title}>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <span className="rounded-md bg-secondary/65 px-2 py-0.5 text-xs font-medium text-primary">{count}/{limit}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                </div>
                <span className="text-xs text-muted-foreground">删除旧题库后可释放名额</span>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                {libraries.map((library) => <GeneratedLibraryCard key={library.id} library={library}/>) }
            </div>
        </section>
    )
}

export {GeneratedLibrarySection}
