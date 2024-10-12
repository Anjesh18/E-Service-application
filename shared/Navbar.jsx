import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogOut, User2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const {user}=useSelector(store=>store.auth)
  return (
    <div className="">
      <div className="max-w-8xl items-center bg-gray-50 rounded-xl px-4 py-2 shadow-sm my-3">
        <div className="flex justify-between px-4 mx-auto">
          <div className="text-5xl italic font-extrabold text-[#dd3838] ">
            E-serve
          </div>
          <div className="">
            <ul className="flex space-x-11 items-center gap-11 p-4">
              <Link to='/'><li className="text-2xl font-bold space-x-6">Home</li></Link>
              <li className="text-2xl font-bold space-x-6">Services</li>
              <Link to='/postService'><li className="text-2xl font-bold space-x-6">Post</li></Link>
            </ul>
          </div>
          {!user ? (
            <div>
              <ul className="flex items-center gap-11 p-4">
                <Button className="hover:bg-[#886eb8] bg-[#57249b]">
                  <Link to="/login">Login</Link>
                </Button>
                <Button><Link to='/register'>Register</Link></Button>
              </ul>
            </div>
          ) : (
            <div >
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar>
                    <AvatarImage
                    className='mt-2'
                      src={user?.profilePhoto}
                      alt="profile pic"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-48 flex flex-col my-4 py-2 px-2">
                    <div className="flex-col px-2 gap-4">
                        <p className='flex my-3 flex-row'><User2/>View profile</p>
                        <p className='flex flex-row my-3'><LogOut/>Logout</p>
                    </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
