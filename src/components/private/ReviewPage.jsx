import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../style/Review.css";

const ReviewSection = () => {
  const { id: remedyID } = useParams(); // Use remedyID consistently
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);

  const userEmail = localStorage.getItem("userEmail") || "";
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/review/${remedyID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error.response ? error.response.data : error.message);
        setError("Failed to fetch reviews.");
      }
    };

    fetchReviews();
  }, [token, remedyID]);

  // Handle review submission
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    const reviewData = {
      ratings: rating,
      comment: review,
      remedyID: remedyID, // Make sure to use remedyId to link the review
      userId:userId,
    };

    try {
      const response = await axios.post(`http://localhost:5000/api/review/create_reviews`, reviewData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews((prevReviews) => [...prevReviews, response.data]);
      setReview("");
      setRating(0);
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error submitting review:", error.response ? error.response.data : error.message);
      setError("Failed to submit review.");
    }
  };

  // Handle review editing
  const handleEdit = (reviewID) => {
    const reviewToEdit = reviews.find((r) => r.reviewID === reviewID); // Corrected field name for reviewID
    if (!reviewToEdit) return;

    setReview(reviewToEdit.comment);
    setRating(reviewToEdit.ratings);
    setEditingReviewId(reviewID);
    setIsFormVisible(true);
  };

  // Handle review update
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingReviewId) return;

    const reviewData = {
      ratings: rating,
      comment: review,
      remedyId: remedyID, // Ensure remedyId is passed when updating
      userId,
      email: userEmail,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/review/${editingReviewId}`,
        reviewData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviews((prevReviews) =>
        prevReviews.map((r) =>
          r.reviewID === editingReviewId ? { ...r, ...response.data } : r
        )
      );
      setReview("");
      setRating(0);
      setEditingReviewId(null);
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error updating review:", error.response ? error.response.data : error.message);
      setError("Failed to update review.");
    }
  };

  // Handle review deletion
  const handleDelete = async (reviewID) => {
    try {
      await axios.delete(`http://localhost:5000/api/review/reviews/${reviewID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews((prevReviews) => prevReviews.filter((r) => r.reviewID !== reviewID));
    } catch (error) {
      console.error("Error deleting review:", error.response ? error.response.data : error.message);
      setError("Failed to delete review.");
    }
  };

  return (
    <div className="review-section">
      <h2>User Reviews</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <strong>{review.email}</strong>
            <div className="review-rating">
              {"★".repeat(review.ratings)}{" "}
              {"☆".repeat(5 - review.ratings)}
            </div>
            <p>{review.comment}</p>
            <div className="review-actions">
              <button onClick={() => handleEdit(review.reviewID)}>Edit</button>
              <button onClick={() => handleDelete(review.reviewID)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setIsFormVisible(true)}>Leave a Review</button>

      {isFormVisible && (
        <form onSubmit={editingReviewId ? handleUpdate : handleCreate}>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            required
          />
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={rating >= star ? "star filled" : "star"}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <button type="submit">{editingReviewId ? "Update" : "Submit"}</button>
          <button type="button" onClick={() => setIsFormVisible(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewSection;
