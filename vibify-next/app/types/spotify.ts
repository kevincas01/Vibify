
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
  
  export interface TopArtistsResponse {
    items: Artist[];
    total: number;
    limit: number;
    offset: number;
    href: string;
    next: string | null;
    previous: string | null;
  }
  
  // types/spotifyUser.ts

export interface Image {
    height: number;
    url: string;
    width: number;
  }
  
  export interface ExplicitContent {
    filter_enabled: boolean;
    filter_locked: boolean;
  }
  
  export interface ExternalUrls {
    spotify: string;
  }
  
  export interface Followers {
    href: string | null;
    total: number;
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
  
  // types/spotifyAlbum.ts

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
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

// types/spotifyTrack.ts

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

// types/spotifyUserTopTracks.ts

export interface TopTracksResponse {
  items: Track[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string | null;
  previous: string | null;
}
