import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/UserContext";

export default function EditIssue() {
  const issueId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imgUrl: "",
    cat: "",
    cats: [],
  });

  const fetchIssue = async () => {
    try {
      const res = await axios.get("/api/issues/" + issueId);
      setFormData({
        title: res.data.title,
        description: res.data.description,
        imgUrl: res.data.image,
        cat: "",
        cats: res.data.categories,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const issue = {
      title: formData.title,
      description: formData.description,
      username: user.username,
      userId: user._id,
      cat: formData.cat,
      categories: formData.cats,
    };

    try {
      const res = await axios.put("/api/issues/" + issueId, issue, {
        withCredentials: true,
      });
      navigate("/issues/issue/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = (i) => {
    let updatedCats = [...formData.cats];
    updatedCats.splice(i, 1);
    setFormData((prevData) => ({
      ...prevData,
      cats: updatedCats,
    }));
  };

  const addCategory = () => {
    setFormData((prevData) => ({
      ...prevData,
      cats: [...prevData.cats, formData.cat],
      cat: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchIssue();
  }, [issueId]);

  const { title, description, imgUrl, cats } = formData;

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl "> Edit Issue </h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            onChange={handleChange}
            value={title}
            name="title"
            type="text"
            placeholder="Enter issue title"
            className="px-4 py-2 outline-none"
          />
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={handleChange}
            placeholder="image url"
            className="px-4 py-2 outline-none"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                name="cat"
                value={formData.cat}
                onChange={handleChange}
                className="px-4 py-2 outline-none"
                placeholder="Enter issue category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            rows={10}
            cols={10}
            className="px-4 py-2 outline-none"
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="enter issue description"
          />
          <button
            onClick={handleUpdate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
