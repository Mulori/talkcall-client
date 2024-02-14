'use client'

import React, { useRef, useState, useEffect } from "react";
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";
import "./styles.css"

export default function Chat(){   
    const messagesEndRef  = useRef();
    const messageRef = useRef();
    const [messageList, setMessageList] = useState([]);
    const [socket, setSocket] = useState();


    useEffect(() => {
        const username = localStorage.getItem('username')

        const socketinit = io.connect('http://localhost:3001')
        socketinit.emit('setUsername', username)

        setSocket(socketinit)
    }, [])

    useEffect(() => {
        if(!socket)
            return;

        socket.on('receive_message', data => {
            console.log(socket.id)

            if(data.authorId !== socket.id)
                playNotify();
            
            setMessageList((current) => [...current, data])
        });

        return () => socket.off('receive_message')
    }, [socket])

    useEffect(() => {
        scrollDown();
    }, [messageList])

    const playNotify = () => {        
        new Audio('/notify.wav').play();
    }     

    const scrollDown= () => {
        if (messagesEndRef .current) {
            messagesEndRef .current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = () => {
        const message = messageRef.current.value

        if(!message.trim())
            return; 

        socket.emit('message', message)
        clearInput();
        focusInput();
    }

    const clearInput = () => {
        messageRef.current.value = ""
    }

    const focusInput = () => {
        messageRef.current.focus();
    }

    const sendEnterKey = (e) => {
        console.log(e.key);

        if(e.key === 'Enter')
            handleSubmit()
    }

    return (
        <div className="container-xxl my-md-4">
            <div className="container-chat w-100`">
                <header>
                    <h2>Chat</h2>
                </header>
                <div className="container-message">
                    <section className="message-list">
                        {
                            messageList.map((message, index) => (
                                <div key={index} style={{ justifyContent: message.authorId === socket.id ? 'end' : 'start', display: 'flex', marginTop: '10px' }} ref={(index === messageList.length - 1) ? messagesEndRef : null}>
                                    <div className="message">
                                        <span className="name-author">{message.author}:</span>
                                        <p className="text-author"><small>{message.text}</small></p>
                                    </div>
                                </div>                      
                            ))
                        }
                    </section>                    
                </div>                
                <div style={{ minWidth: '100%', display: 'flex', marginTop: '20px', gap: '5px'}}>
                    <input style={{ minWidth: '95%', borderRadius: '10px', backgroundColor: '#FFF', color: '#3b3b3b' }} onKeyDown={(e) => sendEnterKey(e)} type="text" id="outlined-basic" ref={messageRef}  />
                    <SendIcon style={{ minWidth: '5%', color: '#FFF' }} onClick={() => handleSubmit()}>Enviar</SendIcon>
                </div>
            </div>   
        </div>
    )
}