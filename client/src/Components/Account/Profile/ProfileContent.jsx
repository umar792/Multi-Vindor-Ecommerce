import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { UseUserContext } from "../../../ContextAoi/Context/UserContext";
import { RxHamburgerMenu } from "react-icons/rx";

const ProfileContent = ({ active, setShowProfile, showProfiletoggle }) => {
  const { user } = UseUserContext();
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  console.log(showProfiletoggle);
  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <RxHamburgerMenu
              className="burger"
              onClick={() => setShowProfile(true)}
            />
            <div className="relative">
              <img
                src={`http://localhost:4000/${user.avatar}`}
                className="w-[100px] h-[100px] rounded-full object-cover border-[3px] border-[#3ad132] z-[-1]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`!w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={` !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={` !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && <div>"AllOrders "</div>}

      {/* Refund */}
      {active === 3 && <div>"AllRefundOrders"</div>}

      {/* Track order */}
      {active === 5 && <div>"TrackOrder "</div>}

      {/* Change Password */}
      {active === 6 && <div>"ChangePassword "</div>}

      {/*  user Address */}
      {active === 7 && <div>"Address "</div>}
    </div>
  );
};

export default ProfileContent;
