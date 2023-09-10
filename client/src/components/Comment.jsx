import axios from "axios";
import React, { useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Comment = ({ cmts, post }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + `/comments/${id}`, {
        withCredentials: true,
      });
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{cmts.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>{new Date(cmts.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(cmts.updatedAt).toString().slice(16, 24)}</p>
          {user?._id === cmts?.userId ? (
            <div className="flex items-center justify-center space-x-2 cursor-pointer">
              <p
                onClick={() => deleteComment(cmts._id)}
                className="cursor-pointer"
              >
                <MdDelete />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="px-4 mt-2">{cmts.comment}</p>
    </div>
  );
};

export default Comment;
