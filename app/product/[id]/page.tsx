'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/types';
import { addToCart } from '@/lib/cart';
import ProductDetailSkeleton from './ProductDetailSkeleton'; 

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        async function fetchProduct() {
            try{
                setLoading(true);
                setError(null);
                const response = await fetch(`/api/products?id=${params.id}`);
                     if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        
        if(data.success && data.data){
            setProduct(data.data)
        }
        else{
            setError('Product not found');
        }
      }  catch(error){
              console.error('Error:', error);
        setError('Something went wrong');
        }
        finally {
        setLoading(false);
      }
            }

        if (params.id){
            fetchProduct();
        }
    },[params.id]);

 const handleAddToCart = () =>{
    if(!product) return;

    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
    };
    addToCart(cartItem);
       alert(`Added ${quantity} ${product.name}(s) to cart!`);
 };

 const handleQuantityChange = (change:number) =>{
    const newQ = quantity + change;
    if (newQ >= 1 && newQ<=10){
        setQuantity(newQ);
    }
 };
  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) return null;

  return(
    <div className="container mx-auto px-4 py-8">
        <button
        onClick={()=> router.push('/')}
        className="container mx-auto px-4 py-8">
        Back
        </button>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 bg-white rounded-lg border">
                 <Image 
                 src={product.image}
                 alt={product.name}
                 fill
                 className="object-cover rounded"
                 />
            </div>
            <div>
                <div className="mb-2">
                         <span className={`px-3 py-1 rounded-full text-sm ${
                         product.category === 'Electronics' ? 'bg-blue-100 text-blue-800' :
                         product.category === 'Clothing' ? 'bg-green-100 text-green-800' :
                         'bg-purple-100 text-purple-800'
                         }`}>
                             {product.category}
                         </span>
                </div>
                 <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

                 <div className="text-3xl font-bold text-gray-800 mb-6">
                 ${product.price.toFixed(2)}
                 </div>

                 <div className="mb-8">
                 <h2 className="text-lg font-semibold mb-2">Description</h2>
                 <p className="text-gray-600">{product.description}</p>
                 </div>


                 <div className="mb-8">
                     <h2 className="text-lg font-semibold mb-4">Quantity</h2>
                     <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-lg">
                                 <button 
                                 onClick={() => handleQuantityChange(-1)} 
                                 className="w-10 h-10 bg-gray-100 hover:bg-gray-200">
                                -</button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                 <button 
                                 onClick={() => handleQuantityChange(1)}
                                 className="w-10 h-10 bg-gray-100 hover:bg-gray-200">
                                +</button>
                        </div>
                        <div className="text-gray-600">
                             Total: <span className="font-bold">${(product.price * quantity).toFixed(2)}</span>
                        </div>
                     </div>
                 </div>
                 <div className="space-y-4">
                    <button 
                     onClick={handleAddToCart}
                     className="w-full bg-gray-800 hover:bg-black text-white py-3 rounded-lg">
                        Add to Cart
                     </button>

                     <button  onClick={() => {
                        handleAddToCart();
                        router.push('/');
                        }}
                        className="w-full border border-gray-800 text-gray-800 py-3 rounded-lg hover:bg-gray-50">
                            Add & Continue Shopping
                     </button>
                 </div>
            </div>
        </div>
    </div>
  );
}
