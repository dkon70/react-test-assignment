import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import SearchBar from './widgets/SearchBar';
import GameCard from './widgets/GameCard';
import { getGames } from './utils/fetchData';
import { GameCardData, ResponseType } from './types/types';
import { Button } from './components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import FilterMenu from './widgets/FilterMenu';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [searchSubmittedValue, setSearchSubmittedValue] = useState('');
  const [dt, setData] = useState<ResponseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const [platformChecked, setPlatformChecked] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('Any');
  const [rating, setRating] = useState(true);
  const [multiplayer, setMultiplayer] = useState(false);
  const [online, setOnline] = useState(false);
  const [ru, setRu] = useState(false);
  const [ru_voice, setRu_voice] = useState(false);

  const filterDto = {
    platform: {
      platformChecked: platformChecked,
      selectedPlatform: selectedPlatform,
      setSelectedPlatform: setSelectedPlatform,
      setPlatformChecked: setPlatformChecked,
    },
    rating: {
      rating: rating,
      setRating: setRating,
    },
    multiplayer: {
      multiplayer: multiplayer,
      online: online,
      setMultiplayer: setMultiplayer,
      setOnline: setOnline,
    },
    ru: {
      text: ru,
      voice: ru_voice,
      setText: setRu,
      setVoice: setRu_voice,
    },
  };

  const getData = (
    offset: number,
    name?: string,
    platform?: string,
    rating?: boolean,
    ruText?: boolean,
    ru_voice?: boolean
  ) => {
    const dataPromise = new Promise((resolve) => {
      resolve(getGames(offset, name, platform, rating, ruText, ru_voice));
    });
    dataPromise
      .then((data) => {
        setData(data as ResponseType[]);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getData(
      offset,
      searchSubmittedValue,
      selectedPlatform,
      rating,
      ru,
      ru_voice
    );
  }, [, searchSubmittedValue, offset, selectedPlatform, rating, ru, ru_voice]);

  const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const searchSubmitHandler = () => {
    setSearchSubmittedValue(searchValue);
    setOffset(0);
  };

  const searchSubmitByKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchSubmitHandler();
    }
  };

  const nextButtonHandler = () => {
    if (dt[0].result.length === 10) {
      setOffset(offset + 10);
    }
  };

  const prevButtonHandler = () => {
    if (offset) {
      setOffset(offset - 10);
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
      <div className="m-auto flex justify-end mt-3 w-[700px]">
        <Popover>
          <PopoverTrigger>
            <p className="font-bold">Filter</p>
          </PopoverTrigger>
          <PopoverContent className="w-[350px]">
            <FilterMenu data={filterDto} />
          </PopoverContent>
        </Popover>
      </div>
      {!loading ? (
        dt[0].result.map((elem, index) => (
          <GameCard key={index} data={elem as GameCardData} />
        ))
      ) : (
        <h1 className="text-center pt-10 text-xl">Loading...</h1>
      )}
      {!loading ? (
        <div className="flex m-auto justify-center gap-96 mb-16 mt-8">
          <Button
            disabled={!offset}
            onClick={prevButtonHandler}
            className={offset === 0 ? 'cursor-not-allowed' : ''}
          >
            Prev
          </Button>
          <Button
            disabled={dt[0].result.length < 10 ? true : false}
            onClick={nextButtonHandler}
            className={dt[0].result.length < 10 ? 'cursor-not-allowed' : ''}
          >
            Next
          </Button>
        </div>
      ) : (
        ''
      )}
    </main>
  );
}

export default App;
