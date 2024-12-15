import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkUserExistence } from "../services/api";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function UserCheck() {
  const { username } = useParams();
  const [isExistingUser, setIsExistingUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const exists = await checkUserExistence(username);
      // console.log(exists);
      setIsExistingUser(exists);
    }
    fetchUser();
  }, [username]);

  return (
    <div>
      <h1>Welcome, {username}</h1>
      {isExistingUser === null ? (
        <p>Loading...</p>
      ) : isExistingUser ? (
        <LoginForm username={username} />
      ) : (
        <RegisterForm username={username} />
      )}
    </div>
  );
}

export default UserCheck;