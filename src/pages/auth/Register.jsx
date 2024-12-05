import React, { useState } from 'react';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulação de criação de conta (mock)
    if (email === '' || password === '') {
      setError('Todos os campos são obrigatórios.');
    } else if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
    } else {
      alert('Conta criada com sucesso!');
      setEmail('');
      setPassword('');
      setError('');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
        Criar Conta
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {error && (
          <div style={{ backgroundColor: '#fde2e2', color: '#e63946', padding: '0.5rem', borderRadius: '0.25rem' }}>
            {error}
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.25rem',
              fontSize: '1rem',
            }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.25rem',
              fontSize: '1rem',
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '0.75rem',
            backgroundColor: '#ec4899',
            color: '#fff',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Criar Conta
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
          Já tem uma conta?{' '}
          <a href="/login" style={{ color: '#ec4899', textDecoration: 'none' }}>
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}
