import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Header from "@/components/Header";
import Home from "@/pages/Home";
import Compiler from "@/pages/Compiler";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { useGetUserDetailsQuery, useLogoutMutation } from "@/redux/slices/api";
import { setCurrentUser, setIsLoggedIn } from "./redux/slices/appSlice";

function App() {
  const dispatch = useDispatch();
  const { data, isError, isSuccess } = useGetUserDetailsQuery();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (data) {
      dispatch(setCurrentUser(data));
      dispatch(setIsLoggedIn(true));
    } else if (isError) {
      logout();
      dispatch(setIsLoggedIn(false));
      dispatch(setCurrentUser(undefined));
    }
  }, [data, isError]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/compiler/:id" element={<Compiler />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
