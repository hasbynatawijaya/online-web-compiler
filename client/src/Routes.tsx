import { Suspense, lazy } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import Loader from "@/components/Loader";

const Home = lazy(() => import("@/pages/Home"));
const Compiler = lazy(() => import("@/pages/Compiler"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));

const Routes = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[calc(100dvh-60px)] flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <RouterRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/compiler/:id" element={<Compiler />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </Suspense>
  );
};
export default Routes;
