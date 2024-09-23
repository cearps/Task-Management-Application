const Footer = () => {
  return (
    <footer
      className="bg-gray-800 text-white p-4 mt-8 fixed bottom-0 w-full flex items-center"
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
    </footer>
  );
};

export default Footer;
