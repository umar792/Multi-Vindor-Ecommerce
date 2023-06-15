import React, { useState } from "react";
import ProfileSideBar from "./ProfileSideBar";
import ProfileContent from "./ProfileContent.jsx";
import "./Profile.css";

const Profile = () => {
  const [active, setActive] = useState(1);

  return (
    <div>
      <>
        <div className={`profile bg-[#f5f5f5] `}>
          <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
            <ProfileSideBar active={active} setActive={setActive} />
          </div>
          <ProfileContent active={active} />
        </div>
      </>
    </div>
  );
};

export default Profile;
