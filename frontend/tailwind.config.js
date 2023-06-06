/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/*/.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
// module.exports = {

//   plugins: [
//       require('flowbite/plugin')
//   ],
//   content: [
//     // ...
//     'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
// ]



// }