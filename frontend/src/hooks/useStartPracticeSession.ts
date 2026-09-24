import {useMutation} from "@tanstack/react-query"
import {useNavigate} from "react-router"

import {startOrResumePracticeSession} from "@/api/practice"

function useStartPracticeSession() {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: startOrResumePracticeSession,
        onSuccess: ({sessionId}) => navigate(`/practice/session/${sessionId}`),
    })

    return {
        startPracticeSession: mutation.mutate,
        isStarting: mutation.isPending,
        startError: mutation.error,
    }
}

export {useStartPracticeSession}
