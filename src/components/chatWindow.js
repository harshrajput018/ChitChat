import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client'
import '../styles/ChatWindow.css'; // Update with the correct path for CSS // Update the path accordingly

const ChatWindow = ({ conversationId }) => {

  console.log(conversationId)  

  const [newMessage, setNewMessage] = useState('');
  const [messages, setConversation] = useState(null);
  const messageListRef = useRef(null);
  const [dummyConversations,setdc] = useState([
    {
        id: 1,
        name: 'John Doe',
        profilePic: 'https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg',
        messages: [
            { id: 1, sender: 'John Doe', text: 'Hey, how are you?', timestamp: '10:30 AM' },
            { id: 2, sender: 'You', text: 'I\'m good, thanks! How about you?', timestamp: '10:35 AM' },
            { id: 3, sender: 'John Doe', text: 'I\'m doing well too!', timestamp: '10:38 AM' },
            { id: 4, sender: 'You', text: 'That\'s great to hear!', timestamp: '10:40 AM' },
            // Add more messages here
        ],
    },
    {
        id: 2,
        name: 'Jane Smith',
        profilePic: 'https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg',
        messages: [
            { id: 1, sender: 'Jane Smith', text: 'Hi there!', timestamp: '11:15 AM' },
            { id: 2, sender: 'You', text: 'Hello!', timestamp: '11:20 AM' },
            { id: 3, sender: 'Jane Smith', text: 'What are you up to?', timestamp: '11:25 AM' },
            { id: 4, sender: 'You', text: 'Just working on some stuff. How about you?', timestamp: '11:30 AM' },
            // Add more messages here
        ],
    },
    {
        id: 3,
        name: 'Alex Johnson',
        profilePic: 'https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg',
        messages: [
            { id: 1, sender: 'Alex Johnson', text: 'Hey, how\'s it going?', timestamp: '12:45 PM' },
            { id: 2, sender: 'You', text: 'Not bad! How about you?', timestamp: '12:50 PM' },
            { id: 3, sender: 'Alex Johnson', text: 'Just had lunch. Any plans for the day?', timestamp: '12:55 PM' },
            // Add more messages here
        ],
    },
    {
        id: 4,
        name: 'Emily Brown',
        profilePic: 'https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg',
        messages: [
            { id: 1, sender: 'Emily Brown', text: 'Hello!', timestamp: '2:00 PM' },
            { id: 2, sender: 'You', text: 'Hi Emily! How are you?', timestamp: '2:05 PM' },
            // Add more messages here
        ],
    },
    {
        id: 5,
        name: 'David Lee',
        profilePic: 'https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg',
        messages: [
            // Add messages for David Lee here
        ],
    },
    // Add more conversations here
])


useEffect(() => {

    fetch('http://localhost:8002',{
        headers:{
            from: localStorage.getItem('token'),
            to: conversationId
        }
    }).then(res=>res.json()).then(res=>{

        setConversation(res.msgs);
        
    });

  }, [conversationId]); 
  
    
    // Establish socket connection

    // useEffect(() => {

    //     console.log('ndfhhd')
    //     const socket = io('http://localhost:7001',{
    //         auth: {
    //           token: localStorage.getItem('token') // Replace with the actual token
    //         }}) // Replace with your server URL
    
    //     socket.on('send', (message) => {
    //       // Handle the incoming message here
    //       const newMessageObj = {
    //         id: conversation.messages.length + 1,
    //         sender: 'John Doe',
    //         text: message.content,
    //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    //       };
      
    //       const updatedConversation = {
    //         ...conversation,
    //         messages: [...conversation.messages, newMessageObj],
    //       };
      
    //       setConversation(updatedConversation);
          
    //       console.log('Received message:', message);
    //     });
    
        
    //   }, []);
   
    
  
    
    
  // Empty dependency array to run this effect only once
  

  

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const socket = io('http://localhost:7001',{
            auth: {
              token: localStorage.getItem('token') // Replace with the actual token
            }})

    socket.emit('send',{fromtoken: localStorage.getItem('token'), to: '64e2a14519e5c02dcad928d4', content:newMessage, time: new Date().toLocaleTimeString()
})

    fetch('http://localhost:8001',{

    method:"POST",
    headers: {
        'Content-Type': 'application/json',
    },

    body:JSON.stringify({
        to: conversationId,
        from : localStorage.getItem('token'),
        content: newMessage
    })


    }).then(res=>res.json()).then(res=>console.log(res)).then(
        setTimeout(()=>{
            fetch('http://localhost:8002',{
        headers:{
            from: localStorage.getItem('token'),
            to: conversationId
        }
    }).then(res=>res.json()).then(res=>{

        setConversation(res.msgs);

        console.log(res.msgs)
        
    })}
        ,100))
        
  
    // Event listener for receiving messages
    
  

    // const newMessageObj = {
    //   id: conversation.messages.length + 1,
    //   sender: 'You',
    //   text: newMessage,
    //   timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    // };

    // const updatedConversation = {
    //   ...conversation,
    //   messages: [...conversation.messages, newMessageObj],
    // };

    // setConversation(updatedConversation);
    setNewMessage('');

    

    // Scroll to the bottom of the message list after a short delay to ensure rendering
    setTimeout(() => {
      const messageList = messageListRef.current;
      if (messageList) {
        messageList.scrollTop = messageList.scrollHeight;
      }
    }, 100); // Adjust the delay as needed
  };

//   if (!conversation) {
//     return <div className="chat-window">Loading...</div>;
//   }

  return (
    <div className="chat-window">
      <div className="chat-header">
        {/* <h2 className="chat-title">{conversation.name}</h2> */}
      </div>
      <div className="message-list" ref={messageListRef}>
        { messages && messages.map(message => (
          <div key={message._id} className={`message ${message.to === conversationId ? 'sent' : 'received'}`}>
            <div className="message-content">
              <p className="message-text">{message.content}</p>
              <p className="message-timestamp">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={event => setNewMessage(event.target.value)}
          />
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
