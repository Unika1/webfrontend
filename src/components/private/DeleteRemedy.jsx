import React from "react";
import axios from "axios";

function DeleteRemedy({ remedyId, onDeleteSuccess }) {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("⚠ No token found. Please log in.");
                return;
            }

            console.log("🟡 Deleting remedy ID:", remedyId);
            console.log("🟢 Sending request with token:", token);

            const response = await axios.delete(`http://localhost:5000/api/remedies/${remedyId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

            console.log("✅ Server response:", response);

            if (response.status === 200) {
                alert("✅ Remedy deleted successfully");
                onDeleteSuccess(remedyId);
            } else {
                alert("⚠ Failed to delete remedy.");
            }
        } catch (error) {
            console.error("❌ Error deleting remedy:", error.response?.data || error.message);
            alert("❌ " + (error.response?.data?.error || "Unknown error"));
        }
    };

    return <button onClick={handleDelete} className="delete-btn">Delete</button>;
}

export default DeleteRemedy;
