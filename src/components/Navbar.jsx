import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Laugh, Search, BookMarked } from 'lucide-react';

const NavLink = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-white/20 text-white'
        : 'text-white/80 hover:bg-white/10 hover:text-white'
    }`}
  >
    <span className="mr-2">{icon}</span>
    {label}
  </Link>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

const MobileNavLink = ({ to, icon, isActive }) => (
  <Link
    to={to}
    className={`flex items-center justify-center p-2 rounded-md transition-all duration-200 ${
      isActive
        ? 'bg-white/20 text-white'
        : 'text-white/80 hover:bg-white/10 hover:text-white'
    }`}
  >
    {icon}
  </Link>
);

MobileNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
};

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg' 
        : 'bg-gradient-to-r from-purple-600/90 to-pink-500/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Laugh className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">JokeTeller</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <NavLink to="/" icon={<Laugh />} label="Home" isActive={location.pathname === '/'} />
              <NavLink to="/search" icon={<Search />} label="Search" isActive={location.pathname === '/search'} />
              <NavLink to="/favorites" icon={<BookMarked />} label="Favorites" isActive={location.pathname === '/favorites'} />
            </div>
          </div>
          <div className="md:hidden flex space-x-4">
            <MobileNavLink to="/" icon={<Laugh />} isActive={location.pathname === '/'} />
            <MobileNavLink to="/search" icon={<Search />} isActive={location.pathname === '/search'} />
            <MobileNavLink to="/favorites" icon={<BookMarked />} isActive={location.pathname === '/favorites'} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;