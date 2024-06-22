import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Kanban App</Link>
        </div>
        <nav className="space-x-4">
          <Link to="/accounts/signup" className="hover:underline">
            Signup
          </Link>
          <Link to="/accounts/login" className="hover:underline">
            Login
          </Link>
          <Link to="/boards" className="hover:underline">
            Boards
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
