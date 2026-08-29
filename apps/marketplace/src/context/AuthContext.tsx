import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

export interface CustomerProfile {
  address?: string;
  companyName?: string;
  taxCode?: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  role: 'CUSTOMER' | 'TENANT_ADMIN' | 'SUPER_ADMIN';
  customerProfile?: CustomerProfile;
}

export interface OrderTemplateInfo {
  id?: string;
  name: string;
  slug: string;
  thumbnail?: string;
  priceBuy?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  amount: number;
  type: 'BUY' | 'RENT' | 'BUY_SOURCE';
  status: 'COMPLETED' | 'WAITING_CONFIRM' | 'PENDING';
  createdAt: string;
  template: OrderTemplateInfo;
  subdomain?: string;
  note?: string;
}

export interface WishlistItem {
  id: string;
  template: {
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
    thumbnail: string;
    priceBuy?: number;
    collectionSlug?: string;
  };
}

export interface CartItem {
  template: {
    id: string;
    name: string;
    slug: string;
    thumbnail: string;
    priceBuy: number;
    priceRentMonthly: number;
  };
  type: 'BUY' | 'RENT' | 'BUY_SOURCE';
  subdomain?: string;
  note?: string;
}

export interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  actionLabel?: string;
  onAction?: () => void;
}

interface AuthContextType {
  user: User | null;
  orders: Order[];
  wishlists: WishlistItem[];
  cart: CartItem[];
  isAuthModalOpen: boolean;
  authTab: 'login' | 'register';
  isLoading: boolean;
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info', action?: { label: string; onClick: () => void }) => void;
  hideToast: () => void;
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { fullName: string; email: string; phone?: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (profile: { fullName: string; phone: string; address: string; companyName: string; taxCode: string }) => void;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  addOrder: (order: { template: OrderTemplateInfo; type: 'BUY' | 'RENT' | 'BUY_SOURCE'; amount: number; subdomain?: string; note?: string }) => Order;
  toggleWishlist: (template: any) => void;
  isWishlisted: (templateSlug: string) => boolean;
  isPurchased: (templateSlug: string) => boolean;
  addToCart: (template: any, type?: 'BUY' | 'RENT' | 'BUY_SOURCE', subdomain?: string, note?: string) => void;
  removeFromCart: (templateId: string) => void;
  updateCartItem: (templateId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlists, setWishlists] = useState<WishlistItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success', action?: { label: string; onClick: () => void }) => {
    const id = `toast-${Date.now()}`;
    setToast({
      id,
      message,
      type,
      actionLabel: action?.label,
      onAction: action?.onClick,
    });
  };

  const hideToast = () => {
    setToast(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('platformbds_user_v3');
        const savedOrders = localStorage.getItem('platformbds_orders_v3');
        const savedWishlist = localStorage.getItem('platformbds_wishlist_v3');
        const savedCart = localStorage.getItem('platformbds_cart_v3');

        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (e) {
            console.error('Failed to parse saved user', e);
            setUser(null);
          }
        } else {
          setUser(null);
        }

        if (savedOrders) {
          try {
            setOrders(JSON.parse(savedOrders));
          } catch (e) {
            console.error('Failed to parse saved orders', e);
          }
        } else {
          setOrders([]);
          localStorage.setItem('platformbds_orders_v3', JSON.stringify([]));
        }

        if (savedWishlist) {
          try {
            setWishlists(JSON.parse(savedWishlist));
          } catch (e) {
            console.error('Failed to parse saved wishlist', e);
          }
        }

        if (savedCart) {
          try {
            setCart(JSON.parse(savedCart));
          } catch (e) {
            console.error('Failed to parse saved cart', e);
          }
        }

        try {
          const res = await axios.get(`${API_URL}/api/auth/me`, {
            withCredentials: true,
            timeout: 3000,
          });
          if (res?.data?.data?.user) {
            const apiUser = res.data.data.user;
            if (apiUser.role === 'SUPER_ADMIN') {
              setUser(null);
              localStorage.removeItem('platformbds_user_v3');
              localStorage.removeItem('platformbds_orders_v3');
              return;
            }
            const apiOrders = res.data.data.orders || [];
            const apiWishlists = res.data.data.user?.wishlists || [];

            setUser(apiUser);
            setOrders(apiOrders);
            setWishlists(apiWishlists);

            localStorage.setItem('platformbds_user_v3', JSON.stringify(apiUser));
            localStorage.setItem('platformbds_orders_v3', JSON.stringify(apiOrders));
            localStorage.setItem('platformbds_wishlist_v3', JSON.stringify(apiWishlists));
          } else {
            setUser(null);
            setOrders([]);
            localStorage.removeItem('platformbds_user_v3');
            localStorage.removeItem('platformbds_orders_v3');
          }
        } catch (err) {
          // Backend API offline or session expired
          setUser(null);
          setOrders([]);
          localStorage.removeItem('platformbds_user_v3');
          localStorage.removeItem('platformbds_orders_v3');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setIsAuthModalOpen(false);
    if (typeof window !== 'undefined') {
      window.location.href = tab === 'register' ? '/register' : '/login';
    }
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email.trim().toLowerCase() === 'admin@aireviewbds.com') {
      throw new Error('Tài khoản Super Admin vui lòng đăng nhập tại trang quản trị riêng: https://admin.aireviewbds.com');
    }

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password }, {
        withCredentials: true,
        timeout: 5000,
      });
      if (res?.data?.data?.user || res?.data?.user) {
        const loggedUser = res.data?.data?.user || res.data?.user;
        if (loggedUser.role === 'SUPER_ADMIN') {
          await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true, timeout: 2000 }).catch(() => {});
          localStorage.removeItem('platformbds_user_v3');
          throw new Error('Tài khoản Super Admin không thể đăng nhập trên Marketplace. Vui lòng đăng nhập tại https://admin.aireviewbds.com');
        }
        
        setUser(loggedUser);
        localStorage.setItem('platformbds_user_v3', JSON.stringify(loggedUser));

        // Fetch fresh user profile & orders for this exact user
        try {
          const meRes = await axios.get(`${API_URL}/api/auth/me`, {
            withCredentials: true,
            timeout: 3000,
          });
          if (meRes?.data?.data?.user) {
            const freshUser = meRes.data.data.user;
            const freshOrders = meRes.data.data.orders || [];
            const freshWishlists = meRes.data.data.user?.wishlists || [];

            setUser(freshUser);
            setOrders(freshOrders);
            setWishlists(freshWishlists);

            localStorage.setItem('platformbds_user_v3', JSON.stringify(freshUser));
            localStorage.setItem('platformbds_orders_v3', JSON.stringify(freshOrders));
            localStorage.setItem('platformbds_wishlist_v3', JSON.stringify(freshWishlists));
          }
        } catch (e) {
          setOrders([]);
          localStorage.setItem('platformbds_orders_v3', JSON.stringify([]));
        }

        setIsAuthModalOpen(false);
        return true;
      }
    } catch (err: any) {
      const msg = err?.response?.data?.error?.message || err?.message;
      throw new Error(msg || 'Đăng nhập không thành công. Vui lòng kiểm tra lại.');
    }
    return false;
  };

  const register = async (data: { fullName: string; email: string; phone?: string; password: string }): Promise<boolean> => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, data, {
        timeout: 5000,
      });
      return res.data?.success ?? true;
    } catch (err: any) {
      const serverMessage = err?.response?.data?.error?.message || err?.message;
      throw new Error(serverMessage || 'Đăng ký không thành công. Vui lòng thử lại.');
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, {
        withCredentials: true,
        timeout: 2000,
      });
    } catch (e) {}

    setUser(null);
    setOrders([]);
    setWishlists([]);
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('platformbds_user_v3');
      localStorage.removeItem('platformbds_orders_v3');
      localStorage.removeItem('platformbds_wishlist_v3');
      localStorage.removeItem('platformbds_cart_v3');
    }
  };

  const updateProfile = async (profile: { fullName: string; phone: string; address: string; companyName: string; taxCode: string }) => {
    if (!user) return;
    try {
      const res = await axios.put(`${API_URL}/api/auth/profile`, profile, {
        withCredentials: true,
        timeout: 5000,
      });
      if (res.data?.data?.user) {
        const updatedUser = res.data.data.user;
        setUser(updatedUser);
        localStorage.setItem('platformbds_user_v3', JSON.stringify(updatedUser));
        return;
      }
    } catch (err) {
      console.warn('API profile update failed, updating local state.');
    }

    const updatedUser: User = {
      ...user,
      fullName: profile.fullName,
      phone: profile.phone,
      customerProfile: {
        address: profile.address,
        companyName: profile.companyName,
        taxCode: profile.taxCode,
      },
    };
    setUser(updatedUser);
    localStorage.setItem('platformbds_user_v3', JSON.stringify(updatedUser));
  };

  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/change-password`, {
        currentPassword: oldPassword,
        newPassword,
      }, { withCredentials: true });
      
      if (res.data?.success) {
        return true;
      }
      throw new Error(res.data?.error?.message || 'Đổi mật khẩu thất bại.');
    } catch (err: any) {
      const msg = err?.response?.data?.error?.message || err?.message || 'Mật khẩu cũ không đúng hoặc đổi mật khẩu thất bại.';
      throw new Error(msg);
    }
  };

  const addOrder = (orderInfo: { template: OrderTemplateInfo; type: 'BUY' | 'RENT' | 'BUY_SOURCE'; amount: number; subdomain?: string; note?: string }): Order => {
    const newOrderNumber = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      amount: orderInfo.amount,
      type: orderInfo.type,
      status: 'COMPLETED',
      createdAt: new Date().toISOString(),
      template: orderInfo.template,
      subdomain: orderInfo.subdomain,
      note: orderInfo.note,
    };

    const nextOrders = [newOrder, ...orders];
    setOrders(nextOrders);
    if (typeof window !== 'undefined') {
      localStorage.setItem('platformbds_orders_v3', JSON.stringify(nextOrders));
    }

    axios.post(`${API_URL}/api/marketplace/orders`, {
      templateId: orderInfo.template.id || orderInfo.template.slug,
      type: orderInfo.type,
      amount: orderInfo.amount,
      fullName: user?.fullName || 'Khách hàng',
      email: user?.email || 'customer@platformbds.vn',
      phone: user?.phone || '0919006030',
      subdomain: orderInfo.subdomain,
      note: orderInfo.note,
    }).catch(() => {});

    return newOrder;
  };

  const toggleWishlist = (template: any) => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    const slug = template.slug;
    const exists = wishlists.some((w) => w.template.slug === slug);
    let nextWishlist: WishlistItem[];
    if (exists) {
      nextWishlist = wishlists.filter((w) => w.template.slug !== slug);
    } else {
      const newItem: WishlistItem = {
        id: `wsh-${Date.now()}`,
        template: {
          id: template.id || template.slug,
          name: template.name,
          slug: template.slug,
          shortDescription: template.shortDescription || template.description || '',
          thumbnail: template.thumbnail || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
          priceBuy: template.priceBuy || 499000,
          collectionSlug: template.collectionSlug,
        },
      };
      nextWishlist = [newItem, ...wishlists];
    }
    setWishlists(nextWishlist);
    if (typeof window !== 'undefined') {
      localStorage.setItem('platformbds_wishlist_v3', JSON.stringify(nextWishlist));
    }
  };

  const isWishlisted = (templateSlug: string): boolean => {
    return wishlists.some((w) => w.template.slug === templateSlug);
  };

  const isPurchased = (templateSlug: string): boolean => {
    if (!templateSlug) return false;
    const slug = templateSlug.toLowerCase().trim();
    
    // Check if current user's tenant has this template
    if ((user as any)?.tenant?.templateSlug?.toLowerCase() === slug || (user as any)?.tenant?.template?.toLowerCase() === slug) {
      return true;
    }

    // Check in existing orders
    return orders.some((o) => {
      const oSlug = (o.template?.slug || (o.template as any)?.id || '').toLowerCase().trim();
      return oSlug === slug;
    });
  };

  const addToCart = (template: any, type: 'BUY' | 'RENT' | 'BUY_SOURCE' = 'BUY', subdomain?: string, note?: string) => {
    const slug = template.slug || template.id;

    // If template is already owned by user
    if (isPurchased(slug)) {
      showToast(`Bạn đã sở hữu mẫu "${template.name}". Bạn có thể sử dụng vĩnh viễn không cần mua lại!`, 'info', {
        label: 'Vào CMS Quản trị',
        onClick: () => {
          const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com';
          if (typeof window !== 'undefined') window.location.href = cmsUrl;
        },
      });
      return;
    }

    const exists = cart.some(item => item.template.slug === slug || item.template.id === template.id);
    if (exists) {
      showToast(`Mẫu "${template.name}" đã có trong giỏ hàng!`, 'info', {
        label: 'Xem giỏ hàng',
        onClick: () => {
          if (typeof window !== 'undefined') window.location.href = '/cart';
        },
      });
      return;
    }

    const newItem: CartItem = {
      template: {
        id: template.id || slug,
        name: template.name,
        slug: slug,
        thumbnail: template.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        priceBuy: template.priceBuy || 499000,
        priceRentMonthly: template.priceRentMonthly || 199000,
      },
      type: type || 'BUY',
      subdomain: subdomain || '',
      note: note || '',
    };

    const newCart = [newItem, ...cart];
    setCart(newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('platformbds_cart_v3', JSON.stringify(newCart));
    }

    showToast(`Đã thêm "${template.name}" vào giỏ hàng!`, 'success', {
      label: 'Xem giỏ hàng',
      onClick: () => {
        if (typeof window !== 'undefined') window.location.href = '/cart';
      },
    });
  };

  const removeFromCart = (templateId: string) => {
    const newCart = cart.filter(item => item.template.id !== templateId && item.template.slug !== templateId);
    setCart(newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('platformbds_cart_v3', JSON.stringify(newCart));
    }
    showToast('Đã xóa mẫu khỏi giỏ hàng', 'info');
  };

  const updateCartItem = (templateId: string, updates: Partial<CartItem>) => {
    const newCart = cart.map(item => {
      if (item.template.id === templateId || item.template.slug === templateId) {
        return { ...item, ...updates };
      }
      return item;
    });
    setCart(newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('platformbds_cart_v3', JSON.stringify(newCart));
    }
  };

  const clearCart = () => {
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('platformbds_cart_v3', JSON.stringify([]));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        wishlists,
        cart,
        isAuthModalOpen,
        authTab,
        isLoading,
        toast,
        showToast,
        hideToast,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile,
        updatePassword,
        addOrder,
        toggleWishlist,
        isWishlisted,
        isPurchased,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


