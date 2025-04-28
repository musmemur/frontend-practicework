import {LandingPage} from "../pages/LandingPage.tsx";
import {Route, Routes} from "react-router";
import {AlbumPage} from "../pages/AlbumPage.tsx";
import {ArtistPage} from "../pages/ArtistPage.tsx";
import {UserPage} from "../pages/UserPage.tsx";
import {SearchPage} from "../pages/SearchPage.tsx";
import './styles/index.css';
import {SignUpPage} from "../pages/SignUpPage.tsx";
import {RegisterPage} from "../pages/RegisterPage.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";

export default function App() {
  return (
    <Routes>
        <Route path="*" element={<LandingPage />}></Route>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/sign-up/register" element={<RegisterPage />}></Route>
        <Route path="/sign-up/login" element={<LoginPage />}></Route>
        <Route path="/album/:artist/:name" element={<AlbumPage />}></Route>
        <Route path="/artist/*" element={<ArtistPage />}></Route>
        <Route path="/user/*" element={<UserPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
    </Routes>
  );
}