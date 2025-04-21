import { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import JokeCard from '../components/JokeCard';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { getJokeByCategory } from '../services/jokeService';

const categories = ['Any', 'Programming', 'Dark', 'Pun'];

const Search = () => {
  const [selectedCategory, setSelectedCategory] = useState('Any');
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJokeByCategory = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const newJoke = await getJokeByCategory(selectedCategory);
      setJoke(newJoke);
    } catch (err) {
      setError(`Failed to fetch ${selectedCategory.toLowerCase()} joke. Please try again.`);
      console.error('Error fetching joke by category:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (joke === null) return;
    fetchJokeByCategory();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
            Search Jokes by Category
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Select a category and discover jokes that match your humor preference.
          </p>
        </div>

        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Select Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md shadow-sm bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <Button 
              onClick={fetchJokeByCategory} 
              icon={<SearchIcon className="w-5 h-5" />}
              fullWidth
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search Jokes'}
            </Button>
          </div>
        </div>

        <div className="joke-container relative">
          {loading ? (
            <div className="flex justify-center p-12">
              <LoadingSpinner size="large" />
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchJokeByCategory} variant="primary">Try Again</Button>
            </div>
          ) : joke ? (
            <JokeCard joke={joke} />
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-8 text-center max-w-md mx-auto">
              <p className="text-gray-600 mb-4">
                Select a category and click "Search Jokes" to find your next laugh!
              </p>
              <SearchIcon className="w-12 h-12 mx-auto text-purple-400/50" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;