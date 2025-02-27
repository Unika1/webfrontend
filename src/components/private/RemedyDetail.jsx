import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../style/RemedyDetail.css";

const RemedyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [remedy, setRemedy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedReviewText, setEditedReviewText] = useState("");

  // Get user details from localStorage
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchRemedy = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/remedies/${id}`);
        setRemedy(response.data);
      } catch (error) {
        setError("Failed to load remedy details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchRemedy();
    fetchReviews();
  }, [id]);

  // Submit New Review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!newReview.trim()) {
      alert("Please write your review!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/reviews", {
        remedyId: id,
        userId,
        username,
        comment: newReview,
      });

      console.log("Review Submitted Successfully:", response.data);

      if (response.data.success) {
        setNewReview("");
        setReviews([...reviews, response.data.review]);
      } else {
        console.error("❌ Unexpected response format:", response.data);
        alert("Unexpected response format!");
      }
    } catch (error) {
      console.error("❌ Error submitting review:", error.response?.data || error.message);
      alert("Failed to submit review. Please try again.");
    }
  };

  // ✅ Delete Review
  const handleDeleteReview = async (reviewId) => {
    try {
      if (!userId) {
        alert("User not logged in!");
        return;
      }

      const response = await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
        params: { userId },
      });

      if (response.data.success) {
        setReviews(reviews.filter((review) => review.id !== reviewId));
        console.log("✅ Review deleted successfully");
      } else {
        console.error("❌ Unexpected response:", response.data);
        alert("Failed to delete review.");
      }
    } catch (error) {
      console.error("❌ Error deleting review:", error.response?.data || error.message);
      alert("Failed to delete review. Please try again.");
    }
  };

  // ✅ Enable Edit Mode
  const handleEditClick = (review) => {
    setEditingReviewId(review.id);
    setEditedReviewText(review.comment);
  };

  // ✅ Save Edited Review
  const handleSaveEdit = async (reviewId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/reviews/${reviewId}`, {
        userId,
        comment: editedReviewText,
      });

      if (response.data.success) {
        setReviews(reviews.map((review) => 
          review.id === reviewId ? { ...review, comment: editedReviewText } : review
        ));
        setEditingReviewId(null);
        console.log("✅ Review updated successfully");
      } else {
        console.error("❌ Unexpected response:", response.data);
        alert("Failed to update review.");
      }
    } catch (error) {
      console.error("❌ Error updating review:", error.response?.data || error.message);
      alert("Failed to update review. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="back-btn" onClick={() => navigate("/")}>🏠 Back to Home</button>
      </div>
    );
  }

  return (
    <div className="remedy-detail">
      <Navbar />
      <div className="remedy-container">
        
        <div className="remedy-title-section">
         
          <p className="remedy-title">{remedy.title}</p>
        </div>

        <img src={`http://localhost:5000/uploads/${remedy.image}`} alt={remedy.title} className="remedy-image" />

        <h3 className="section-heading">Description</h3>
        <p className="remedy-description">{remedy.description}</p>

        <h3 className="section-heading">📝 Procedure</h3>
        <p className="remedy-procedure">{remedy.procedure}</p>

        {/* ✅ Reviews Section */}
        <div className="review-section">
          <h3 className="section-heading">📝 User Reviews</h3>
          {reviews.length > 0 ? (
            <ul className="review-list">
              {reviews.map((review) => (
                <li key={review.id} className="review-item">
                  <strong>{review.username}:</strong> 
                  
                  {/* ✅ If in edit mode, show textarea */}
                  {editingReviewId === review.id ? (
                    <>
                      <textarea
                        value={editedReviewText}
                        onChange={(e) => setEditedReviewText(e.target.value)}
                        className="edit-textarea"
                      />
                      <button className="save-edit-btn" onClick={() => handleSaveEdit(review.id)}>💾 Save</button>
                    </>
                  ) : (
                    <span>{review.comment}</span>
                  )}

                  {/* ✅ Show buttons only for the logged-in user's reviews */}
                  {review.userId === Number(userId) && (
                    <div>
                      <button className="edit-review-btn" onClick={() => handleEditClick(review)}>✏️ Edit</button>
                      <button className="delete-review-btn" onClick={() => handleDeleteReview(review.id)}>❌ Delete</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-reviews">No reviews yet. Be the first to share your experience!</p>
          )}

          <form onSubmit={handleReviewSubmit} className="review-form">
            <textarea
              placeholder="Write your review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="review-textarea"
              required
            />
            <button type="submit" className="submit-review-btn">Submit Review</button>
          </form>
        </div>

        <button className="back-btn" onClick={() => navigate("/")}>🏠 Back to Home</button>
      </div>
      <Footer />
    </div>
  );
};

export default RemedyDetail;
