import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Layout() {

  return (
    <>
      <div className="flex">
      <Sidebar/>
        <div className="flex flex-col w-full">
          <Navbar />
          <div>
          <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
