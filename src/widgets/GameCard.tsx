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

type GameCardProps = {
  data: {
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
};

const GameCard = (props: GameCardProps) => {
  const { data } = props;

  if (data.cover) {
    data.cover.url = data.cover.url.replace('t_thumb', 't_cover_big');
  }
  if (data.screenshots) {
    data.screenshots.map((screenshot) => {
      screenshot.url = screenshot.url.replace('t_thumb', 't_screenshot_big');
    });
  }

  const getReleaseYear = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    return year.toString();
  };

  console.log(data);
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
            <p>{data.storyline && data.storyline}</p>
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
