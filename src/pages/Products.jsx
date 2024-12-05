import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = {
    all: 'Todos os Produtos',
    potCakes: 'Bolos de Pote',
    brownies: 'Brownies',
    candies: 'Doces'
  };

  const filterProducts = () => {
    if (selectedCategory === 'all') {
      return [
        ...products.potCakes,
        ...products.brownies,
        ...products.candies
      ];
    }
    return products[selectedCategory] || [];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nossos Produtos</h1>
      
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === key
                ? 'bg-pink-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterProducts().map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}