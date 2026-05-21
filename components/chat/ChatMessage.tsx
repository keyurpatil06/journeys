"use client"

interface ChatMessageProps {
    role: "user" | "assistant"
    message: string
}

const ChatMessage = ({ role, message }: ChatMessageProps) => {
    const bubbleClass = role === "user"
        ? "self-end bg-slate-900 text-white"
        : "self-start bg-white text-slate-900 border border-border"

    return (
        <div className={`flex max-w-[90%] ${bubbleClass} rounded-3xl px-5 py-4 shadow-sm`}>
            <div className="space-y-2 text-sm leading-6">
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {role === "user" ? "You" : "Travel AI"}
                </div>
                <div>{message}</div>
            </div>
        </div>
    )
}

export default ChatMessage
