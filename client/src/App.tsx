import { Route, Routes } from "react-router-dom";

import Header from "@/components/Header";
import Home from "@/pages/Home";
import Compiler from "@/pages/Compiler";
import NotFound from "@/pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
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
