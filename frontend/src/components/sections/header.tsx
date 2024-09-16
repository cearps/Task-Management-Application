import { Link, useNavigate } from "react-router-dom";
import UserAPI from "../../api/userAPI";
import { useEffect, useState } from "react";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const subscription = UserAPI.isAuthenticatedObservable().subscribe(
      (isAuthenticated) => {
        setIsAuthenticated(isAuthenticated);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    UserAPI.logout();
    navigate("/accounts/login");
  };

  return (
    <header className="bg-blue-500 text-white p-4 fixed top-0 left-0 right-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Kanban App</Link>
        </div>
        <nav className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/boards" className="hover:underline">
                Boards
              </Link>
              <button onClick={logout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/accounts/signup" className="hover:underline">
                Signup
              </Link>
              <Link to="/accounts/login" className="hover:underline">
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
