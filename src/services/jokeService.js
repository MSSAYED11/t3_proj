const API_URL = 'https://jokeapi-v2.p.rapidapi.com/joke';
const API_KEY = 'da48073ae3mshdef0165ae8ccdcdp10cc1bjsn03e1d1cc685f';

const HEADERS = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com'
};

export const getRandomJoke = async () => {
  try {
    const response = await fetch(`${API_URL}/Any`, {
      method: 'GET',
      headers: HEADERS
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch joke');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching random joke:', error);
    throw error;
  }
};

export const getJokeByCategory = async (category) => {
  try {
    const endpoint = category === 'Any' ? 'Any' : category;
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'GET',
      headers: HEADERS
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${category} joke`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${category} joke:`, error);
    throw error;
  }
};

export const addJokeToFavorites = (joke) => {
  const favorites = getFavoriteJokes();
  
  if (!favorites.some(j => 
    (j.type === 'single' && joke.type === 'single' && j.joke === joke.joke) || 
    (j.type === 'twopart' && joke.type === 'twopart' && j.setup === joke.setup && j.delivery === joke.delivery)
  )) {
    favorites.push(joke);
    localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
  }
};

export const removeJokeFromFavorites = (joke) => {
  let favorites = getFavoriteJokes();
  
  favorites = favorites.filter(j => 
    !(j.type === joke.type && 
      ((j.type === 'single' && j.joke === joke.joke) || 
       (j.type === 'twopart' && j.setup === joke.setup && j.delivery === joke.delivery)))
  );
  
  localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
};

export const getFavoriteJokes = () => {
  const favorites = localStorage.getItem('favoriteJokes');
  return favorites ? JSON.parse(favorites) : [];
};

export const isJokeInFavorites = (joke) => {
  const favorites = getFavoriteJokes();
  
  return favorites.some(j => 
    (j.type === 'single' && joke.type === 'single' && j.joke === joke.joke) || 
    (j.type === 'twopart' && joke.type === 'twopart' && j.setup === joke.setup && j.delivery === joke.delivery)
  );
};