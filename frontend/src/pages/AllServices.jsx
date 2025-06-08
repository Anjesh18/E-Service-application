import FilterServices from "@/components/shared/FilterServices";
import Navbar from "@/components/shared/Navbar";
import Services from "@/components/shared/Services";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AllServices() {
  const { services } = useSelector((store) => store.service);
  const { user } = useSelector((store) => store.auth);
  console.log(services);
  return (
    <div>
      <Navbar />
      {!user ? (
        <div className="flex items-center">
          <div className=" font-thin text-3xl mx-auto my-11 p-11 self-center">
            Login to view all the posted services!!
            <Link to="/login">
              <span className="text-blue-800 p-4 underline ">Login</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl flex flex-row p-2">
          <div className="w-1/6 p-2">
            <FilterServices />
          </div>
          <div className="w-5/6">
            <div className=" grid grid-cols-3 h-[88vh]">
              {services.map((service) => {
                return <Services key={service._id} service={service} />;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
