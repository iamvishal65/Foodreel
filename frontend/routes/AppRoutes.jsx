import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../src/pages/auth/UserRegister';
import ChooseRegister from '../src/pages/auth/ChooseRegister';
import UserLogin from '../src/pages/auth/UserLogin';
import FoodPartnerRegister from '../src/pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../src/pages/auth/FoodPartnerLogin';
import Home from '../src/pages/general/Home';
import Saved from '../src/pages/general/Saved';
import BottomNav from '../src/components/BottomNav';
import CreateFood from '../src/components/food-partner/CreateFood';
import Profile from '../src/components/food-partner/Profile';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<ChooseRegister />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
                <Route path="/" element={<><Home /><BottomNav /></>} />
                <Route path="/saved" element={<><Saved /><BottomNav /></>} />
                <Route path="/create-food" element={<CreateFood />} />
                <Route path="/food-partner/:id" element={<Profile />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes