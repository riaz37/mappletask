// Product types
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  status: 'in_stock' | 'out_of_stock';
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  quantity: number;
  status?: 'in_stock' | 'out_of_stock';
}

// Auth types
export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
