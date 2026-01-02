export default function ProductCardSkeleton() {
  return (
    <div className="border rounded p-4 bg-white animate-pulse">
      <div className="h-48 bg-gray-300 rounded mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="flex justify-between items-center mt-6">
          <div className="h-6 bg-gray-300 rounded w-20"></div>
          <div className="h-10 bg-gray-300 rounded w-28"></div>
        </div>
      </div>
    </div>
  );
}
