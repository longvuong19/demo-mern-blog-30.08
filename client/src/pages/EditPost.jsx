import { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const EditPost = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/posts/" + postId);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setFile(res.data.photo);
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const addCategory = () => {
    let updatedCats = [...categories];
    updatedCats.push(category);
    setCategory("");
    setCategories(updatedCats);
  };

  const deleteCategory = (index) => {
    let updatedCats = [...categories];
    updatedCats.splice(index);
    setCategories(updatedCats);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      description,
      username: user.username,
      userId: user._id,
      categories: categories,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("img", fileName);
      data.append("file", file);
      post.photo = fileName;

      // Upload image
      try {
        const imgUpload = await axios.post(URL + "/upload", data);
        // console.log(imgUpload.data);
      } catch (error) {
        console.log(error);
      }
    }

    // update post
    try {
      const res = await axios.put(URL + "/posts/" + postId, post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };
  ``;

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl">Update a Post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            className="px-4 py-2 outline-none"
            placeholder="Enter post title..."
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                type="text"
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <div
                onClick={addCategory}
                className="bg-slate-800 text-white px-4 py-1 font-semibold cursor-pointer"
              >
                Add
              </div>

              {/* Categories */}
              {categories?.map((c, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(index)}
                    className="text-white bg-slate-800 rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Post Content */}
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            name=""
            id=""
            cols={30}
            rows={15}
            className="px-4 py-2 outline-none"
            placeholder="Your post..."
          ></textarea>
          <button
            onClick={handleUpdate}
            className="bg-slate-800 w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
