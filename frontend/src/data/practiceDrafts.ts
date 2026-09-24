const draftPrefix = "studymate-practice-draft"

function draftKey(sessionId: string) {
    return `${draftPrefix}:${sessionId}`
}

function getPracticeDraft(sessionId: string): Record<string, string> {
    try {
        const value: unknown = JSON.parse(localStorage.getItem(draftKey(sessionId)) ?? "{}")
        if (!value || typeof value !== "object" || Array.isArray(value)) return {}
        return Object.fromEntries(Object.entries(value).filter(([, answer]) => typeof answer === "string"))
    } catch {
        return {}
    }
}

function savePracticeDraft(sessionId: string, answers: Record<string, string>) {
    localStorage.setItem(draftKey(sessionId), JSON.stringify(answers))
}

function clearPracticeDraft(sessionId: string) {
    localStorage.removeItem(draftKey(sessionId))
}

export {clearPracticeDraft, getPracticeDraft, savePracticeDraft}
