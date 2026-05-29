import Auth from './components/Auth'
import './App.css';
import Register from './components/register';
import MainPage from './components/mainPage';
import CarAdd from './components/CarAdd'; // Add this import statement at the top of the App.jsx file
import { Route, Routes } from "react-router-dom";
import ReservePage from './components/reservePage';
import Catalog from './components/catalog';
import PageBook from './components/page.book'; // Add this import statement at the top of the App.jsx file
import AdminBookings from './components/page.admin.bid'; // Add this import statement at the top of the App.jsx file
import { Toaster } from 'react-hot-toast';
import AdminPanel from './components/AdminPanel/AdminPanel';
import ProtectedRoute from '../utils/ProtectedRoute';
import CarsUpdate from './components/AdminPanel/CarsUpdate';
import UpdatePageCar from './components/AdminPanel/UpdatePageCar';
import UpdatePageUser from './components/AdminPanel/UpdatePageUser';
import PrivacyPolicy from './components/PrivacyPolicy';
import RulesPage from './components/RulesPage';
import NotFoundPage from './components/NotFoundPage';

function App() {

  

  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Auth />} />
        <Route path='/auth' element={<Register/>} />
        <Route path='/catalog' element={<MainPage/>} />
        <Route path='/CarAdd' element={<ProtectedRoute><CarAdd/></ProtectedRoute>} />
        <Route path='/car/:_id' element={<ProtectedRoute><ReservePage/></ProtectedRoute>} />
        <Route path='/' element={<Catalog/>} />
        <Route path='/booking' element={<PageBook/>} />
        <Route path='/bid' element={<ProtectedRoute><AdminBookings/></ProtectedRoute>} /> {/* Add this route at the end to handle 404 errors */}
        <Route path='/adminPanel' element={<ProtectedRoute><AdminPanel/></ProtectedRoute>} />
        <Route path='/admin/carsCreate' element={<ProtectedRoute><CarAdd/></ProtectedRoute>}/>
        <Route path='/admin/cars' element={<ProtectedRoute><CarsUpdate/></ProtectedRoute>}/>
        <Route path='/admin/updateCar/:_id' element={<ProtectedRoute><UpdatePageCar/></ProtectedRoute>}/>
        
        <Route path='/admin/users' element={<ProtectedRoute><UpdatePageUser/></ProtectedRoute>}/>
        <Route path='/politika' element={<PrivacyPolicy/>}/>
        <Route path='/rules' element={<RulesPage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>

      <Toaster />
    </div>
  )
}

export default App;