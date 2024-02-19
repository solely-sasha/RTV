import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Issues from "../components/Issues";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import Loader from "../components/Loader";

export default function MyIssues() {
  const { search } = useLocation();
  // console.log(search);
  const [issues, setIssues] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchIssues = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`/api/issues/user/${user._id}`);
      // console.log(res.data);
      setIssues(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [search]);
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center ">
            <Loader />
          </div>
        ) : !noResults ? (
          issues.map((issue) => (
            <>
              <Link to={user ? `/issues/issue/${issue._id}` : "/login"}>
                <Issues key={issue._id} issue={issue} user={user} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">Issue Not Found</h3>
        )}
      </div>
      <Footer />
    </div>
  );
}
