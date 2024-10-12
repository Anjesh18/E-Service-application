import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";


export default function PostService() {
  const [data, setData] = useState({
    service: "",
    location: "",
    price: "",
  });
  const {user}=useSelector(store=>store.auth)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8888/api/service/post",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.data.success == true) {
      console.log("posted successfully");
    }
  };
  return (
    <div>
      <Navbar />
     
      <div className="flex items-center justify-center max-w-7xl mx-auto mt-14">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 items-center border border-gray-400 rounded-lg shadow-xl p-5">
          <h1 className="text-2xl font-bold my-3">Post service</h1>
          <div className="my-4">
            <Label className="text-md py-5">Service</Label>
            <Input
              placeholder="Enter fullname"
              value={data.service}
              onChange={(e) => setData({ ...data, service: e.target.value })}
              type="text"
            />
          </div>
          <div className="my-4">
            <Label className="text-md py-5">Location</Label>
            <Input
              placeholder="Enter email"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              type="text"
            />
          </div>
          <div className="my-4">
            <Label className="text-md py-5">Price</Label>
            <Input
              placeholder="Enter phone number"
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
              type="text"
            />
          </div>

          <div className="my-4">
            <Button className="w-full" type="submit">
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
