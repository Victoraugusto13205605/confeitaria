import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { formatDate, getOrderStatus } from '../lib/utils';

export function OrderTracking() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{order.productName}</h3>
                <p className="text-sm text-gray-600">
                  Pedido feito em: {formatDate(order.createdAt.toDate())}
                </p>
                <p className="text-sm text-gray-600">
                  Data de entrega: {formatDate(new Date(order.deliveryDate))}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Quantidade: {order.quantity} | Tamanho: {
                    order.size === 'small' ? 'Pequeno' :
                    order.size === 'medium' ? 'Médio' : 'Grande'
                  }
                </p>
                {order.specialInstructions && (
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Instruções especiais:</strong><br />
                    {order.specialInstructions}
                  </p>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {getOrderStatus(order.status)}
              </span>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">
              Você ainda não tem pedidos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}