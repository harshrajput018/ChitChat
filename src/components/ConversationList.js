import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ConversationList.css';

const ConversationList = ({ selectedConversation, onConversationSelect }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allusers, setallusers] = useState([]);
  const [all,setall] = useState([]);

  const [dummyConversations, setdc] = useState([
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
  ]


  );

  const handleSearch = () => {

    if (searchQuery == '') {
      console.log('ddd')
      setSearchResults([])
      return;
    }
    const results = all.filter(conversation => {
      return conversation.username.toLowerCase().includes(searchQuery.toLowerCase())
    }
    );
    console.log('results',results);
    setSearchResults(results);



  };

  console.log(searchResults)
  useEffect(() => {
    handleSearch();
  }, [searchQuery])

  const handleSendRequest = (conversationId) => {
    fetch('http://localhost:9000/request',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token : localStorage.getItem('token'), to:conversationId })
      
    })
  };

  console.log('all',all)
  console.log('allusers',allusers)

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('logoutFlag', 'true');
    navigate('/');
  };


  const handleFriends = () => {

    localStorage.setItem('chatWindow', 'false');
    localStorage.setItem('freinds', 'true');
    window.location.reload();

  }

  const handleChat = () => {

    localStorage.setItem('chatWindow', 'true');
    localStorage.setItem('freinds', 'false');
    window.location.reload();

  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const getFriends = ()=>{
    fetch('http://localhost:9000/friends/getfriends',{
        headers:{
            token: localStorage.getItem('token'),
        }
    }).then((res)=>res.json()).then(res=>setallusers(res.users))}
  // fetching all users for search

  const getAllUsers = ()=>{

    fetch('http://localhost:9000/allusers/allusers').then(res=>res.json()).then(res=>setall(res.allusers))

  }
  useEffect(() => {

    getFriends()
    getAllUsers()

  }, [])

  return (
    <div className="conversation-list">
      <div className="search-people">
        <input
          type="text"
          placeholder="Search people..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
          }}
        />

      </div>

      {searchQuery.length > 0 && (
        <div className="search-results">
          <h4>Search Results</h4>
          {searchResults.map((conversation) => (

           
            <div key={conversation._id} className="search-result">
              
              <div className="profile-pic">
                <img src={'https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg'} alt={`Profile of ${conversation.name}`} />
              </div>
              <div style={{ display: 'flex', width: '100%', justifyContent: "space-between", alignItems: 'center' }} className="search-result-info">
                <h4 className="name">{conversation.username}</h4>
                <button style={{
                  backgroundColor: 'rgb(231, 176, 176)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  fontSize: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s, transform 0.3s',
                }} id='sendreq' onClick={() => {handleSendRequest(conversation._id)
                }} >{ allusers.includes(conversation)?'Friend':'Send Request'}</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="menu-container">
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>&#9776;</div>
        </div>
        <div id='men' onClick={()=>{
          document.getElementById('men').style.display=document.getElementById('men').style.display=='block' ? 'none': 'block' 
        }} className={`menu ${isMenuOpen ? 'open' : ''}`}>
          <button onClick={handleLogout} className="menu-item">Logout</button>
          <button onClick={handleFriends} className="menu-item">Friends</button>
          <button onClick={handleChat} className="menu-item">Chat</button>
        </div>
      </div>

      {allusers.map((conversation) => (
        <div
          key={conversation._id}
          className={`conversation ${selectedConversation === conversation._id ? 'active' : ''}`}
          onClick={() => {
            localStorage.setItem('chatWindow', 'true');
            localStorage.setItem('freinds', 'false');

            onConversationSelect(conversation._id);
          }}
        >
          <div className="profile-pic">
            <img src='https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg' alt={`Profile of ${conversation.name}`} />
          </div>
          <div className="conversation-info">
            <h4 className="name">{conversation.username}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;


