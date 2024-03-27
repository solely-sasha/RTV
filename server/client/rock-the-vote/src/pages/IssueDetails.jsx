import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Comments from "../components/Comments";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

export default function IssueDetails() {
  const issueId = useParams().id;
  const [issue, setIssue] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchIssue = async () => {
    try {
      const res = await axios.get("/api/issues/" + issueId);
      // console.log(res.data);
      setIssue(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteIssue = async () => {
    try {
      const res = await axios.delete("/api/issues/" + issueId, {
        withCredentials: true,
      });
      // console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIssue();
  }, [issueId]);

  const fetchIssueComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get("/api/comments/issue/" + issueId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  const handleUpvote = async () => {
    try {
      await axios.put("/api/issues/upvote/" + issueId);
      fetchIssue();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownvote = async () => {
    try {
      await axios.put("/api/issues/downvote/" + issueId);

      fetchIssue();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIssueComments();
  }, [issueId]);

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/comments/create",
        {
          comment: comment,
          author: user.username,
          issueId: issueId,
          userId: user._id,
        },
        { withCredentials: true }
      );

      setComments([...comments, res.data]);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {issue.title}
            </h1>
            {user?._id === issue?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate("/edit/" + issueId)}
                >
                  <BiEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeleteIssue}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{issue.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(issue.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(issue.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <img src={issue.image} className="w-[500px]  mx-auto mt-8" alt="" />
          <div className="flex items-end">
            <button onClick={handleUpvote}>
              <BiSolidUpvote />
              {issue.upvoteCount}
            </button>
            <h6 className="mr-2"> </h6>
            <button onClick={handleDownvote}>
              <BiSolidDownvote />
              {issue.downvoteCount}
            </button>
            <h6 className=""></h6>
          </div>

          <p className="mx-auto mt-8">{issue.description}</p>

          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {issue.categories?.map((c, i) => (
                <>
                  <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                    {c}
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((c) => (
              <Comments key={c._id} c={c} issue={issue} />
            ))}
          </div>
          {/* write a comment */}
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              name="comment"
              value={comment}
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
            />
            <button
              onClick={submitComment}
              className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
