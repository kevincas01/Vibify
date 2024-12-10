export interface TimeRangeProps {
  text: string;
  value: string;
}
export interface LimitProps {
  value: number;
}

export const timeRangeElements: TimeRangeProps[] = [
  {
    text: "All time",
    value: "long_term",
  },
  {
    text: "Last 6 Months",
    value: "medium_term",
  },
  {
    text: "Last 4 weeks",
    value: "short_term",
  },
];
export const limitElements: LimitProps[] = [
  {
    value: 3,
  },
  {
    value: 5,
  },
  {
    value: 10,
  },
  {
    value: 20,
  },
  {
    value: 50,
  },
];

export const defaultArtistLimit = 10;
export const defaultArtistTimeRange = "short_term";

export const defaultTrackLimit = 10;
export const defaultTrackTimeRange = "short_term";

export const recommendationsFeedSelections: { value: string; text: string }[] =
  [
    { value: "followed", text: "Followed Recommendations" },
    { value: "all", text: "All Recommendations" },
  ];
export const defaultFeedType = "all";
export const recommentTypeElements: { value: string; text: string }[] = [
  { value: "track", text: "Tracks" },
  { value: "artist", text: "Artist" },
  { value: "album", text: "Album" },
  { value: "playlist", text: "Playlist" },
];
