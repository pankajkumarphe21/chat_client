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
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        {
          messages.map((element, i) => {
            return (<>
              {element.author === userName ? <div className='you' key={i}>{element.message}</div> : <div className='other' key={i}>{element.message}</div>}
              <br /> <br />
            </>)
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
