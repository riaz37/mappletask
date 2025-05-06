import axios from 'axios';
import { Product, ProductFormData, LoginCredentials, AuthResponse, User } from '@/types';

// Create axios instance with defaults
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

// Add request interceptor to include auth token in headers
api.interceptors.request.use((config) => {
  // Get token from cookie
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('auth_token='));
  const token = tokenCookie ? tokenCookie.split('=')[1] : null;
  
  // If token exists, add it to the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Auth API
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', credentials);
  return {
    user: response.data.user,
    token: response.data.access_token
  };
};

export const register = async (credentials: { email: string; password: string }): Promise<void> => {
  await api.post('/auth/register', credentials);
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
  // The cookie is cleared by the server
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    // Check if we have a token before making the request
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('auth_token='));
    
    // If no token exists, don't even try to fetch the user
    if (!tokenCookie) {
      return null;
    }
    
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Clear invalid token
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
      // Not authenticated or endpoint not found, return null
      return null;
    }
    console.error('Error fetching current user:', error);
    return null;
  }
};

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If 401 Unauthorized, clear token and redirect to login
    if (error.response && error.response.status === 401) {
      // Clear invalid token
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Only redirect if we're in the browser
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Products API
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (data: ProductFormData): Promise<Product> => {
  const response = await api.post('/products', data);
  return response.data;
};

export const updateProduct = async (id: string, data: ProductFormData): Promise<Product> => {
  const response = await api.patch(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};

export default api;
