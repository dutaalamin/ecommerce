const API_URL = process.env.REACT_APP_API_URL || 'https://fakestoreapi.com';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Gagal memuat produk. Silakan coba lagi.');
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Gagal memuat produk kategori. Silakan coba lagi.');
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Gagal memuat kategori. Silakan coba lagi.');
  }
};
