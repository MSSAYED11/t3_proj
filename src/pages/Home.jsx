import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import JokeCard from '../components/JokeCard';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { getRandomJoke } from '../services/jokeService';

const Home = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const newJoke = await getRandomJoke();
      setJoke(newJoke);
    } catch (err) {
      setError('Failed to fetch joke. Please try again.');
      console.error('Error fetching joke:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
            Random Joke Generator
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Need a laugh? We've got you covered with random jokes from various categories.
            Click below to get a new joke anytime!
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <Button 
            onClick={fetchJoke} 
            icon={<RefreshCw className="w-5 h-5" />}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get New Joke'}
          </Button>
        </div>

        <div className="joke-container relative">
          {loading ? (
            <div className="flex justify-center p-12">
              <LoadingSpinner size="large" />
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchJoke} variant="primary">Try Again</Button>
            </div>
          ) : (
            joke && <JokeCard joke={joke} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;