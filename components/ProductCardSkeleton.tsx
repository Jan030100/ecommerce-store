export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 animate-pulse">
      <div className="h-48 w-full bg-gray-300"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6 mb-6"></div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            <div className="h-7 bg-gray-300 rounded w-20 mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
}