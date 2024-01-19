'use client'
import Image from "next/image"
import { FormEvent, Reducer, useReducer, useRef } from "react"



type Action = {
    type: 'add_message',
    payload: string,
    user: boolean
} | { type: 'response_loading' } | { type: 'response_loaded' }

type Message = {
    user: boolean,
    id: number,
    message: string,
}

interface State {
    messages: Message[],
    responseLoading: boolean,
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'add_message':
            return { ...state, messages: [...state.messages, { user: action.user, id: state.messages.length, message: action.payload }] }
        case 'response_loading':
            return { ...state, responseLoading: true }
        case 'response_loaded':
            return { ...state, responseLoading: false }
        default:
            return state
    }

}

export default function PokeChat() {

    const chatWindowRef = useRef<HTMLDivElement>(null);
    const [state, dispatch] = useReducer(reducer, { messages: [], responseLoading: false });

    const handleSendMessage = async (message: string) => {

        
        // Dispatch the message to the chat
        dispatch({ type: 'add_message', user: true, payload: message });
        dispatch({ type: 'response_loading' });    
        chatWindowRef.current?.scrollTo(0, chatWindowRef.current?.scrollHeight);
        
        // Send a POST request
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Dispatch the response to the chat
        dispatch({ type: 'add_message', user: false, payload: data.message });
        dispatch({ type: 'response_loaded' });
        chatWindowRef.current?.scrollTo(0, chatWindowRef.current?.scrollHeight);

    }


    return (
        <div className="h-80">
            <div id="chatWindow" ref={chatWindowRef} className="overflow-y-scroll m-4 h-5/6 border-4 dark:text-white dark:border-slate-800 dark:bg-slate-800 rounded-lg">
                {state.messages.map((message: Message) =>

                    message.user ? <div key={message.id} className="m-2 my-4 flex items-center">
                        <Image className="flex-none rounded-full mr-2"
                            src="/portrait.jpg"
                            width={50}
                            height={50}
                            alt="Picture of the user"
                        />
                        <div className="w-0 h-0
                    border-t-[5px] border-t-transparent
                    border-r-[10px] border-r-slate-600
                    border-b-[5px] border-b-transparent">
                        </div>
                        <p className="p-2 px-4 leading-[2] dark:border-slate-600 dark:bg-slate-600 rounded-lg">{message.message}</p>
                    </div> : <div key={message.id} className="m-2 my-4 flex justify-end items-center">


                        <p className="p-2 px-4 leading-[2] dark:border-slate-600 dark:bg-slate-600 rounded-lg">{message.message}</p>
                        <div className="w-0 h-0
                        border-t-[5px] border-t-transparent
                        border-l-[10px] border-l-slate-600
                        border-b-[5px] border-b-transparent">
                        </div>
                        <Image className="flex-none rounded-full ml-2"
                            src="/System_portrait.jpg"
                            width={50}
                            height={50}
                            alt="Picture of the system"
                        />
                    </div>
                )}

                {state.responseLoading && <div className="m-4 animate-pulse flex justify-end">
                    <div className="rounded-full bg-slate-600 h-3 w-3 mr-1"></div>
                    <div className="rounded-full bg-slate-600 h-3 w-3 mr-1"></div>
                    <div className="rounded-full bg-slate-600 h-3 w-3 mr-1"></div>
                </div>}
            </div>
            <form className="flex m-4" onSubmit={(event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                handleSendMessage(((event.target as HTMLFormElement)[0] as HTMLInputElement).value);
                ((event.target as HTMLFormElement)[0] as HTMLInputElement).value = '';
            }}>
                <input disabled={state.responseLoading} type="text" id="message" className="mr-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ask me anything..."></input>
                <button disabled={state.responseLoading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send</button>
            </form>
        </div>
    )
}