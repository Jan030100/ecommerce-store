import { NextRequest, NextResponse } from "next/server";
import productsData from "@/data/products.json";
import { Product } from "@/types";

export async function GET (request :NextRequest) {
    try {
        await new Promise (resolve => setTimeout(resolve, 100));
        
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get('category');
        const priceRange = searchParams.get('priceRange');

        let filteredProducts: Product[]=[...productsData];

        if (category && category !== 'All'){
            filteredProducts = filteredProducts.filter(
                product => product.category === category 
            );
        }

        if (priceRange && priceRange !== 'All') {
            filteredProducts = filteredProducts.filter(product => {
                switch (priceRange) {
                    case 'Under50': 
                    return product.price < 50 ;

                    case '50to100': 
                    return product.price >= 50 && product.price <=100 ;

                    case 'Over100': 
                    return product.price > 100 ;

                    default:
                        return true;
                }
            });
        }

        return NextResponse.json ({
            success: true,
            data: filteredProducts,
            count: filteredProducts.length,
            total: productsData.length
        }, {status: 200});

    } 
    catch (error) {
        console.error('API Error:',error);
        return NextResponse.json ({
            success: false,
            error: 'Failed to fetch products'
        }, {status:500});
    }
}