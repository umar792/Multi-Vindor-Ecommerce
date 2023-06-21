import React, { useState } from "react";
import ProfileSideBar from "./ProfileSideBar";
import ProfileContent from "./ProfileContent.jsx";
import "./Profile.css";

const Profile = ({ showProfiletoggle, setShowProfile }) => {
  const [active, setActive] = useState(1);

  return (
    <div>
      <>
        <div className={`profile bg-[#f5f5f5] `}>
          <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0">
            <ProfileSideBar
              active={active}
              setActive={setActive}
              showProfiletoggle={showProfiletoggle}
              setShowProfile={setShowProfile}
            />
          </div>
          <div className="profilecontent">
            <ProfileContent
              active={active}
              showProfiletoggle={showProfiletoggle}
              setShowProfile={setShowProfile}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default Profile;
