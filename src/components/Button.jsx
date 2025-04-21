import PropTypes from 'prop-types';

const Button = ({
  onClick,
  children,
  icon,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  className = '',
}) => {
  const baseStyles = "flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 focus:ring-purple-500",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400",
    outline: "bg-transparent border-2 border-purple-500 text-purple-600 hover:bg-purple-50 focus:ring-purple-400"
  };
  
  const sizeStyles = fullWidth ? "w-full" : "";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles} ${disabledStyles} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;