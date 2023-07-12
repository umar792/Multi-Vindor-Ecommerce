import React from "react";

const ShopChats = () => {
  return (
    <div className="w-[97%] bg-white m-5 h-[75vh] overflow-y-scroll rounded">
      <>
        <h1 className="text-center text-[30px] py-3 font-bold">All Messages</h1>
        {/* -------------------- list  */}
        <MessagesList />
      </>
    </div>
  );
};

export default ShopChats;

// -----------------------messages list

const MessagesList = () => {
  return (
    <>
      <div className={`w-full flex p-3 px-3  "bg-[#00000010]"`}>
        <div className="relative">
          <img
            src={`https://res.cloudinary.com/dvgvcifrd/image/upload/v1687677485/Inventory/mr7datakxm46gzecehks.png`}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />

          <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
        </div>
        <div className="pl-3">
          <h1 className="text-[18px]">Muhmmad Umar</h1>
          <p className="text-[16px] text-[#000c]">You : Hello how are you?</p>
        </div>
      </div>
    </>
  );
};
