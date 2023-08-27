import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'

import Login from './pages/Login/Login';
import ForgotPassword from './pages/Login/ForgotPassword';
import ResetNewPassword from './pages/Login/ResetNewPassword';

import Information from './pages/Personal_Information/Information';

import Dashboard from './pages/Dashboard/Dashboard';

import Device from './pages/Device/Device';
import AddDevice from './pages/Device/AddDevice';
import UpdateDevice from './pages/Device/UpdateDevice';
import DetailDevice from './pages/Device/DetailDevice';

import Service from './pages/Service/Service';
import AddService from './pages/Service/AddService';
import DetailService from './pages/Service/DetailService';
import UpdateService from './pages/Service/UpdateService';

import GiveNumber from './pages/GiveNumber/GiveNumber';
import GiveNewNumber from './pages/GiveNumber/GiveNewNumber';
import DetailGiveNumber from './pages/GiveNumber/DetailGiveNumber';

import Report from './pages/Report/Report';

import ManaRole from './pages/Settings_System/ManageRole/ManaRole';
import AddRole from './pages/Settings_System/ManageRole/AddRole';
import UpdateRole from './pages/Settings_System/ManageRole/UpdateRole';

import UserLog from './pages/Settings_System/UserLog/UserLog';
import ManaAccount from './pages/Settings_System/ManageAccount/ManaAccount';
import AddAccount from './pages/Settings_System/ManageAccount/AddAccount';
import UpdateAccount from './pages/Settings_System/ManageAccount/UpdateAccount';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* login */}
       <Route path="/login" element={<Login/>}/>
       <Route path="/forgot" element={<ForgotPassword/>}/>
       <Route path="/reset" element={<ResetNewPassword/>}/>

       {/* personal information */}
       <Route path="/information" element={<Information/>}/>

       {/* dasboard */}
       <Route path='/dashboard' element={<Dashboard/>}/>

       {/* device */}
       <Route path='/device' element={<Device/>}/>
       <Route path='/device/addDevice' element={<AddDevice/>}/>
       <Route path='/device/updateDevice/:key' element={<UpdateDevice/>}/>
       <Route path='/device/detailDevice/:key' element={<DetailDevice/>}/>

       {/* service */}
       <Route path='/service' element={<Service/>}/>
       <Route path='/service/addService' element={<AddService/>}/>
       <Route path='/service/detailService/:key' element={<DetailService/>}/>
       <Route path='/service/updateService/:key' element={<UpdateService/>}/>

       {/* giveNumber */}
       <Route path='/giveNumber' element={<GiveNumber/>}/>
       <Route path='/giveNumber/giveNewNumber' element={<GiveNewNumber/>}/>
       <Route path='/giveNumber/detailGiveNumber/:key' element={<DetailGiveNumber/>}/>

       {/* report */}
       <Route path='/report' element={<Report/>}/>

       {/* manage role */}
       <Route path='/manaRole' element={<ManaRole/>}/>
       <Route path='/manaRole/addRole' element={<AddRole/>}/>
       <Route path='/manaRole/updateRole/:key' element={<UpdateRole/>}/>

       {/* manage account */}
       <Route path='/manaAccount' element={<ManaAccount/>}/>
       <Route path='/manaAccount/addAccount' element={<AddAccount/>}/>
       <Route path='/manaAccount/updateAccount/:key' element={<UpdateAccount/>}/>

       {/* user log */}
       <Route path='/userLog' element={<UserLog/>}/>
      </Routes>
    </div>
  );
}

export default App;
