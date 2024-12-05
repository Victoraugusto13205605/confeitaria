import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { products } from '../data/products';

export function OrderForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [size, setSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const allProducts = [
    ...products.potCakes,
    ...products.brownies,
    ...products.candies
  ];
  
  const product = allProducts.find(p => p.id === productId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const order = {
        userId: user.uid,
        productId,
        productName: product.name,
        size,
        quantity: Number(quantity),
        specialInstructions,
        deliveryDate,
        status: 'pending',
        createdAt: new Date(),
        total: product.price[size] * quantity
      };

      await addDoc(collection(db, 'orders'), order);
      navigate('/track');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fazer Pedido</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tamanho
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            >
              <option value="small">Pequeno - R$ {product.price.small.toFixed(2)}</option>
              <option value="medium">Médio - R$ {product.price.medium.toFixed(2)}</option>
              <option value="large">Grande - R$ {product.price.large.toFixed(2)}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantidade
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data de Entrega
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instruções Especiais
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-lg font-semibold">
              Total: R$ {(product.price[size] * quantity).toFixed(2)}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors"
          >
            Confirmar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}