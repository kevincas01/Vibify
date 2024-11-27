const getHashParams = (): { [key: string]: string } => {
  const hashParams: { [key: string]: string } = {}; // Explicit type
  let e: RegExpExecArray | null;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);

  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }

  return hashParams;
};

const EXPIRATION_TIME = 3600 * 1000;
const setTokenTimestamp = () =>
  window.localStorage.setItem("spotify_token_timestamp", Date.now().toString());
const setLocalAccessToken = (token: string) => {
  if (token == "undefined") return;
  setTokenTimestamp();
  window.localStorage.setItem("spotify_access_token", token);
};
const setLocalRefreshToken = (token: string) =>
  window.localStorage.setItem("spotify_refresh_token", token);
const getTokenTimestamp = (): number => {
  const timestamp = window.localStorage.getItem("spotify_token_timestamp");

  if (!timestamp) {
    return Date.now(); 
  }
  const parsedTimestamp = Number(timestamp); 

  return parsedTimestamp; 
};

const getLocalAccessToken = () =>
  window.localStorage.getItem("spotify_access_token");
const getLocalRefreshToken = () =>
  window.localStorage.getItem("spotify_refresh_token");

const refreshAccessToken = async () => {
  try {
    const response = await fetch(`/api/spotify/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: getLocalRefreshToken() }),
    });
    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    // Parse the response as JSON
    const { access_token } = await response.json();
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  let refreshToken:string|null=refresh_token;
  if(!refresh_token){
    refreshToken=getLocalRefreshToken()
  }
  // If token has expired
  const token_timestamp=getTokenTimestamp()
  if (
    Date.now() - token_timestamp > EXPIRATION_TIME &&
    refresh_token != null
  ) {
    console.warn("Access token has expired, refreshing...");
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if ((!localAccessToken || localAccessToken === "undefined") && access_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    return access_token;
  }

  return localAccessToken;
};
