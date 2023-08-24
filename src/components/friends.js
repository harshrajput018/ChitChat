import React, { useState } from 'react';
import '../styles/FriendsComponent.css';

const FriendsComponent = () => {
  const [activeTab, setActiveTab] = useState('allFriends');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const allFriendsData = [
    {
      id: 1,
      name: 'John Doe',
      profilePic: 'https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      profilePic: 'https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg',
    },
    // Add more friends here
  ];

  const friendRequestsData = [
    {
      id: 1,
      name: 'Alex Johnson',
      profilePic: 'https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg',
    },
    {
      id: 2,
      name: 'Emily Brown',
      profilePic: 'https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg',
    },
    // Add more friend requests here
  ];

  return (
    <div className="friends-component">
      <div className="tabs">
        <button style={{color:"black"}}
          className={`tab-button ${activeTab === 'allFriends' ? 'active' : ''}`}
          onClick={() => handleTabChange('allFriends')}
        >
          All Friends
        </button>
        <button style={{color:'black'}}
          className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => handleTabChange('requests')}
        >
          Requests
        </button>
      </div>
      <div className="content">
        {activeTab === 'allFriends' && (
          <div className="friends-list">
            {allFriendsData.map((friend) => (
              <div key={friend.id} className="friend-item">
                <img src={friend.profilePic} alt={friend.name} />
                <p>{friend.name}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'requests' && (
          <div className="requests-list">
            {friendRequestsData.map((request) => (
              <div key={request.id} className="request-item">
                <img src={request.profilePic} alt={request.name} />
                <p>{request.name}</p>
                <button className="accept-button">Accept</button>
                <button className="reject-button">Reject</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsComponent;
