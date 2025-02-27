// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "../style/FaceCareDetails.css"; // Import your CSS file
// import Navbar from "../Navbar";
// import Footer from "../Footer";

// const FaceCareDetails = () => {
//   const { id } = useParams();
//   const [remedy, setRemedy] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [likes, setLikes] = useState(0);

//   useEffect(() => {
//     const fetchRemedyDetails = async () => {
//       try {
//         const response = await axios.get(`/api/remedies/${id}`);
//         setRemedy(response.data);
//       } catch (error) {
//         console.error("Error fetching remedy details:", error);
//       }
//     };
  
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`/api/comments/${id}`);
//         setComments(response.data);
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     };
  
//     const fetchLikes = async () => {
//       try {
//         const response = await axios.get(`/api/remedies/${id}/likes`);
//         setLikes(response.data.likes);
//       } catch (error) {
//         console.error("Error fetching likes:", error);
//       }
//     };
  
//     fetchRemedyDetails();
//     fetchComments();
//     fetchLikes();
//   }, [id]);
  
//   const handleCommentSubmit = async () => {
//     if (newComment.trim()) {
//       try {
//         const response = await axios.post('/api/comments', {
//           remedyId: id,
//           text: newComment,
//         });
//         setComments([...comments, response.data]);
//         setNewComment("");
//       } catch (error) {
//         console.error("Error submitting comment:", error);
//       }
//     }
//   };
  
//   const handleLike = async () => {
//     try {
//       const response = await axios.post(`/api/remedies/${id}/like`);
//       setLikes(response.data.likes);
//     } catch (error) {
//       console.error("Error liking remedy:", error);
//     }
//   };

//   return (
//     <div className="facecare-details">
//       <Navbar />
//       <h1>{remedy.title}</h1>
//       <img src={remedy.image} alt={remedy.title} className="details-image" />
//       <p className="details-description-f">{remedy.description}</p>
//       <div className="procedure-section-f">
//         <h2>Procedure</h2>
//         <p className="procedure-text-f">{remedy.procedure || "No procedure details available."}</p>
//       </div>

//       {/* Like Section */}
//       <div className="like-section-f">
//         <button onClick={handleLike} className="like-button">
//           👍 Like {likes}
//         </button>
//       </div>

//       {/* Comments Section */}
//       <div className="comments-section-f">
//         <h3>Comments</h3>
//         {comments.length === 0 ? (
//           <p>No comments yet. Be the first to comment!</p>
//         ) : (
//           comments.map((comment, index) => (
//             <div key={index} className="comment-f">
//               <p className="author-f">User:</p>
//               <p>{comment.text}</p>
//               <p className="date-f">{comment.date}</p>
//             </div>
//           ))
//         )}
//         <textarea
//           placeholder="Leave a comment..."
//           value={newComment}
//           onChange={handleCommentChange}
//         />
//         <button onClick={handleCommentSubmit}>Submit Comment</button>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default FaceCareDetails;
