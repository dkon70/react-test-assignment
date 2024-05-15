export const getGames = async (
  offset: number,
  name?: string,
  platform?: string,
  rating?: boolean,
  ruText?: boolean,
  ruVoice?: boolean,
  maxOfflinePlayers?: number,
  maxOnlinePlayers?: number
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
      fields name, platforms.name, cover.url, language_supports.language.name, language_supports.language_support_type.name, rating, release_dates.date, screenshots.url, storyline, genres.name, multiplayer_modes.offlinemax, multiplayer_modes.onlinemax, game_modes.name;
      limit 10;
      ${rating ? 'sort rating desc;' : ''}
      offset ${offset};
      where ${maxOfflinePlayers ? `multiplayer_modes.offlinemax = ${maxOfflinePlayers} &` : ''} ${maxOnlinePlayers ? `multiplayer_modes.onlinemax = ${maxOnlinePlayers} &` : ''} platforms.name ~ "${platform}"${platform ? '' : '*'} & name ~ "${name}"* ${ruText ? '& language_supports.language.name = "Russian"*' : ''} ${ruVoice ? '& language_supports.language.name = "Russian"* & language_supports.language_support_type.name = "Audio"' : ''};
    };
    `,
  });
  const res = await data.json();
  return res;
};
