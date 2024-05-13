import { ChangeEvent, KeyboardEvent, useState } from "react";
import SearchBar from "./widgets/SearchBar";

function App() {
  const [searchValue, setSearchValue] = useState('');

  const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }

  const searchSubmitHandler = () => {
    console.log(searchValue);
  }

  const searchSubmitByKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log(searchValue);
    }
  }

  return (
    <main className="w-[100vw] h-[100vh]">
      <SearchBar value={searchValue} onChange={searchChangeHandler} onKeyDown={searchSubmitByKeyHandler} onSubmit={searchSubmitHandler} />
    </main>
  );
}

export default App;
