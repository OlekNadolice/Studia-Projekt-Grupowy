import { useContext } from "react";
import { LoginContext } from "Context/Context";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "Components/Navbar";
import Loading from "Components/Loading";
 
const Login = lazy(() => import("Pages/Login"));
const Register = lazy(() => import("Pages/Register"));
const Home = lazy(() => import("Pages/Home"));
const PostPage = lazy(() => import("Pages/PostPage"));
const NotFound = lazy(() => import("Pages/NotFound"));
 
const RoutesDefinition = () => {
  const { isLoggedIn } = useContext(LoginContext);
 
  return (
<BrowserRouter>
<Suspense fallback={<Loading />}>
<Navbar />
<Routes>
<Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
<Route path="/register" element={<Register />} />
<Route path="/post:id" element={<PostPage />} />
<Route path="/" element={<Home />} />
<Route path="*" element={<NotFound />} />
</Routes>
</Suspense>
</BrowserRouter>
  );
};
 
export default RoutesDefinition;
