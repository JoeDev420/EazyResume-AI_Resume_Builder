const LoadingSpinner = ({color}) => {
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      <span className={`h-5 w-5 border-2 border-${color||"white"} border-t-transparent rounded-full animate-spin`} />
    </span>
  );
};

export default LoadingSpinner;
