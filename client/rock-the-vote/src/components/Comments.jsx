import React, { useContext, useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function Comments({ c }) {
  const { user } = useContext(UserContext);
  const [deleted, setDeleted] = useState(false);

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete("/api/comments/" + id, {
        withCredentials: true,
      });
      setDeleted(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (deleted) {
      alert("Comment has been deleted successfully");
    }
  }, [deleted]);

  if (deleted) {
    return null;
  }

  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
          {user?._id === c?.userId && (
            <div className="flex items-center justify-center space-x-2">
              <p
                className="cursor-pointer"
                onClick={() => handleDeleteComment(c._id)}
              >
                <MdDelete />
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="px-4 mt-2">{c.comment}</p>
    </div>
  );
}
