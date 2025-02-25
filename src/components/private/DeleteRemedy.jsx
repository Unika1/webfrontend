// src/components/private/DeleteRemedy.jsx
import React from "react";
import axios from "axios";

function DeleteRemedy({ remedyId }) {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/admin/remedy/${remedyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Remedy deleted successfully");
            window.location.reload(); // Refresh to reflect changes
        } catch (error) {
            console.error("Failed to delete remedy:", error);
            alert("Failed to delete remedy");
        }
    };

    return (
        <button onClick={handleDelete} className="delete-btn">
            Delete
        </button>
    );
}

export default DeleteRemedy;
