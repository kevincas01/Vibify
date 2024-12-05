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
