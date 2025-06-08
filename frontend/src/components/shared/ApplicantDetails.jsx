import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { setApprovedApplicants } from "@/redux/ApplicantSlice";
import { useParams } from "react-router-dom";

export default function ApplicantDetails() {
  const { applicants } = useSelector((store) => store.applicant);
  const { approvedApplicants } = useSelector((store) => store.applicant);
  const dispatch = useDispatch();
  const [approved, setApproved] = useState(false);

  const states = ["Accept", "Reject"];
  const { id } = useParams();
  //   const [inputStatus,setInputStatus]=useState('')
   const updateStatus = async (status, id) => {
    const response = await axios.post(
      `http://localhost:8888/api/applications/applicant/updateStatus/${id}`,
      { status },
      { withCredentials: true }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      console.log("updated successfully");
      /*dispatch(setApprovedApplicants(response.data.loggedinUser));*/
    }
  };
  useEffect(() => {
    const getStatus = async () => {
      const response = await axios.get(
        `http://localhost:8888/api/applications/applicant/getApprovedApplicants/${id}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        console.log(response.data.applications);
        dispatch(setApprovedApplicants(response.data.applications));
      } else {
        console.log("error");
      }
    };
    getStatus();
  },[updateStatus,id]);
 
  return (
    <div className=" ">
      {approvedApplicants?.map((item) => (
        <div
          key={item._id}
          className="flex flex-col  mx-auto max-w-4xl p-8 m-5  shadow-2xl rounded-2xl"
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-7">
              <h1 className="text-2xl font-bold">
                {" "}
                {item?.applicant?.fullname}
              </h1>
              <h3>Phone number: {item?.applicant?.phoneNumber}</h3>
              <h3>Email: {item?.applicant?.email}</h3>
            </div>
            <div className="w-[100px] h-[100px]">
              <img
                src={item?.applicant?.profilePhoto}
                className="rounded-full"
              />
            </div>
          </div>
          <div className=" px-[60px] pt-8">
            {item.status == "Accept" ? (
              <div>
                <Button className="bg-green-700" disabled>
                  Request Accepted
                </Button>
              </div>
            ) : item.status == "Reject" ? (
              <div>
                <Button className="bg-red-700" disabled>
                  Request Declined
                </Button>
              </div>
            ) : (
              <div className="flex justify-between">
                {states.map((state, idx) => {
                  return (
                    <Button
                      key={idx}
                      onClick={() => updateStatus(state, item?._id)}
                    >
                      {state}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
