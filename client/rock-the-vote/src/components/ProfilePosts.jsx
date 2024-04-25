import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePosts({ issue }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/issues/issue/" + issue._id);
  };

  return (
    <div className="w-full flex mt-8 space-x-4 curosor-pointer">
      <div
        onClick={handleClick}
        className="w-[35%] h-[200px] flex justify-center items-center"
      >
        <img src={issue.image} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {issue.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{issue.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(issue.createdAt).toString().slice(0, 15)}</p>
            <p>{new Date(issue.createdAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">{issue.description.slice(0, 200)}</p>
      </div>
    </div>
  );
}
