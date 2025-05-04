import {LandingPage} from "../pages/LandingPage";
import {Route, Routes} from "react-router";
import {AlbumPage} from "../pages/AlbumPage";
import {UserPage} from "../pages/UserPage";
import {SearchPage} from "../pages/SearchPage";
import './styles/index.css';
import {SignUpPage} from "../pages/SignUpPage";
import {RegisterPage} from "../pages/RegisterPage";
import {LoginPage} from "../pages/LoginPage";

export default function App() {
  return (
    <Routes>
        <Route path="*" element={<LandingPage />}></Route>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/sign-up/register" element={<RegisterPage />}></Route>
        <Route path="/sign-up/login" element={<LoginPage />}></Route>
        <Route path="/album/:releaseId" element={<AlbumPage />}></Route>
        <Route path="/user/:userId" element={<UserPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
    </Routes>
  );
}