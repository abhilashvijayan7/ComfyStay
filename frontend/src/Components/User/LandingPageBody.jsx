/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { homePropertylist } from '../../Services/UserApi';
// import { useNavigate } from 'react-router-dom';

// const LandingPageBody = () => {
//   const navigate = useNavigate();
//   const gotoPropertyPage = () => {
//     navigate('/propertyPage');
//   };

//   const [homeProperty, setHomeProperty] = useState(null);

//   useEffect(() => {
//     let isMounted = true;

//     homePropertylist().then((response) => {
//       if (isMounted) {
//         try {
//           if (response.data.status) {
//             setHomeProperty(response.data.approvedlist);
//           } else {
//             toast(response.data.message, {
//               position: toast.POSITION.TOP_CENTER,
//               toastId: 'property-toast',
//             });
//           }
//         } catch (error) {
//           toast.error(error.message, {
//             position: toast.POSITION.TOP_CENTER,
//             toastId: 'property-toast',
//           });
//         }
//       }
//     });

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return (
//     <div className="lg:px-16">
//       <div className="mx-auto">
//         <div className="grid md:grid-cols-2 gap-3 grid-cols-1 lg:grid-cols-4 pt-1 sm:pt-6 pb-5">
//           {homeProperty &&
//             homeProperty.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={gotoPropertyPage}
//                 className="flex justify-center hover:shadow-2xl hover:cursor-pointer"
//               >
//                 <div className="rounded-lg shadow-lg bg-white border border-gray-300 hover:border-gray-500">
//                   <div className="flex justify-center pt-4 px-4 object-cover transform transition-transform hover:scale-105">
//                     <img
//                       className="rounded-lg h-64 w-72 md:h-80 md:w-80"
//                       src={`${import.meta.env.VITE_SERVER_URL}/${item.homephoto}`}
//                       alt=""
//                     />
//                   </div>
//                   <div className="p-6 text-center"> {/* Added text-center class */}
//                   <h5 className="text-gray-900 text-xl font-medium mb-2">{item.address.city},{item.address.state}</h5>
//                     <p className="text-gray-700 text-base mb-4">PIN-{item.address.pincode}</p>
//                     <p>
//                       <span className="font-semibold "></span> ₹{item.homeprice}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPageBody;


/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { homePropertylist } from '../../Services/UserApi';
import { useNavigate } from 'react-router-dom';

const LandingPageBody = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const gotoPropertyPage = () => {
    navigate('/propertyPage');
  };

  const [homeProperty, setHomeProperty] = useState(null);

  useEffect(() => {
    let isMounted = true;

    homePropertylist().then((response) => {
      if (isMounted) {
        try {
          if (response.data.status) {
            setHomeProperty(response.data.approvedlist);
          } else {
            toast(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              toastId: 'property-toast',
            });
          }
        } catch (error) {
          toast.error(error.message, {
            position: toast.POSITION.TOP_CENTER,
            toastId: 'property-toast',
          });
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter the home properties based on the selected category
  const filteredProperties = selectedCategory
    ? homeProperty.filter((item) => item.hometype === selectedCategory)
    : homeProperty;

  return (
    <div className="lg:px-16">
      <div className="mx-auto">
        <div className="grid md:grid-cols-2 gap-3 grid-cols-1 lg:grid-cols-4 pt-1 sm:pt-6 pb-5">
          {filteredProperties &&
            filteredProperties.map((item) => (
              <div
                key={item.id}
                onClick={gotoPropertyPage}
                className="flex justify-center hover:shadow-2xl hover:cursor-pointer"
              >
                <div className="rounded-lg shadow-lg bg-white border border-gray-300 hover:border-gray-500">
                  <div className="flex justify-center pt-4 px-4 object-cover transform transition-transform hover:scale-105">
                    <img
                      className="rounded-lg h-64 w-72 md:h-80 md:w-80"
                      src={`${import.meta.env.VITE_SERVER_URL}/${item.homephoto}`}
                      alt=""
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">{item.address.city},{item.address.state}</h5>
                    <p className="text-gray-700 text-sm font-medium  mb-3">{item.hometype && item.hometype.charAt(0).toUpperCase() + item.hometype.slice(1)}</p>


                    
                    <p className="text-gray-500 text-sm mb-3">Pin-{item.address.pincode}</p>
                    <p>
                      <span className="font-semibold "></span> ₹{item.homeprice}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPageBody;
