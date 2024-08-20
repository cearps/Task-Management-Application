import UserAPI from "../../api/userAPI";
import { useState, useEffect } from "react";
import { User } from "../../utilities/types";
import { useNavigate } from "react-router-dom";
import ButtonSmall from "../buttons/button-small";

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
    <>
      {user && (
        <div className="text-center ">
          <h1 className="text-3xl font-bold mb-4">Welcome {user.userTag}</h1>
          <p className="text-lg">ID: {user.id}</p>
          <p className="text-lg">Email: {user.email}</p>
          <hr className="my-8" />
          <ButtonSmall onClick={() => navigate("/boards")} type="button">
            Go to Boards
          </ButtonSmall>
        </div>
      )}
    </>
  );
}
