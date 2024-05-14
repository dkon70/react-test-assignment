import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SearchIco from '../assets/search.svg';
import { SearchBarProps } from '@/types/types';

const SearchBar = (props: SearchBarProps) => {
  const { value, onChange, onKeyDown, onSubmit } = props;
  return (
    <div className="flex w-full max-w-sm items-center space-x-2 m-auto pt-5">
      <Input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <Button type="submit" onClick={onSubmit}>
        <img className="w-full h-full" src={SearchIco} alt="🔍" />
      </Button>
    </div>
  );
};

export default SearchBar;
