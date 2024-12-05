import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { formatDate, getOrderStatus } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.email !== 'admin@confeitaria.com') {
      navigate('/admin/login');
      return;
    }

    const q = query(collection(db, 'orders'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, [user, navigate]);

  async function updateOrderStatus(orderId, newStatus) {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus
      });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Gerenciar Pedidos</h1>

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

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => updateOrderStatus(order.id, 'in_progress')}
                disabled={order.status === 'in_progress'}
                className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
              >
                Iniciar Produção
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, 'completed')}
                disabled={order.status === 'completed'}
                className="px-4 py-2 text-sm font-medium rounded-md bg-pink-600 text-white hover:bg-pink-700 disabled:opacity-50"
              >
                Marcar como Concluído
              </button>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">
              Não há pedidos no momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}