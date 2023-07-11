/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React from 'react'
// // import UserHome from '../../Components/User/Home'
// import LandingPageBody from "../../Components/User/LandingPageBody";
// import PropertyCategories from "../../Components/User/LandingPageCategories";
// import UserFooter from "../../Components/User/UserFooter";
// import UserHeader from "../../Components/User/UserHeader";

// function UserHomePage() {
//   return (
//     <div>
//            <UserHeader />
//             <PropertyCategories />
//             <LandingPageBody />
//             <UserFooter />

//     </div>
//   )
// }

// export default UserHomePage



import React, { useState } from 'react';
import LandingPageBody from '../../Components/User/LandingPageBody';
import LandingPageCategories from '../../Components/User/LandingPageCategories';
import UserFooter from '../../Components/User/UserFooter';
import UserHeader from '../../Components/User/UserHeader';

function UserHomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <UserHeader />
      <LandingPageCategories onCategorySelect={handleCategorySelect} />
      <LandingPageBody selectedCategory={selectedCategory} />
      <UserFooter />
    </div>
  );
}

export default UserHomePage;
