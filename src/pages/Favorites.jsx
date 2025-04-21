import { useState, useEffect } from 'react';
import { BookMarked, Trash2, RefreshCw } from 'lucide-react';
import JokeCard from '../components/JokeCard';
import Button from '../components/Button';
import { getFavoriteJokes, removeJokeFromFavorites } from '../services/jokeService';

const Favorites = () => {
  const [favoriteJokes, setFavoriteJokes] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadFavoriteJokes();
  }, [refreshKey]);

  const loadFavoriteJokes = () => {
    const jokes = getFavoriteJokes();
    setFavoriteJokes(jokes);
  };

  const handleRemove = (joke) => {
    removeJokeFromFavorites(joke);
    setRefreshKey(prev => prev + 1);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorite jokes?')) {
      localStorage.removeItem('favoriteJokes');
      setRefreshKey(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
            Your Favorite Jokes
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            All your saved jokes in one place. Come back anytime for a quick laugh!
          </p>
        </div>

        {favoriteJokes.length > 0 && (
          <div className="flex justify-end mb-6">
            <Button 
              onClick={handleClearAll} 
              variant="outline" 
              icon={<Trash2 className="w-4 h-4" />}
            >
              Clear All
            </Button>
          </div>
        )}

        <div className="space-y-8">
          {favoriteJokes.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-8 text-center max-w-md mx-auto">
              <BookMarked className="w-12 h-12 mx-auto text-purple-400/50 mb-4" />
              <p className="text-gray-600 mb-6">
                You haven't saved any jokes yet. Browse jokes and click the heart icon to add them to your favorites!
              </p>
              <Button 
                onClick={() => window.location.href = '/'} 
                variant="primary"
                icon={<RefreshCw className="w-5 h-5" />}
              >
                Find Some Jokes
              </Button>
            </div>
          ) : (
            favoriteJokes.map((joke, index) => (
              <div key={index} className="relative">
                <div className="mb-2 flex justify-end">
                  <button
                    onClick={() => handleRemove(joke)}
                    className="text-gray-500 hover:text-red-500 focus:outline-none transition-colors duration-200"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <JokeCard 
                  joke={joke} 
                  onFavoriteToggle={() => setRefreshKey(prev => prev + 1)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;