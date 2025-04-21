import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Heart, Frown } from 'lucide-react';
import { addJokeToFavorites, removeJokeFromFavorites, isJokeInFavorites } from '../services/jokeService';

const JokeCard = ({ joke, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);

  useEffect(() => {
    setIsFavorite(isJokeInFavorites(joke));
    setShowDelivery(false);
    
    if (joke.type === 'twopart') {
      const timer = setTimeout(() => {
        setShowDelivery(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [joke]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeJokeFromFavorites(joke);
    } else {
      addJokeToFavorites(joke);
    }
    
    setIsFavorite(!isFavorite);
    if (onFavoriteToggle) onFavoriteToggle();
  };

  if (!joke) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-auto">
        <div className="flex flex-col items-center text-gray-500">
          <Frown className="w-12 h-12 mb-4" />
          <p className="text-lg">No joke available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full mx-auto transition-all duration-300 hover:shadow-2xl">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-3 px-6">
        <div className="flex justify-between items-center">
          <span className="text-white font-medium capitalize">
            {joke.category}
          </span>
          <button
            onClick={handleFavoriteToggle}
            className={`transition-all duration-300 transform hover:scale-110 ${
              isFavorite ? 'text-red-400' : 'text-white/70 hover:text-white'
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {joke.type === 'single' ? (
          <p className="text-gray-800 text-lg leading-relaxed">{joke.joke}</p>
        ) : (
          <div className="space-y-6">
            <div className="joke-setup">
              <p className="text-gray-800 text-lg font-medium leading-relaxed">{joke.setup}</p>
            </div>
            
            {showDelivery ? (
              <div className="joke-delivery animate-fade-in">
                <p className="text-gray-800 text-lg italic leading-relaxed">{joke.delivery}</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="dot-typing"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

JokeCard.propTypes = {
  joke: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.oneOf(['single', 'twopart']),
    joke: PropTypes.string,
    setup: PropTypes.string,
    delivery: PropTypes.string,
    category: PropTypes.string,
    flags: PropTypes.object,
    safe: PropTypes.bool,
    lang: PropTypes.string,
  }),
  onFavoriteToggle: PropTypes.func,
};

export default JokeCard;