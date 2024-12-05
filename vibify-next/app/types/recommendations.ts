import { Album, Artist, Playlist, Track } from "./spotify";
import { User } from "./users";

export enum RecommendationType{
    "artist"="artist",
    "track"="track",
    "album"="album",
    "playlist"="playlist"

}

export interface Recommendations {
    id:number;
    created_at:Date;
    recommended_item:Artist | Track | Album| Playlist ;
    recommendation_type:RecommendationType;
    spotify_id:string;
    user_spotify_id:string;
    text:string;
    users?: User;
}
