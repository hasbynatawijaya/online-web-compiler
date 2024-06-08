import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Header from "@/components/Header";
import Routes from "@/routes";

import { useGetUserDetailsQuery, useLogoutMutation } from "@/redux/slices/api";
import { setCurrentUser, setIsLoggedIn } from "@/redux/slices/appSlice";

function App() {
  const dispatch = useDispatch();
  const { data, isError } = useGetUserDetailsQuery();
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
      <Routes />
    </>
  );
}

export default App;
