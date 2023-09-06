import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";

const PostDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            Armored Core 6: Fire Of Rubicon
          </h1>
          <div className="flex items-center justify-center space-x-4 text-2xl cursor-pointer">
            <p>
              <BiEdit />
            </p>
            <p>
              <MdDelete />
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@longvuong</p>
          <div className="flex space-x-2 text-sm">
            <p>09/01/2023</p>
            <p>17:00</p>
          </div>
        </div>
        <img
          src="https://e1.pxfuel.com/desktop-wallpaper/340/855/desktop-wallpaper-6-armored-core-core.jpg"
          alt=""
          className="w-full mx-auto mt-8"
        />
        <p className="mx-auto mt-8 text-justify">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            <div className="bg-gray-200 rounded-lg px-3 py-1 ">Game</div>
            <div className="bg-gray-200 rounded-lg px-3 py-1 ">Technology</div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          {/* comments */}
          <Comment />
          <Comment />
          <Comment />
        </div>

        {/* Write comments */}
        <div className="w-full flex flex-col mt-4 md:flex-row">
          <input
            type="text"
            placeholder="Write a comment..."
            className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
          />
          <button className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">
            Add comment
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;
