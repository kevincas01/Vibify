export interface User{
    id:number;
    created_at:Date;
    email:string;
    name?:string;
    spotify_id:string;
    image_url:string;
}