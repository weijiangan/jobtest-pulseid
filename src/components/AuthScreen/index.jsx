import React, { useEffect } from "react";
import config from "../../../config";

const redirectUri = "";
const authUrl = `https://api.unsplash.com/oauth/?client_id=${config.clientId}&redirect_uri=${redirectUri}&response_type=code&scope=public`;

function AuthScreen(props) {
  useEffect(() => {}, []);

  return (
    <div>
      <a href={authUrl}>Authorize</a>
    </div>
  );
}

export default AuthScreen;
