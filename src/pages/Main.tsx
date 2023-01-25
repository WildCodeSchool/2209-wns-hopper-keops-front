import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { me } from "../graphql/me";
import Dashboard from "./Dashboard";
import Signin from "./Signin";
import Signup from "./Signup";

interface IUser {
  email: string;
  id: string;
}

function Main() {
  const [user, setUser] = useState<null | IUser | undefined>(undefined);

  // Verify if ther is a token + if token is with user
  const { data, refetch } = useQuery(me, { fetchPolicy: "network-only" });

  // Verify the connexion and set User state
  useEffect(() => {
    console.log("Got data:", data);
    if (data) {
      if (data.me) {
        setUser(data.me);
      } else {
        setUser(null);
      }
    }
  }, [data]);

  // receive token from a component and save it in localstorage and re exec user request 'me'
  const onTokenChange = (token?: string) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    setUser(undefined);
    // re exec me user request
    refetch();
  };

  return (
    <>
      {user ? (
        <Dashboard user={user} onTokenChange={onTokenChange} />
      ) : user === null ? (
        <>
          <Signup />
          <Signin onTokenChange={onTokenChange} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Main;
