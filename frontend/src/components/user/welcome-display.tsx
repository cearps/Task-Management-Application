import UserAPI from "../../api/userAPI";
import { useState, useEffect } from "react";
import { User } from "../../utilities/types";
import { useNavigate } from "react-router-dom";

export default function WelcomeDisplay() {
  const [user, setUser] = useState(null as User | null);

  const navigate = useNavigate();

  useEffect(() => {
    const subscription = UserAPI.getUserObservable().subscribe({
      next: (response) => {
        setUser(response);
      },
      error: (error) => {
        // redirect to sign up page
        navigate("/accounts/signup");
        console.error("Error fetching user:", error);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Welcome {user?.userTag}</h1>
    </div>
  );
}
