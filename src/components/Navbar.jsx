import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Cake, ShoppingBag, User } from 'lucide-react';

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Cake className="h-6 w-6 text-pink-600" />
            <span className="font-bold text-xl">Confeitaria</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/products">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100">
                <ShoppingBag className="h-4 w-4" />
                <span>Produtos</span>
              </button>
            </Link>

            {user ? (
              <>
                <Link to="/track">
                  <button className="px-4 py-2 rounded-md hover:bg-gray-100">
                    Meus Pedidos
                  </button>
                </Link>
                {user.email === 'admin@confeitaria.com' && (
                  <Link to="/admin">
                    <button className="px-4 py-2 rounded-md hover:bg-gray-100">
                      Admin
                    </button>
                  </Link>
                )}
              </>
            ) : (
              <Link to="/login">
                <button className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
                  <User className="h-4 w-4" />
                  <span>Entrar</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}