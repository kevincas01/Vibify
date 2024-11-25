
// Get Profile data off of access token

export async function getProfile(accessToken:string) {

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  return data
}



export async function getUserTopWType(accessToken:string, type:string, limit:number) {

  const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?limit=${limit}`, {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  return data
}

