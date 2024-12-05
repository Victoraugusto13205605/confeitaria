import React from 'react';

export function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      {/* Seção Principal */}
      <section style={{ textAlign: 'center', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
          Doces Especiais para Momentos Únicos
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#4b5563', maxWidth: '32rem', margin: '0 auto' }}>
          Transformamos seus eventos em momentos inesquecíveis com nossas deliciosas criações artesanais
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <a href="/products">
            <button style={{
              padding: '1rem 2rem',
              fontSize: '1rem',
              backgroundColor: '#1f2937',
              color: '#fff',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer'
            }}>
              Ver Catálogo
            </button>
          </a>
          <a href="/order">
            <button style={{
              padding: '1rem 2rem',
              fontSize: '1rem',
              backgroundColor: 'transparent',
              border: '2px solid #1f2937',
              color: '#1f2937',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}>
              Fazer Pedido
            </button>
          </a>
        </div>
      </section>

      {/* Cards de Destaque */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
        <div style={{ textAlign: 'center', gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '2rem', color: '#db2777' }}>🍰</div>
          <h3 style={{ fontWeight: '600', fontSize: '1.125rem' }}>Produtos Artesanais</h3>
          <p style={{ color: '#4b5563' }}>Feitos com ingredientes selecionados e muito amor</p>
        </div>
        <div style={{ textAlign: 'center', gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '2rem', color: '#db2777' }}>🎁</div>
          <h3 style={{ fontWeight: '600', fontSize: '1.125rem' }}>Personalização</h3>
          <p style={{ color: '#4b5563' }}>Criamos doces únicos para sua ocasião especial</p>
        </div>
        <div style={{ textAlign: 'center', gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '2rem', color: '#db2777' }}>⏰</div>
          <h3 style={{ fontWeight: '600', fontSize: '1.125rem' }}>Pontualidade</h3>
          <p style={{ color: '#4b5563' }}>Entrega no prazo e com qualidade garantida</p>
        </div>
      </section>

      {/* Depoimento */}
      <section style={{
        backgroundColor: '#fef2f2',
        borderRadius: '0.75rem',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '2rem', color: '#db2777' }}>⭐</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Nossos Clientes Amam</h2>
          <p style={{ fontStyle: 'italic', color: '#4b5563' }}>
            "Os doces são simplesmente maravilhosos! Fiz um pedido para meu casamento e todos os convidados elogiaram. Super recomendo!"
          </p>
          <p style={{ fontWeight: '500' }}>Maria Silva</p>
        </div>
      </section>
    </div>
  );
}
