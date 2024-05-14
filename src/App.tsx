import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import SearchBar from './widgets/SearchBar';
import GameCard from './widgets/GameCard';
import { getGames } from './utils/fetchData';

type GameCardProps = {
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

type ResponseType = {
  result: GameCardProps[];
};

function App() {
  // const [bearer, setBearer] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [dt, setData] = useState<ResponseType[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getBearer = async () => {
  //     const data = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_SECRET}&grant_type=client_credentials`, {
  //       method: "POST"
  //     });
  //     const res = await data.json();
  //     setBearer(res['access_token']);
  //   }
  //   getBearer();
  // }, []);

  // const fetchData = async () => {
  //   const data = await fetch('/api/multiquery', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Client-ID': import.meta.env.VITE_CLIENT_ID,
  //       Authorization: `Bearer ${import.meta.env.VITE_BEARER}`,
  //     },
  //     body: `query games "Get game by id" {
  //       fields name, platforms.name, cover.url, game_localizations, rating, release_dates.date, screenshots.url, storyline, genres.name;
  //       where id = 730;
  //     };`
  //   });
  //   const res = await data.json();
  //   setData(res);
  //   setLoading(false);
  // };

  useEffect(() => {
    // fetchData();
    const promise = new Promise((resolve) => {
      resolve(getGames());
    });
    promise
      .then((data) => {
        setData(data as ResponseType[]);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   console.log(dt);
  // }, [dt]);

  const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const searchSubmitHandler = () => {
    console.log(searchValue);
  };

  const searchSubmitByKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log(searchValue);
    }
  };

  return (
    <main>
      <SearchBar
        value={searchValue}
        onChange={searchChangeHandler}
        onKeyDown={searchSubmitByKeyHandler}
        onSubmit={searchSubmitHandler}
      />
      {!loading ? (
        // <GameCard data={dt[0].result[0] as GameCardProps} />
        dt[0].result.map((elem, index) => (
          <GameCard key={index} data={elem as GameCardProps} />
        ))
      ) : (
        <h1 className="text-center pt-10 text-xl">Loading...</h1>
      )}
    </main>
  );
}

export default App;
