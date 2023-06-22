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
            <div className="my-2 flex gap-3">
                <div className="flex flex-col items-center hover:cursor-pointer">
                    <HumbleiconsHome className="text-2xl" /><span>Home</span>
                </div>
                <div className="flex flex-col items-center hover:cursor-pointer">
                    <FluentBuildingHome16Regular className="text-2xl" /><span>Flat/Apartment</span>
                </div>
                <div className="flex flex-col items-center hover:cursor-pointer">
                    <HeroiconsOutlineBuildingStorefront className="text-2xl" /><span>Hotel</span>
                </div>
            </div>
        </div>
    );
}

export default LandingPageCategories;