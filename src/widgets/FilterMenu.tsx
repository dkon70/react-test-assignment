import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FilterMenuProps } from '@/types/types';

const FilterMenu = (props: FilterMenuProps) => {
  const { data } = props;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="rating"
          defaultChecked={true}
          checked={data.rating.rating}
          onCheckedChange={(checked) => data.rating.setRating(Boolean(checked))}
        />
        <label
          htmlFor="rating"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Sort by rating
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <p>Platform: </p>
        <Select
          onValueChange={(value) => data.platform.setSelectedPlatform(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={data.platform.selectedPlatform} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="PC (Microsoft Windows)">PC</SelectItem>
              <SelectItem value="Playstation">Playstation</SelectItem>
              <SelectItem value="Playstation 2">Playstation 2</SelectItem>
              <SelectItem value="Playstation 3">Playstation 3</SelectItem>
              <SelectItem value="Playstation 4">Playstation 4</SelectItem>
              <SelectItem value="Playstation 5">Playstation 5</SelectItem>
              <SelectItem value="Xbox">Xbox</SelectItem>
              <SelectItem value="Xbox 360">Xbox 360</SelectItem>
              <SelectItem value="Xbox One">Xbox One</SelectItem>
              <SelectItem value="Xbox Series X|S">Xbox Series X|S</SelectItem>
              <SelectItem value="Nintendo Switch">Nintendo Switch</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="multiplayer"
          defaultChecked={false}
          checked={data.multiplayer.multiplayer}
          onCheckedChange={(checked) =>
            data.multiplayer.setMultiplayer(Boolean(checked))
          }
        />
        <label
          htmlFor="multiplayer"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Multiplayer
        </label>
        <Input
          className="w-[50px]"
          value={data.multiplayer.maxOfflinePlayers}
          onChange={(event) =>
            data.multiplayer.setMaxOfflinePlayers(Number(event.target.value))
          }
        />
        <span>Players</span>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="online"
          defaultChecked={false}
          checked={data.multiplayer.online}
          onCheckedChange={(checked) =>
            data.multiplayer.setOnline(Boolean(checked))
          }
        />
        <label
          htmlFor="online"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Online
        </label>
        <Input
          className="w-[50px]"
          value={data.multiplayer.maxOnlinePlayers}
          onChange={(event) =>
            data.multiplayer.setMaxOnlinePlayers(Number(event.target.value))
          }
        />
        <span>players</span>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="russian"
          defaultChecked={false}
          checked={data.ru.text}
          onCheckedChange={(checked) => data.ru.setText(Boolean(checked))}
        />
        <label
          htmlFor="russian"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          На русском языке
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="russian_voice"
          defaultChecked={false}
          checked={data.ru.voice}
          onCheckedChange={(checked) => data.ru.setVoice(Boolean(checked))}
        />
        <label
          htmlFor="russian_voice"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          С русской озвучкой
        </label>
      </div>
    </div>
  );
};

export default FilterMenu;
