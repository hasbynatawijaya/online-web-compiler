import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/slices/store";
import { Code2, Globe2 } from "lucide-react";

import { useLogoutMutation } from "@/redux/slices/api";
import { setCurrentUser, setIsLoggedIn } from "@/redux/slices/appSlice";
import { handleError } from "@/utils/handleError";
import { setIsOwner } from "../redux/slices/compilerSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const isLoggedIn = useSelector(
    (state: RootState) => state.appSlice.isLoggedIn
  );

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setIsLoggedIn(false));
      dispatch(setCurrentUser(undefined));
      dispatch(setIsOwner(false));
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <Link to="/">
        <h2 className="font-bold select-none">Compiler</h2>
      </Link>
      <ul className="flex gap-2">
        <li>
          <Link to="/compiler">
            <Button variant="outline">Editor</Button>
          </Link>
        </li>
        <li>
          <Link to="/all-codes">
            <Button container="withIcon">
              <Globe2 size={16} />
              All codes
            </Button>
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/my-codes">
                <Button container="withIcon">
                  <Code2 size={16} />
                  My codes
                </Button>
              </Link>
            </li>
            <li>
              <Button
                variant="destructive"
                isLoading={isLoading}
                disabled={isLoading}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <Button variant="success">Login</Button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <Button variant="blue">Sign Up</Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Header;
