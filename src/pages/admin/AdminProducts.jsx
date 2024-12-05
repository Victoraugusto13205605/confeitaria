import React, { useState, useEffect } from 'react';

export function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Função mock para simular a busca de produtos
    fetchProducts();
  }, []);

  async function fetchProducts() {
    // Mock de produtos
    const mockProducts = [
      {
        id: '1',
        name: 'Produto 1',
        description: 'Descrição do produto 1',
        price: 29.99,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: '2',
        name: 'Produto 2',
        description: 'Descrição do produto 2',
        price: 49.99,
        imageUrl: 'https://via.placeholder.com/150',
      },
    ];
    setProducts(mockProducts);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const newProduct = {
        id: String(products.length + 1),
        name,
        description,
        price: Number(price),
        imageUrl: URL.createObjectURL(image),
      };

      setProducts([...products, newProduct]);
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(productId) {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter((product) => product.id !== productId));
    }
  }

  return (
    <div style={{ padding: '1rem', gap: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Gerenciar Produtos</h1>

      {/* Formulário de adição de produtos */}
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
            }}
            required
          />
        </div>

        <div>
          <label>Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
            }}
            required
          />
        </div>

        <div>
          <label>Preço</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
            }}
            required
          />
        </div>

        <div>
          <label>Imagem</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0] || null)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
            }}
            accept="image/*"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem',
            backgroundColor: '#d1d5db',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Adicionando...' : 'Adicionar Produto'}
        </button>
      </form>

      {/* Lista de produtos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '0.5rem',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1rem', gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{product.name}</h3>
              <p style={{ color: '#6b7280' }}>{product.description}</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#db2777' }}>
                R$ {product.price.toFixed(2)}
              </p>
              <button
                onClick={() => handleDelete(product.id)}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #db2777',
                  borderRadius: '0.25rem',
                  backgroundColor: 'transparent',
                  color: '#db2777',
                  cursor: 'pointer',
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
