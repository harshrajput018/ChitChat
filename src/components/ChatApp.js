import React, { useEffect, useState } from 'react';
import ConversationList from './ConversationList';
import ChatWindow from './chatWindow';
import FriendsComponent from './friends';
import '../styles/ChatApp.css'; // Import your CSS file for styling

const ChatApp = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleConversationSelect = (conversationId) => {
    setSelectedConversation(conversationId);
  };

  
  

  return (
    <div>

      {localStorage.getItem('token') ? <div className="chat-app">
          {/* Show the Login component if not logged in */}
          <div className="conversation-list-container">
            {isLoggedIn && (
              <ConversationList
                selectedConversation={selectedConversation}
                onConversationSelect={handleConversationSelect}
              />
            )}
          </div>
          {localStorage.getItem('chatWindow')=='true' && <div className="chat-window-container">
            {isLoggedIn && selectedConversation ? (
              <ChatWindow conversationId={selectedConversation} />
            ) : (
              <p className="no-conversation-message">
                {isLoggedIn ? 'Select a conversation to start chatting.' : 'Please log in.'}
              </p>
            )}
          </div> }
          {localStorage.getItem('chatWindow')=='false' && <div style={{flex:2}} >
            <FriendsComponent/>
          </div>}
        </div>: 'You need to login first'}
        

      
    </div>
  );
};

export default ChatApp;
