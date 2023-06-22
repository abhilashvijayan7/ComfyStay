import { BrowserRouter,Routes,Route } from 'react-router-dom';
import UserRouter from "./Routes/UserRouter"
import AdminRouter from './Routes/AdminRouter';

function App() {

  return (
   <BrowserRouter>
   <Routes>
<Route path='/*' element={<UserRouter/>}/>
<Route path='/admin/*' element={<AdminRouter/>}/>
   </Routes>
   </BrowserRouter>
   
  )
}

export default App
