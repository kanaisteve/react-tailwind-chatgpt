import React, { useRef, useEffect } from 'react'
import autoAnimate from "@formkit/auto-animate"

const ChatBody = ({chat}) => {
    const aiStyle = "bg-white bg-opacity-40 backdrop-blur-lg dropshadow-md mr-auto"

    const parent = useRef(null)
    const bottomRef = useRef(null)

    // only for auto animation [reply animations]
    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent])

    // for scrolling to the bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"})
    }, [chat])

    return (
        <div className="flex flex-col gap-4">
            {chat.map((message, index) => {
                return (
                     <div className={`border-[#999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%]
                        ${message.sender == "ai" && aiStyle}`}
                        key={index}>
                        <pre className='whitespace-pre-wrap'>
                            <span>{message.message}</span>
                        </pre>
                    </div>
                )
            })}

            {/* client message */}
            {/* <div className="border-[#999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%]">
                <pre className='whitespace-pre-wrap'>
                    <span>Hey ChatGPT, can you help me?</span>
                </pre>
            </div> */}

            {/* ai message */}
            {/* <div className={`border-[#999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%] ${aiStyle}`}>
                <pre>
                    <span>Yeah, I can help you with anything</span>
                </pre>
            </div> */}

            <div className="h-3" ref={bottomRef}></div>
        </div>
    )
}

export default ChatBody