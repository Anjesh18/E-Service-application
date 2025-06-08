import ServiceProviderCard from "@/components/shared/ServiceProviderCard";

import { setServicesForSingleProvider } from "@/redux/ServiceSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { servicesForSingleProvider } = useSelector((store) => store.service);
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8888/api/service/getServiceForUser",
          { withCredentials: true }
        );
        if ((response.data.success = true)) {
          console.log(response.data.services);
          dispatch(setServicesForSingleProvider(response.data.services));
        }
      } catch (error) {}
    };
    fetchService();
    console.log(servicesForSingleProvider);
    console.log("");
  }, []);

  return (
    <div className="max-w-6xl items-start mx-auto px-9 py-2 my-4">
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-sm  my-3">User ID: {user?.userId}</p>
          <h1 className="text-2xl font-bold my-3">
            Full name: {user?.fullname}
          </h1>
          <p className="text-xl font-semibold my-3">
            Phone number: {user?.phoneNumber}
          </p>
          <p className="text-xl font-semibold my-3">Email: {user?.email}</p>
        </div>
        <div className="max-w-[120px] h-[100px]">
          <img src={user?.profilePhoto} />
        </div>
      </div>
      <hr className="my-5" />
      <h1 className="text-3xl text-red-600 font-extrabold">
        {" "}
        Services posted by you:
      </h1>
      <div className="w-4xl">
        {servicesForSingleProvider.length < 1 ? (
          <p className="text-2xl">You have not posted any services yet!</p>
        ) : (
          <div>
            {" "}
            {servicesForSingleProvider?.map((item, idx) => (
              <ServiceProviderCard key={idx} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
