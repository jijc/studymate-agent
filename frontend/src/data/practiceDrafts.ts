const draftPrefix = "studymate-practice-draft"

function draftKey(source: string, libraryId: string) {
    return `${draftPrefix}:${source}:${libraryId}`
}

function getPracticeDraft(source: string, libraryId: string): Record<string, string> {
    try {
        const value: unknown = JSON.parse(sessionStorage.getItem(draftKey(source, libraryId)) ?? "{}")
        if (!value || typeof value !== "object" || Array.isArray(value)) return {}
        return Object.fromEntries(Object.entries(value).filter(([, answer]) => typeof answer === "string"))
    } catch {
        return {}
    }
}

function savePracticeDraft(source: string, libraryId: string, answers: Record<string, string>) {
    sessionStorage.setItem(draftKey(source, libraryId), JSON.stringify(answers))
}

function clearPracticeDraft(source: string, libraryId: string) {
    sessionStorage.removeItem(draftKey(source, libraryId))
}

export {clearPracticeDraft, getPracticeDraft, savePracticeDraft}
