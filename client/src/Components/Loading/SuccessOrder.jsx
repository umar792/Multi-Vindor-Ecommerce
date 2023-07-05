import React from "react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../lodingSVG/success.json";

const SuccessOrder = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80svh",
      }}
    >
      <Lottie
        animationData={groovyWalkAnimation}
        loop={true}
        style={{ width: "200px", height: "200px" }}
      />
    </div>
  );
};

export default SuccessOrder;
