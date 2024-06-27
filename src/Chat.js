import React, { useEffect, useState } from 'react'

const Chat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      if (messages.length) {
        setMessages([...messages, messageData]);
      }
      else {
        setMessages([messageData]);
      }
      await socket.emit("send_message", messageData);
    }
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (messages.length) {
        setMessages([...messages, data]);
      }
      else {
        setMessages([data]);
      }
    })
  }, [socket, messages])
  return (
    <div className='chat-window'>
      <h1>{userName}</h1>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        {
          messages.map((element, i) => {
            return (<div key={i}>
              {element.author === userName ? <div className='you' >{element.message}</div> : <div className='other' >{element.message}</div>}
              <br /> <br />
            </div>)
          })
        }
      </div>
      <div className='chat-footer'>
        <input type="text" placeholder='Hey...' onChange={(e) => { setCurrentMessage(e.target.value) }} value={currentMessage} />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
