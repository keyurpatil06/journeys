"use client";

const ChatMessage = ({ role, message }: ChatMessageProps) => {
    const isUser = role === "user";

    return (
        <div className={`flex max-w-[80%] ${isUser ? "self-end" : "self-start"}`}>
            <div className={`rounded-2xl px-5 py-4 shadow-sm ${isUser ? "bg-[#4a3a2a] text-[#fffaf1]" : "border border-[#d6c3a4] bg-[#fffaf1] text-[#4a3a2a]"}`}>
                <div className="space-y-2">
                    <div className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${isUser ? "text-[#d9c7af]" : "text-[#9a8267]"}`}>
                        {isUser ? "You" : "Travel AI"}
                    </div>

                    <div className="text-sm whitespace-pre-wrap tracking-wide">{message}</div>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;