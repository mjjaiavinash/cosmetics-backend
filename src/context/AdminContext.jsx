import { createContext, useContext, useState, useEffect } from 'react';
import { generateSampleData } from '../utils/sampleData';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    generateSampleData();
    
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [
      { id: 1, name: 'Skincare', subcategories: ['Face Cream', 'Serum', 'Moisturizer', 'Sunscreen'] },
      { id: 2, name: 'Makeup', subcategories: ['Foundation', 'Mascara', 'Lipstick', 'Eyeliner'] },
      { id: 3, name: 'Haircare', subcategories: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Mask'] },
      { id: 4, name: 'Perfume', subcategories: ['Floral', 'Citrus', 'Woody', 'Fresh'] }
    ];
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const savedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    const savedOffers = JSON.parse(localStorage.getItem('offers')) || [];
    const savedSettings = JSON.parse(localStorage.getItem('adminSettings')) || {
      storeName: 'Cosmetics Store',
      currency: '₹',
      taxRate: 18,
      shippingFee: 50
    };

    setProducts(savedProducts);
    setCategories(savedCategories);
    setOrders(savedOrders);
    setCustomers(savedCustomers);
    setOffers(savedOffers);
    setSettings(savedSettings);
  }, []);

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const updateProduct = (id, updatedProduct) => {
    const updatedProducts = products.map(p => p.id === id ? { ...p, ...updatedProduct } : p);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const addCategory = (category) => {
    const newCategory = { ...category, id: Date.now() };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const updateCategory = (id, updatedCategory) => {
    const updatedCategories = categories.map(c => c.id === id ? { ...c, ...updatedCategory } : c);
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const deleteCategory = (id) => {
    const updatedCategories = categories.filter(c => c.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const updateOrderStatus = (id, status) => {
    const updatedOrders = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const addOffer = (offer) => {
    const newOffer = { ...offer, id: Date.now() };
    const updatedOffers = [...offers, newOffer];
    setOffers(updatedOffers);
    localStorage.setItem('offers', JSON.stringify(updatedOffers));
  };

  const updateOffer = (id, updatedOffer) => {
    const updatedOffers = offers.map(o => o.id === id ? { ...o, ...updatedOffer } : o);
    setOffers(updatedOffers);
    localStorage.setItem('offers', JSON.stringify(updatedOffers));
  };

  const deleteOffer = (id) => {
    const updatedOffers = offers.filter(o => o.id !== id);
    setOffers(updatedOffers);
    localStorage.setItem('offers', JSON.stringify(updatedOffers));
  };

  const updateSettings = (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('adminSettings', JSON.stringify(updatedSettings));
  };

  const value = {
    products, addProduct, updateProduct, deleteProduct,
    categories, addCategory, updateCategory, deleteCategory,
    orders, updateOrderStatus,
    customers,
    offers, addOffer, updateOffer, deleteOffer,
    settings, updateSettings
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};