/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Dashboard from "../../Components/Admin/Dashboard/Dashboard";
import PIeChart from "../../components/Admin/Dashboard/PIeChart";
import BarChart from "../../components/Admin/Dashboard/BarChart";
import { useState } from "react";
import { fetchDashboardDetails } from "../../Services/AdminApi";

function DashboardPage() {
    const [dashboard, setDashboard] = useState({
        revenueDetails: [],
        bookingDetails: [],
        total: {
            totalRevenue: 0,
            totalCompletedBookings: 0,
            totalUsers: 0,
        },
    });
    useEffect(() => {
        fetchDashboardDetails().then(({ data }) => {
            console.log(data);
            setDashboard({ revenueDetails: data.revenueDetails, bookingDetails: data.bookingDetails, total: data.total });
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    return (


        <div className="w-full   ">
            <div className="py-4  w-full bg-[#0e0e0e]">
                <header>
                    <div className="flex items-center justify-center sm:justify-start">
                        <p className="text-white px-4 sm:px-12 text-xl sm:text-2xl font-serif">
                            Dashboard
                        </p>
                    </div>
                </header>
            </div>
            

                <Dashboard
                    total={dashboard.total}
                    dashboard={dashboard}
                    setDashboard={setDashboard}
                />
                <div className="flex flex-col items-center ">
                <div className=" w-11/12 my-8  mx-5">
                    <div className="mx-1 flex  my-4">
                        {/* <AddExpert fetchExperts={fetchExperts} setfetchExperts={setfetchExperts}/> */}
                    </div>
                    <div className="flex  gap-4  flex-col md:flex-row justify-between">
                        <div className="w-full">
                            <h1 className=" mx-2 text-xl my-1">Revenue Details</h1>
                            <div className=" py-2 h-[400px]  w-4/5 md:w-full border-[1px] flex flex-col  gap-2 items-center border-slate-300">
                                <BarChart revenueDetails={dashboard.revenueDetails} />
                            </div>
                        </div>
                        <div className="w-full">
                            <h1 className="mx-2 text-xl my-1">Booking Details</h1>
                            <div className="py-2 h-[400px] w-4/5 md:w-full border-[1px] flex flex-col gap-2 items-center border-slate-300">
                                <PIeChart bookingDetails={dashboard.bookingDetails} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default DashboardPage;