import { ChangeEvent, KeyboardEvent } from 'react';

export type GameCardData = {
  id: number;
  name: string;
  cover: { url: string };
  genres: { name: string }[];
  platforms: { name: string }[];
  release_dates: { date: number }[];
  screenshots: { url: string }[];
  storyline: string;
  rating: number;
  language_supports: {
    language: { name: string };
    language_support_type: { name: string };
  }[];
};

export type GameCardProps = {
  data: GameCardData;
};

export type ResponseType = {
  result: GameCardData[];
};

export type LanguageTableProps = {
  data: {
    language: {
      name: string;
    };
    language_support_type: {
      name: string;
    };
  }[];
};

export type LanguagesType = {
  language: string;
  types: {
    audio: boolean;
    subtitles: boolean;
    interface: boolean;
  };
};

export type SearchBarProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};
