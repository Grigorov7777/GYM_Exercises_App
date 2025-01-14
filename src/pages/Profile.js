import React, { useState, useEffect } from 'react';
import { auth, db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import './Profile.css'; // Importing Profile-specific CSS


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          setUserEmail(user.email); // Set the current user's email
          const userDoc = doc(db, 'users', user.uid);
          const docSnapshot = await getDoc(userDoc);

          if (docSnapshot.exists()) {
            setUserData(docSnapshot.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p className="loading-message">Loading user data...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Welcome, {userEmail || 'User'}!</h1>
      </div>
      <div className="profile-achievements">
        <h2>Achievements:</h2>
        {userData && userData.achievements && userData.achievements.length > 0 ? (
          <ul className="achievements-list">
            {userData.achievements.map((achievement, index) => (
              <li key={index} className="achievement-item">
                {achievement}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-achievements">No achievements yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;


