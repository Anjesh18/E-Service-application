import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSingleService } from "@/redux/ServiceSlice";

export default function ConfirmSendRequest() {
  const { id } = useParams();
  const serviceId = id;
  const navigate = useNavigate();
  const { services } = useSelector((store) => store.service);
  const { user } = useSelector((store) => store.auth);
  const userId = user?._id;

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/api/applications/apply/${serviceId} `,
        { withCredentials: true }
      );
      if (response.data.success == true) {
        toast(response.data.message);
        navigate("/allServices");
      } else {
        toast("Oops some error occured!!");
      }
    } catch (error) {
      toast(error.message);
    }
  };
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchApplication = async () => {
  //     const response = await axios.get(
  //       `http://localhost:8888/api/service/getService/${serviceId}`,
  //       { withCredentials: true }
  //     );
  //     if (response.data.success == true) {
  //       console.log(response.data.getServiceById)
  //       dispatch(setSingleService(response.data.getServiceById));
  //     }
  //   };
  //   fetchApplication();
  // }, [serviceId, dispatch, user?.userId]);
  return (
    <div className="flex max-w-5xl mx-auto my-[200px] rounded-2xl justify-center p-6 items-center border border-gray-600">
      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold gap-3 text-[#6753c4] my-3">
          Are you sure to send a request to for this service?
          <p className="p-3"> The provider will be able to contact you.</p>
        </h1>
        <div className="max-w-4xl my-5 flex flex-row justify-between">
          <Button
            className="w-[40%] bg-red-800 hover:bg-red-700"
            onClick={() => handleSubmit()}
          >
            Yes
          </Button>
          <Button
            className="w-[40%] bg-green-800 hover:bg-green-700"
            onClick={() => navigate("/allServices")}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
