import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import SearchBar from './widgets/SearchBar';
import GameCard from './widgets/GameCard';
import { getGames } from './utils/fetchData';
import { GameCardData, ResponseType } from './types/types';
import { Button } from './components/ui/button';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [searchSubmittedValue, setSearchSubmittedValue] = useState('');
  const [dt, setData] = useState<ResponseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const getData = (offset: number, name?: string) => {
    const dataPromise = new Promise((resolve) => {
      resolve(getGames(offset, name));
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
    getData(offset, searchSubmittedValue);
  }, [, searchSubmittedValue, offset]);

  const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const searchSubmitHandler = () => {
    setSearchSubmittedValue(searchValue);
    setOffset(0);
    setLoading(true);
  };

  const searchSubmitByKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchSubmitHandler();
    }
  };

  const nextButtonHandler = () => {
    if (dt[0].result.length === 10) {
      setOffset(offset + 10);
      setLoading(true);
    }
  };

  const prevButtonHandler = () => {
    if (offset) {
      setOffset(offset - 10);
      setLoading(true);
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
