// eslint-disable-next-line no-unused-vars
import React from "react";
import {
    FluentBuildingHome16Regular,
    HeroiconsOutlineBuildingStorefront,
    HumbleiconsHome
} from "../../icons";

function LandingPageCategories() {
    return (
        <div className="container">
            <div className="px-16 my-2 flex gap-3 pt-3 " >
                <div className="flex flex-col items-center hover:cursor-pointer">
                    <HumbleiconsHome className="text-lg" /><span>Home</span>
                </div>
                <div className="flex flex-col items-center hover:cursor-pointer">
                    <FluentBuildingHome16Regular className="text-lg" /><span>Flat/Apartment</span>
                </div>
                <div className="flex flex-col items-center hover:cursor-pointer">
                    <HeroiconsOutlineBuildingStorefront className="text-lg" /><span>Hotel</span>
                </div>
            </div>
        </div>
    );
}

export default LandingPageCategories;