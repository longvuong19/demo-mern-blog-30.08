import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const [posts, setPosts] = useState([]);
  const param = useParams().id;
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  // console.log(user);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + `/users/${user._id}`);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + `/users/${user._id}`,
        {
          username,
          email,
        },
        {
          withCredentials: true,
        }
      );
      setUpdated(true);
    } catch (error) {
      console.log(error);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + `/users/${user._id}`, {
        withCredentials: true,
      });
      alert("User has been deleted!");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.table(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  const fetchUserPost = async () => {
    try {
      const res = await axios.get(URL + `/posts/user/${user._id}`);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserPost();
  }, [param]);

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start">
        {/* Left */}
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4">Your posts</h1>
          {posts?.map((post) => (
            <ProfilePosts key={post._id} post={post} />
          ))}
        </div>

        {/* Right */}
        <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Username"
              className="outline-none px-4 py-2 text-gray-200"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className="outline-none px-4 py-2 text-gray-200"
            />
            {/* <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="outline-none px-4 py-2 text-gray-200"
            /> */}
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white px-4 py-2 font-semibold bg-slate-800 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white px-4 py-2 font-semibold bg-slate-800 hover:text-black hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-lg text-center mt-4">
                User has been updated!
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
