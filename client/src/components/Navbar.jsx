import { useState } from "react";
import {
  BsSearch,
  BsFillPersonFill,
  BsFillBellFill,
  BsFillCreditCardFill,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


export default function Navbar() {
  const email = localStorage.getItem("email");
  const avatar = localStorage.getItem("avatar");
  const id = localStorage.getItem("id");
 

  const [ava, setAva] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const handleFile = async (e) => {
  
 
   setAva(e.target.files[0]);
  

 }

 const handleSubmit = async (e) => {
  try {
 
    const formData = new FormData();
    formData.append("avatar", ava);
    console.log(id, 'ini id');
 

    const headers = {
      "Content-Type": "multipart/form-data",
      "access_token": localStorage.getItem("access_token"),
    };

    const response = await axios.put(`http://localhost:3000/upload/${id}`, formData, { headers });

    if (response.status === 200) {
      localStorage.setItem("avatar", response.data.url);
      setAva(response.data.url); 
      Swal.fire({
        width: 200,
        icon: "success",
        text: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      })
    }
    
    
  } catch (err) {
    console.log(err);
    if (err.response) {
      const error = err.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  }
};



  return (
    <div>
      <div className="navbar bg-base-100 px-8 drop-shadow-md">
        <div className="flex-1 gap-2">
          <label className="input-group">
            <span>
              <BsSearch />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="input w-80  bg-[#E5E6E6]"
            />
          </label>
        </div>

        <div className="flex-none gap-5">
          <div>{email}</div>
          <div className={` ${isDropdownOpen ? "dropdown dropdown-end" : ""}`}>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle bg-[#F9F8F9]"
            >
              <div
                onClick={handleDropdownToggle}
                className={`${
                  avatar !== "empty"  ? "w-10 rounded-full" : "w-35 rounded-full"
                }`}
              >
                {avatar !== "empty" ? (
                  <img
                    src={`http://localhost:3000/${avatar}`}
                    alt="ava"
                    className="rounded-full"
                  />
                ) : (
                  <BsFillPersonFill size={20} />
                )}
              </div>
            </label>
            {isDropdownOpen ? (
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-base"
              >
                <li
                  onClick={() => window.my_modal_1.showModal()}
                  className="ml-3 button cursor-pointer my-3"
                >
                  Change Avatar
                </li>
                <li>
                  <Link
                    className=" text-base"
                    onClick={() => {
                      localStorage.removeItem("access_token");
                      localStorage.removeItem("id");
                      localStorage.removeItem("email");
                      localStorage.removeItem("avatar");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
          <div>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle bg-[#F9F8F9] "
            >
              <div className="w-35 rounded-full">
                <BsFillBellFill size={20} />
              </div>
            </label>
          </div>
          <div>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle bg-[#F9F8F9]"
            >
              <div className="w-35 rounded-full">
                <BsFillCreditCardFill size={20} />
              </div>
            </label>
          </div>
        </div>
      </div>

      <dialog
        id="my_modal_1"
        className="modal"
      >
        <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="font-bold text-xl mb-5">Change Avatar</h3>
          <div className="mt-1.5 flex gap-3 ">
      
            <input
              type="file"
              onChange={handleFile}
              className="input input-bordered  "
            />
         
      
            <button type="submit" className="btn bg-[#091929] text-white opacity-75">Upload</button>
            {/* <button className="btn">Close</button> */}
       
          </div>
        </form>
      </dialog>
    </div>
  );
}
