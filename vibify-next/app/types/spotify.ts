// Common Spotify types
export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: string | null;
  total: number;
}

interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

interface User {
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  type: "user";
  uri: string;
}

export interface SpotifyUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: ExplicitContent;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_playable: boolean;
  name: string;
  release_date: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner?: {
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

// API RESPONSE TYPES

export interface TopArtistsResponse {
  items: Artist[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string | null;
  previous: string | null;
}

export interface TopTracksResponse {
  items: Track[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string | null;
  previous: string | null;
}

export interface SpotifySearchResponse {
  tracks?: TypeResponse;
  albums?: TypeResponse;
  artists?: TypeResponse;
  playlists?: TypeResponse;
  // Add other possible search types here, if needed (e.g., playlists, shows, etc.)
}

export interface TypeResponse {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Track[] | Artist[] | Album[] | Playlist[];
}

export interface PlaylistsResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Playlist[];
}

export interface PlaylistItemsResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: PlaylistItem[];
}

export interface PlaylistItem {
  added_at: string;
  added_by: User;
  is_local: boolean;
  track: Track;
}

export interface PlaybackStateResponse {
  device: Device;
  repeat_state: string;
  shuffle_state: boolean;
  context: Context;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: Track;
  currently_playing_type: string;
  actions: PlaybackActions;
}

export interface Device {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: "computer" | "tablet" | "smartphone" | "speaker" | "tv" | "stereo" | "unknown"; // You can extend this type with more device types
  volume_percent: number;
  supports_volume: boolean;
}

export interface Context {
  type: string;
  href: string;
  external_urls: {
    spotify: string;
  };
  uri: string;
}


export interface PlaybackActions {
  interrupting_playback: boolean;
  pausing: boolean;
  resuming: boolean;
  seeking: boolean;
  skipping_next: boolean;
  skipping_prev: boolean;
  toggling_repeat_context: boolean;
  toggling_shuffle: boolean;
  toggling_repeat_track: boolean;
  transferring_playback: boolean;
}
