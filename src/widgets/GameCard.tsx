import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import NoImage from '../assets/noimage.jpg';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import LanguageTable from './LanguagesTable';
import { GameCardProps } from '@/types/types';
import { useState } from 'react';

const GameCard = (props: GameCardProps) => {
  const { data } = props;
  const [showFullText, setShowFullText] = useState(false);

  const multiplayerMods: string[] = [];
  let maxOnlinePlayers: string = '';
  let maxOfflinePlayers: string = '';

  data.game_modes &&
    data.game_modes.forEach((el) => {
      if (el.name !== 'Single player') {
        multiplayerMods.push(el.name);
      }
    });

  data.multiplayer_modes &&
    data.multiplayer_modes.forEach((el) => {
      if (el.onlinemax) {
        maxOnlinePlayers = el.onlinemax;
      }
      if (el.offlinemax) {
        maxOfflinePlayers = el.offlinemax;
      }
    });

  if (data.cover) {
    data.cover.url = data.cover.url.replace('t_thumb', 't_cover_big');
  }
  if (data.screenshots) {
    data.screenshots.map((screenshot) => {
      screenshot.url = screenshot.url.replace('t_thumb', 't_screenshot_big');
    });
  }

  const textToggleHandler = () => {
    setShowFullText(!showFullText);
  };

  const getReleaseYear = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    return year.toString();
  };

  return (
    <div className="w-[700px] m-auto pt-5">
      <Card className="flex flex-col">
        <div className="relative w-[100%]">
          <div className="flex">
            <img
              className="rounded-tl-md"
              src={(data.cover && data.cover.url) || NoImage}
            />
            {data.rating && (
              <Badge className="absolute top-5 left-5 z-10">
                {Math.round(data.rating / 10)}/10
              </Badge>
            )}
            {data.screenshots && (
              <Carousel className="m-auto">
                <CarouselContent className="w-[320px] h-[300px]">
                  {data.screenshots.map((item, index) => (
                    <CarouselItem key={index} className="cursor-pointer">
                      <img
                        className="w-[320px] h-[300px] object-cover"
                        src={item.url}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
          </div>
        </div>

        <div>
          <CardHeader>
            <CardTitle>{data.name && data.name}</CardTitle>
            <CardDescription>
              {data.genres &&
                data.genres.map((item, index) =>
                  index !== data.genres.length - 1
                    ? item.name + ' - '
                    : item.name
                )}
              <br />
              {data.release_dates && (
                <span>{getReleaseYear(data.release_dates[0].date)}</span>
              )}
              <br />
              <span>
                Multiplayer: {multiplayerMods.length > 0 ? 'Yes' : 'No'}{' '}
                {maxOfflinePlayers ? ` max-players: ${maxOfflinePlayers}` : ''}
              </span>
              <br />
              <span>
                Online:{' '}
                {maxOnlinePlayers
                  ? `Yes. max-players: ${maxOnlinePlayers}`
                  : 'No / No data'}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-xs">
              {data.platforms &&
                data.platforms.map((item, index) =>
                  index !== data.platforms.length - 1
                    ? item.name + ' / '
                    : item.name
                )}
            </p>
            <br />
            <p className={!showFullText ? `line-clamp-5` : ''}>
              {data.storyline && data.storyline}
            </p>
            {data.storyline && data.storyline.length > 450 ? (
              <span
                className="font-bold text-xs cursor-pointer underline"
                onClick={textToggleHandler}
              >
                {showFullText ? 'Hide' : 'Show more'}
              </span>
            ) : (
              ''
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Available languages</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                {!data.language_supports ? (
                  <p className="text-center">No data</p>
                ) : (
                  <LanguageTable data={data.language_supports} />
                )}
              </PopoverContent>
            </Popover>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default GameCard;
