export interface Story {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
  kids?: number[];
}

export interface Comment {
  id: number;
  text: string;
  by: string;
  time: number;
  kids?: number[];
  deleted?: boolean;
  dead?: boolean;
}