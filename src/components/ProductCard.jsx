import React from 'react';
import { Link } from 'react-router-dom';

export function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
        <div className="mt-2">
          <p className="text-sm font-medium">Preços:</p>
          <ul className="text-gray-600 text-sm">
            <li>Pequeno: R$ {product.price.small.toFixed(2)}</li>
            <li>Médio: R$ {product.price.medium.toFixed(2)}</li>
            <li>Grande: R$ {product.price.large.toFixed(2)}</li>
          </ul>
        </div>
        <Link
          to={`/order/${product.id}`}
          className="mt-4 block w-full bg-pink-600 text-white text-center py-2 rounded-md hover:bg-pink-700 transition-colors"
        >
          Fazer Pedido
        </Link>
      </div>
    </div>
  );
}