import UserAPI from "../../api/userAPI";
import { useState, useEffect } from "react";
import { User } from "../../utilities/types";
import { useNavigate } from "react-router-dom";

export default function WelcomeDisplay() {
  return (
    <div>
      <h1>Welcome {user?.userTag}</h1>
    </div>
  );
}
