import logo from "../assets/icon.png";
import { FaHome } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { AiFillShop, AiFillSetting } from "react-icons/ai";




export default function Sidebar() {
  return (
    <div className="bg-[#091929] w-96 ">
        <div className="h-screen">
        <div className="flex flex-col  items-start pl-5  text-slate-400">
        <div className="flex   gap-3 py-6 items-center">
          <img src={logo} alt="icon"  />
          <h1 className="text-xl font-semibold text-slate-400">B2B Portal</h1>
        </div>
        <div className="flex gap-5  ">
          <h1 className="font-semibold text-lg">Menu</h1>
        </div>
      

       
      </div>

      <div className="flex flex-col pl-2  items-start text-slate-400">
        <div className="flex gap-3 pl-4 items-center py-4 ">
          <FaHome size={15} color="gray" />
          <h1 className="font-semibold text-base">Home</h1>
        </div>

        <div className="flex gap-3 pl-4 items-center py-4 ">
          <BsPeopleFill size={15} color="gray" />
          <h1 className="font-semibold text-base">Vendor/Supplier</h1>
        </div>

        <div className="flex gap-3 pl-4 items-center py-4 ">
          <AiFillShop size={15} color="gray" />
          <h1 className="font-semibold text-base">Customer/Dealer</h1>
        </div>

        <div className="flex gap-3 pl-4 items-center py-4 ">
          <AiFillSetting size={15} color="gray" />
          <h1 className="font-semibold text-base">Configuration Settings</h1>
        </div>
      </div>
        </div>
      
    </div>
  );
}
