// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "../style/BodyCareDetails.css";
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import axios from "axios";

// const BodyCareDetails = () => {
//   const { id } = useParams();
//   const [remedy, setRemedy] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [likes, setLikes] = useState(0);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchRemedyDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/remedies/${id}`);
//         setRemedy(response.data);
//       } catch (error) {
//         console.error("Error fetching remedy details:", error);
//         setError("Failed to load remedy details.");
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/comments/${id}`);
//         setComments(response.data);
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//         setError("Failed to load comments.");
//       }
//     };

//     const fetchLikes = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/remedies/${id}/likes`);
//         setLikes(response.data.likes);
//       } catch (error) {
//         console.error("Error fetching likes:", error);
//       }
//     };

//     fetchRemedyDetails();
//     fetchComments();
//     fetchLikes();
//   }, [id]);

//   const handleCommentChange = (e) => {
//     setNewComment(e.target.value);
//     setError("");
//   };

//   const handleCommentSubmit = async () => {
//     if (newComment.trim()) {
//       try {
//         const response = await axios.post("http://localhost:5000/api/comments", {
//           remedyId: id,
//           text: newComment,
//         });
//         setComments([...comments, response.data]);
//         setNewComment("");
//       } catch (error) {
//         console.error("Error submitting comment:", error);
//         setError("Failed to submit comment.");
//       }
//     }
//   };

//   const handleLike = async () => {
//     try {
//       const response = await axios.post(`http://localhost:5000/api/remedies/${id}/like`);
//       setLikes(response.data.likes);
//     } catch (error) {
//       console.error("Error liking remedy:", error);
//       setError("Failed to like the remedy.");
//     }
//   };

//   return (
//     <div className="bodycare-details">
//       <Navbar />
//       {remedy ? (
//         <>
//           <h1>{remedy.title}</h1>
//           <img src={remedy.image} alt={remedy.title} className="details-image" />
//           <p className="details-description-b">{remedy.description}</p>
//           <div className="procedure-section-b">
//             <h2>Procedure</h2>
//             <p className="procedure-text-b">
//               {remedy.instruction || "No procedure details available."}
//             </p>
//           </div>

//           <div className="like-section-b">
//             <button onClick={handleLike} className="like-button">
//               👍 Like {likes}
//             </button>
//           </div>

//           <div className="comments-section-b">
//             <h3>Comments</h3>
//             {comments.length === 0 ? (
//               <p>No comments yet. Be the first to comment!</p>
//             ) : (
//               comments.map((comment, index) => (
//                 <div key={index} className="comment-b">
//                   <p className="author-b">User:</p>
//                   <p>{comment.text}</p>
//                   <p className="date-b">{comment.date}</p>
//                 </div>
//               ))
//             )}
//             <textarea
//               placeholder="Leave a comment..."
//               value={newComment}
//               onChange={handleCommentChange}
//             />
//             <button onClick={handleCommentSubmit}>Submit Comment</button>
//           </div>
//         </>
//       ) : (
//         <p>Loading remedy details...</p>
//       )}
//       {error && <p className="error-message">{error}</p>}
//       <Footer />
//     </div>
//   );
// };

// export default BodyCareDetails;
