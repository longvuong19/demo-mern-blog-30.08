import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const [loader, setLoader] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + `/posts/${postId}`, {
        withCredentials: true,
      });
      alert("Your post has been deleted!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + `/posts/${postId}`);
      setPost(res.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComment = async () => {
    try {
      const res = await axios.get(URL + `/comments/post/${postId}`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostComment();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/comments/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      // fetchPostComment();
      // setComment("");
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-4 text-2xl cursor-pointer">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{post.username}</p>
            <div className="flex space-x-2 text-sm">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <img src={IF + post.photo} alt="" className="w-full mx-auto mt-8" />
          <p className="mx-auto mt-8 text-justify">{post.description}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, idx) => (
                <div key={idx} className="bg-gray-300 rounded-lg px-3 py-1">
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {/* comments */}
            {comments?.map((cmts) => (
              <Comment key={cmts._id} cmts={cmts} post={post} />
            ))}
          </div>

          {/* Write comments */}
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment..."
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
            />
            <button
              onClick={postComment}
              className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
            >
              Add comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
