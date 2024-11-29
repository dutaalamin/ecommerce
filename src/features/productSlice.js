import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateProducts } from '../utils/generateProducts';

const ITEMS_PER_PAGE = 12;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { getState }) => {
    const { page } = getState().products;
    
    try {
      // Cek cache terlebih dahulu
      let allProducts = JSON.parse(localStorage.getItem('cachedProducts') || 'null');
      
      // Jika tidak ada cache, generate baru
      if (!allProducts) {
        allProducts = generateProducts(100);
        localStorage.setItem('cachedProducts', JSON.stringify(allProducts));
      }
      
      // Simulasi network delay yang lebih pendek
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      
      return {
        items: allProducts.slice(start, end),
        totalItems: allProducts.length
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
);

const initialState = {
  items: [],
  filteredItems: [],
  allItems: [],
  status: 'idle',
  error: null,
  filters: {
    priceRange: [0, 1000],
    categories: [],
    sortBy: '',
    searchTerm: ''
  },
  page: 1,
  hasMore: true,
  totalItems: 0
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = applyFilters(state.allItems, state.filters);
    },
    setSearchTerm: (state, action) => {
      state.filters.searchTerm = action.payload;
      state.filteredItems = applyFilters(state.allItems, state.filters);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredItems = state.allItems;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    resetPagination: (state) => {
      state.page = 1;
      state.hasMore = true;
      state.items = [];
      state.filteredItems = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Append new items to existing ones
        state.items = [...state.items, ...action.payload.items];
        state.allItems = state.items;
        state.filteredItems = applyFilters(state.items, state.filters);
        // Check if we have more items to load
        state.hasMore = action.payload.items.length === ITEMS_PER_PAGE;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Helper function to apply filters
const applyFilters = (items, filters) => {
  let result = [...items];

  // Apply search term
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    result = result.filter(item =>
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  }

  // Apply category filters
  if (filters.categories.length > 0) {
    result = result.filter(item =>
      filters.categories.includes(item.category)
    );
  }

  // Apply price range
  result = result.filter(item =>
    item.price >= filters.priceRange[0] &&
    item.price <= filters.priceRange[1]
  );

  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name_desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;
    }
  }

  return result;
};

export const {
  setFilters,
  setSearchTerm,
  clearFilters,
  incrementPage,
  resetPagination
} = productSlice.actions;

export default productSlice.reducer; 