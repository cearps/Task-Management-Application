import Base from "../components/sections/base";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../api/userAPI";
// import WelcomeDisplay from "../components/user/welcome-display";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const subscription = UserAPI.getUserObservable().subscribe({
      next: () => {
        navigate("/boards");
      },
      error: (error) => {
        // clear token
        localStorage.removeItem("token");
        // redirect to sign up page
        navigate("/accounts/signup");
        console.error("Error fetching user:", error);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
  return (
    <Base pageTitle="Home">
      <>
        {/* <h1>Home</h1>
        <WelcomeDisplay /> */}
      </>
    </Base>
  );
}
