import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import logo from "../assets/icon.png";
import Swal from "sweetalert2";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill, BsFillPersonFill } from "react-icons/bs";
import { FaKey } from "react-icons/fa";

export default function Form({ type }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [submitLogin, setSubmitLogin] = useState({
    email: "",
    password: "",
  });
  const [submitRegister, setSubmitRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    confirmPass: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;

    if (type === "register") {
      setSubmitRegister({
        ...submitRegister,
        [name]: value,
      });
    } else {
      setSubmitLogin({
        ...submitLogin,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "register") {
      if (submitRegister.password !== submitRegister.confirmPass) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Please make sure your password match`,
        });
        return;
      }

      try {
        const name = submitRegister.email.split("@")[0];

        setSubmitRegister((prevState) => ({
          ...prevState,
          name: name,
        }));

        const { data } = await axios.post(
          `http://localhost:3000/register`,
          submitRegister
        );

        Swal.fire({
          width: 200,
          icon: "success",
          text: `Register Successfull`,
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/login");
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          const error = err.response.data.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error}`,
          });
        }
      }
    } else {
      //login function
      try {
        const { data } = await axios.post(
          `http://localhost:3000/login`,
          submitLogin
        );

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("avatar", data.user.avatar);
        localStorage.setItem("id", data.user.id);

        Swal.fire({
          width: 200,
          icon: "success",
          text: `Welcome to B2B Portal`,
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/");
      } catch (err) {
        const error = err.response.data.message;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    }
  };

  return (
    <div className="w-full flex justify-center h-full items-center">
      <div className="form-control w-full max-w-lg text-center ">
        {type === "register" ? (
          <form onSubmit={handleSubmit}>
            <h1 className="text-black text-xl font-bold ">Registration</h1>
            <h1 className="text-left font-semibold text-lime-600 text-xl">
              User Info
            </h1>
            <label className="label">
              <span className="label-text text-black font-semibold">
                Email Account
              </span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              name="email"
              value={submitRegister.email}
              onChange={handleChange}
              className="input input-bordered w-full max-w-lg "
            />

            <label className="label">
              <span className="label-text text-black font-semibold">Phone</span>
            </label>

            <label className="input-group">
              <span>+62</span>
              <input
                type="text"
                name="phone"
                value={submitRegister.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="input input-bordered w-full max-w-lg"
              />
            </label>

            <label className="label">
              <span className="label-text text-black font-semibold">
                Password
              </span>
            </label>
            <label className="input-group">
              <input
                type={`${show ? "text" : "password"}`}
                placeholder="Password"
                name="password"
                value={submitRegister.password}
                onChange={handleChange}
                className="input input-bordered w-full max-w-lg"
              />
              <span onClick={() => setShow(!show)} className="cursor-pointer">
                {show ? <BsFillEyeSlashFill /> : <IoEyeSharp />}
              </span>
            </label>

            <label className="label">
              <span className="label-text text-black font-semibold">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              name="confirmPass"
              value={submitRegister.confirmPass}
              onChange={handleChange}
              className="input  input-bordered w-full max-w-lg "
            />

            <div className="flex flex-col gap-5 mt-14">
              <button type="submit" className="btn btn-success">
                Continue
              </button>
              <Link
                to="/login"
                type="button"
                className="btn btn-outline btn-success"
              >
                Back
              </Link>
            </div>
          </form>
        ) : (
          // Render login form for other types
          <form onSubmit={handleSubmit}>
            <div className="flex   gap-3 py-6 items-center">
              <img src={logo} alt="icon" />
              <h1 className="text-2xl font-bold ">B2B Portal</h1>
            </div>
            <h1 className="text-left font-bold text-4xl mb-8">
              Login to your Account
            </h1>

            <div className="mb-5">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  Email Account
                </span>
              </label>

              <label className="input-group">
                <span>
                  <BsFillPersonFill />
                </span>
                <input
                  type="text"
                  name="email"
                  value={submitLogin.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="input input-bordered w-full max-w-lg"
                />
              </label>
            </div>

            <div className="mb-5">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  Password
                </span>
              </label>
              <label className="input-group">
                <span>
                  <FaKey />
                </span>
                <input
                  type={`${show ? "text" : "password"}`}
                  placeholder="Password"
                  name="password"
                  value={submitLogin.password}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-lg"
                />
                <span onClick={() => setShow(!show)} className="cursor-pointer">
                  {show ? <BsFillEyeSlashFill /> : <IoEyeSharp />}
                </span>
              </label>
            </div>

            <div className="flex justify-between">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-success"
                  />{" "}
                  <span className="label-text">Remember me?</span>
                </label>
              </div>
              <div className="text-green-600">Forgot Password?</div>
            </div>

            <div className="flex flex-col gap-5 mt-14">
              <button type="submit" className="btn btn-success">
                Login
              </button>
            </div>

            <div className="flex justify-start mt-8">
              <span>
                Doesnt have an account?{" "}
                <Link to="/register" style={{ color: "green" }}>
                  Get Started
                </Link>
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
