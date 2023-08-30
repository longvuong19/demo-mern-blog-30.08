import React from "react";

const HomePosts = () => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src="https://e1.pxfuel.com/desktop-wallpaper/340/855/desktop-wallpaper-6-armored-core-core.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          Test Blog Title
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@longvuong</p>
          <div className="flex space-x-2 text-sm">
            <p>09/01/2023</p>
            <p>17:00</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">Description</p>
      </div>
    </div>
  );
};

export default HomePosts;
