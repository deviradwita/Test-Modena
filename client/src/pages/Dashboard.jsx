import React, { useState, useEffect } from "react";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import axios from "axios";
import Piechart from "../components/Piechart";
import Barchart from "../components/Barchart";
import Card from "../components/Card";
import LoadingScreen from "../components/LoadingScreen";

export default function Dashboard() {
  const [detailDashboard, setDetailDashboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState([]);
  const month = ["12", "6", "5", "4", "3", "2"];

  useEffect(() => {
  
    const fetchDashboard = async () => {
      const { data } = await axios.get("http://localhost:3000/dashboard", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
    
      setTimeout(() => {
        setLoading(false);
        setDetailDashboard(data.detail);
        setRevenue(data.revenue);
      }, 400);
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
    <LoadingScreen />
    )
}

  return (
    <>
 
      <div className=" my-4 mx-8 ml-6 px-5 py-5  border rounded-md border-slate-400 flex flex-col gap-8 bg-white ">
        <div className=" flex   justify-between border-b-1 border-gray-700 ">
          <div className="flex flex-col">
          
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <h1>These companies have a dashboard</h1>
          </div>
          <div>
            <button className="btn btn-outline btn-success"><MdOutlineDriveFolderUpload size={25}/>Import Data</button>
          </div>
        </div>

          <hr className="border border-gray-300"/>
        <div className="flex gap-3 ">
          {month.map((el, index) => (
            <button key={index} className="border border-slate-400 text-slate-600 p-1 rounded-md min-w-[100px]">
              {el} Months
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-5 mb-5">
          <Card detailDashboard={detailDashboard} />
        </div>
      </div>

      <div className="flex my-4 mx-8 ml-6  py-5 gap-10 ">
        <div className="px-5 py-5  border rounded-md border-slate-400">
            <div className="text-xl font-semibold mb-10">Aging - Account Receivable</div>
          <Barchart />
        </div>

        <div className=" py-5  px-16 border rounded-md border-slate-400">
            <div className="text-xl font-semibold mb-10">Revenue</div>
          <Piechart revenue={revenue}/>
        </div>

        

      </div>
    </>
  );
}
