export const getGames = async (
  offset: number,
  name?: string,
  platform?: string,
  rating?: boolean,
  ruText?: boolean,
  ruVoice?: boolean
) => {
  if (!name) name = '';
  if (!platform || platform === 'Any') platform = '';
  const data = await fetch('/api/multiquery', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': import.meta.env.VITE_CLIENT_ID,
      Authorization: `Bearer ${import.meta.env.VITE_BEARER}`,
    },
    body: `query games "Get game by id" {
      fields name, platforms.name, cover.url, language_supports.language.name, language_supports.language_support_type.name, rating, release_dates.date, screenshots.url, storyline, genres.name;
      limit 10;
      ${rating ? 'sort rating desc;' : ''}
      offset ${offset};
      where platforms.name ~ "${platform}"${platform ? '' : '*'} & name ~ "${name}"* ${ruText ? '& language_supports.language.name = "Russian"*' : ''} ${ruVoice ? '& language_supports.language.name = "Russian"* & language_supports.language_support_type.name = "Audio"' : ''};
    };`,
  });
  const res = await data.json();
  return res;
};
