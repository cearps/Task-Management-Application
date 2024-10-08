const Footer = () => {
  const handleExitTutorial = () => {
    localStorage.setItem("firstLogin", "false");
    window.location.reload();
  };
  return (
    <footer
      className="bg-gray-800 text-white p-4 mt-8 fixed bottom-0 w-full flex items-center shadow-md"
      style={{ height: "8vh" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">© 2024 Kanban App. All rights reserved.</p>
        {/* <nav className="space-x-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </nav> */}
      </div>
      {localStorage.getItem("firstLogin") === "true" && (
        <div className="flex items-center">
          <p className="text-sm mr-2">Currently in tutorial mode</p>
          <button
            className="text-sm text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
            onClick={handleExitTutorial}
          >
            Exit Tutorial
          </button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
