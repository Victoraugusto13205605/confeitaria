import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR').format(date);
}

export function getOrderStatus(status) {
  const statusMap = {
    pending: 'Pendente',
    in_progress: 'Em Produção',
    completed: 'Concluído',
    delivered: 'Entregue'
  };
  
  return statusMap[status] || status;
}