import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Issues({ issue }) {
  return (
    <div className="w-full flex mt-8 space-x-4">
      <div className=" w-[200px] flex justify-center items-center">
        <img
          src={issue.image}
          alt="political issue meme"
          className="h-full w-full object-cover "
        />
      </div>

      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2  mb-1 md:text-2xl">
          {issue.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between space-x-4 md:mb-4">
          <p> @{issue.username} </p>
          <div className="flex space-x-2 text-sm">
            <p>{new Date(issue.createdAt).toString().slice(0, 15)}</p>
            <p>{new Date(issue.createdAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">{issue.description}</p>
      </div>
    </div>
  );
}
