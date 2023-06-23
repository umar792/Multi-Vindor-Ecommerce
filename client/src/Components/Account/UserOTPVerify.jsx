import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const UserOTPVerify = () => {
  const navigate = useNavigate();
  const [OTP, setOTP] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/user/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          OTP,
        }),
      });
      setLoading(false);
      const data = await res.json();
      if (res.status === 400 || !data) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Enter OTP
            </h2>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter OTP
                  </label>
                  <div className="mt-1">
                    <input
                      type="OTP"
                      name="phone-OTP"
                      required
                      value={OTP}
                      onChange={(e) => setOTP(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserOTPVerify;
