import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Assuming you're using axios for API calls

function UserDashboard() {
//   const [remedies, setRemedies] = useState([]);
//   const [comment, setComment] = useState('');
//   const [selectedRemedyId, setSelectedRemedyId] = useState(null);

//   // Fetch remedies from the server (assuming you have an API to get remedies)
//   useEffect(() => {
//     const fetchRemedies = async () => {
//       try {
//         const response = await axios.get('/api/remedies');
//         setRemedies(response.data);
//       } catch (error) {
//         console.error("Error fetching remedies:", error);
//       }
//     };
//     fetchRemedies();
//   }, []);

//   // Handle comment submission
//   const handleCommentSubmit = async () => {
//     if (!comment || !selectedRemedyId) {
//       return;
//     }

//     try {
//       await axios.post('/api/comments', {
//         remedyId: selectedRemedyId,
//         text: comment,
//       });
//       setComment('');
//       alert('Comment added successfully!');
//     } catch (error) {
//       console.error("Error submitting comment:", error);
//     }
//   };

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      
      <div className="remedies-list">
        {remedies.map((remedy) => (
          <div key={remedy.id} className="remedy-card">
            <Link to={`/remedies/${remedy.id}`} className="remedy-title">
              <h2>{remedy.name}</h2>
            </Link>
            <p>{remedy.description}</p>

            {/* Comment Section */}
            <div className="comment-section">
              <textarea
                placeholder="Leave a comment"
                value={selectedRemedyId === remedy.id ? comment : ''}
                onChange={(e) => setComment(e.target.value)}
                onFocus={() => setSelectedRemedyId(remedy.id)}
              />
              <button onClick={handleCommentSubmit}>Submit Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
