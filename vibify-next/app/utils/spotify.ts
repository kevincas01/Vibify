// Get Profile data off of access token

import { PLAYBACKNOTACTIVESTATUS } from "../types/errors";
import {
  Album,
  Artist,
  PlaybackStateResponse,
  Playlist,
  PlaylistResponse,
  PlaylistsResponse,
  SpotifySearchResponse,
  Track,
} from "../types/spotify";

export async function getSpotifyUserProfile(accessToken: string) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const data = await response.json();
  return data;
}

export async function getUserTopWType(
  accessToken: string,
  type: string,
  range: string,
  limit: number
) {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/${type}?time_range=${range}&limit=${limit}`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  const data = await response.json();
  return data;
}

// PLAYLIST REQUESTS

export async function fetchNextPageOfItems(
  accessToken: string,
  nextUrl: string | null,
  accumulatedItems: Playlist[] = [] // Accumulate results across recursive calls
) {
  // Base case: If no next URL, return accumulated items
  if (!nextUrl) {
    return accumulatedItems;
  }

  // Fetch the current page of playlists
  const response = await fetch(nextUrl, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const data = await response.json();

  const updatedItems = [...accumulatedItems, ...data.items];

  // If there is a next page, recursively call the function to get more items
  if (data.next) {
    return fetchNextPageOfItems(accessToken, data.next, updatedItems);
  }

  // Return the accumulated items once there's no more next URL
  return updatedItems;
}

export async function getPlaylistById(
  accessToken: string,
  id: string
): Promise<PlaylistResponse> {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const data = await response.json();
  return data;
}

export async function getCurrentUserPlaylists(
  accessToken: string
): Promise<PlaylistsResponse> {
  const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const data = await response.json();
  return data;
}

export async function getUserPlaylists(accessToken: string, userId: string) {
  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  const data = await response.json();
  return data;
}
export async function getPlaylistsItems(
  accessToken: string,
  playlistId: string
) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  const data = await response.json();
  return data;
}

export async function fetchNextPlaylistItems(accessToken: string, url: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const data = await response.json();
  return data;
}

export async function getSearchResultWType(
  accessToken: string,
  type: string,
  input: string,
  limit: number = 20
): Promise<SpotifySearchResponse> {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${input}&type=${type}&limit=${limit}`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  const data = await response.json();
  return data;
}

// Player Requests

export async function getPlaybackState(accessToken: string) {
  const response = await fetch(`https://api.spotify.com/v1/me/player `, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });

  if (response.status == PLAYBACKNOTACTIVESTATUS) {
    return null;
  }

  const data = await response.json();
  return data;
}
export async function getAvailableDevices(accessToken: string) {
  const response = await fetch(
    `https://api.spotify.com/v1/me/player/devices `,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error starting playback: ${errorData.error.message}`);
  }

  const data = await response.json();
  return data;
}

export async function startResumeTrackPlayback(
  accessToken: string,
  contextUri?: string,
  uris?: string[],
  deviceId?: string
) {
  const body: any = {};
  if (contextUri) {
    body.context_uri = contextUri;
  }

  // Only include uris if they're provided
  if (uris) {
    body.uris = uris;
  }
  body.transfer_playback = true;
  const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error starting playback: ${errorData.error.message}`);
  }
}

export async function pausePlayback(accessToken: string, deviceId?: string) {
  const body: any = {};

  const response = await fetch(`https://api.spotify.com/v1/me/player/pause`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error starting playback: ${errorData.error.message}`);
  }
}

export async function skipNextPlayback(accessToken: string, deviceId?: string) {
  const body: any = {};

  const response = await fetch(`https://api.spotify.com/v1/me/player/next`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error starting playback: ${errorData.error.message}`);
  }
}
export async function skipPreviousPlayback(
  accessToken: string,
  deviceId?: string
) {
  const body: any = {};

  const response = await fetch(
    `https://api.spotify.com/v1/me/player/previous`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error starting playback: ${errorData.error.message}`);
  }
}
