import React, { useState, useEffect } from 'react';
import { auth, db } from '../utils/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './EditProfile.css';

const EditProfile = () => {
  const [userData, setUserData] = useState(null);
  const [newAchievement, setNewAchievement] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const achievements = Array.isArray(data.achievements) ? data.achievements : [];
          setUserData({ ...data, achievements });
        } else {
          console.error('No document found!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    setLoading(false);
  };

  const handleAddAchievement = async () => {
    if (!newAchievement.trim()) return;

    const user = auth.currentUser;
    if (user && userData) {
      try {
        const docRef = doc(db, 'users', user.uid);
        const updatedAchievements = [...userData.achievements, newAchievement];
        await updateDoc(docRef, { achievements: updatedAchievements });
        setUserData((prev) => ({ ...prev, achievements: updatedAchievements }));
        setNewAchievement('');
      } catch (error) {
        console.error('Error updating achievements:', error);
      }
    }
  };

  const handleDeleteAchievement = async (index) => {
    const user = auth.currentUser;
    if (user && userData) {
      try {
        const docRef = doc(db, 'users', user.uid);
        const updatedAchievements = userData.achievements.filter((_, i) => i !== index);
        await updateDoc(docRef, { achievements: updatedAchievements });
        setUserData((prev) => ({ ...prev, achievements: updatedAchievements }));
      } catch (error) {
        console.error('Error deleting achievement:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <p className="loading-message">Loading edit profile...</p>;
  }

  if (!userData) {
    return <p className="error-message">Failed to load profile data. Please try again later.</p>;
  }

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <h3>Achievements:</h3>
      <ul className="achievement-list">
        {userData.achievements.map((ach, index) => (
          <li key={index} className="achievement-item">
            {ach}
            <button
              onClick={() => handleDeleteAchievement(index)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="add-achievement">
        <input
          type="text"
          value={newAchievement}
          onChange={(e) => setNewAchievement(e.target.value)}
          placeholder="Add new achievement"
          className="achievement-input"
        />
        {}
        <button onClick={handleAddAchievement} className="add-achievement-button">
          Add Achievement
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
