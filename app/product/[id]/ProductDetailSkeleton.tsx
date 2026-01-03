  export default function ProductDetailSkeleton(){
    return(
  <div className="container mx-auto px-4 py-8">
        <div className="h-6 w-24 bg-gray-300 rounded mb-6"></div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-300 rounded"></div>
          
          <div>
            <div className="h-6 w-20 bg-gray-300 rounded mb-4"></div>
            <div className="h-10 w-3/4 bg-gray-300 rounded mb-6"></div>
            <div className="h-8 w-32 bg-gray-300 rounded mb-8"></div>
            <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded mb-8"></div>
            
            <div className="h-12 w-full bg-gray-300 rounded mb-4"></div>
            <div className="h-12 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
