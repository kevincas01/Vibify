
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
  