import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./components/Login/Login"
import { LocalHostLoginProvider } from './components/Login/LocalHostLoginProvider';
import SideNav from "./components/Nav/SideNav";
import Home from "./components/Home/Home";
import User from './components/User/User';

function App() {

  return (
    <>
     {/* <LocalHostLoginProvider>
       <Login/>
     </LocalHostLoginProvider> */}
     <SideNav />
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/usermain" element ={<User/>}/>
      </Routes>
    </>
  )
}

export default App