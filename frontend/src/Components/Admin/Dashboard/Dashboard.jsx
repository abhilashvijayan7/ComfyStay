/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function Dashboard({ total }) {

    return (
        <>
            <section className="text-gray-600   body-font flex flex-row items-center justify-center  ">

                {[
                    {
                        heading: "Toal Bookings",
                        value: total?.totalBookings,
                        background: "bg-[#000000]",

                    },
                    {
                        heading: "Toal Revenue",
                        value: total?.totalRevenue || 0,
                        background: "bg-[#000000]",
                    },

                    {
                        heading: "Toal Users",
                        value: total?.totalUsers,
                        background: "bg-[#000000]",

                    },
                ].map((data, i) => {
                    return (
                        <div key={data.heading} className="p-14 md:w-1/4 w-full">
                            <div
                                className={`border-2 hover:shadow-xl  ${data.background} border-gray-200 py-6  rounded-lg`}
                            >
                                <p className="leading-relaxed font-bold text-lg text-white text-center">
                                    {data.heading}
                                </p>
                                <p className={`font-semibold text-center ${i === 1 ? "text-green-500" : "text-cyan-400"}`}>
                                    {i === 1 ? `₹${data.value * 0.3}` : data.value}
                                </p>
                            </div>
                        </div>
                    );
                })}

            </section>
        </>
    );
}

export default Dashboard;