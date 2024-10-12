import React from "react";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center my-16">
      <div>
        <h1 className="text-4xl text-[#6848c2]">
          Find and post the services as{" "}
          <div className="my-6 text-red-600">
            <span>per your requirements and skills. </span>
          </div>
        </h1>
      </div>
      <div className="flex w-[40%] gap-3 border border-gray-200 shadow-lg rounded-full items-center mx-auto my-10">
        <input
          type="text"
          placeholder="Search for services"
          className="p-4 rounded-full outline-none border-none w-full"
        />
      </div>
    </div>
  );
}
