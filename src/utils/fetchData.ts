export const getGames = async () => {
  const data = await fetch('/api/multiquery', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': import.meta.env.VITE_CLIENT_ID,
      Authorization: `Bearer ${import.meta.env.VITE_BEARER}`,
    },
    body: `query games "Get game by id" {
      fields name, platforms.name, cover.url, language_supports.language.name, language_supports.language_support_type.name, rating, release_dates.date, screenshots.url, storyline, genres.name;
      limit 500;
      where id = 730;
    };`,
  });
  const res = await data.json();
  return res;
};
