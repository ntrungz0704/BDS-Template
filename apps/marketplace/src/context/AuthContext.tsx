import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { extractTemplateCode, formatTemplateDisplayName } from '@repo/utils';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

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
  status: string;
  fulfillmentStatus?: string;
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
  toggleWishlist: (template: any) => void;
  isWishlisted: (templateSlug: string) => boolean;
  isPurchased: (templateSlug: string) => boolean;
  isPendingApproval: (templateSlug: string) => boolean;
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

  const syncCartToBackend = async (cartItems: CartItem[]) => {
    try {
      const csrfToken = typeof document !== 'undefined' ? (localStorage.getItem('csrf_token') || '') : null;
      await axios.put(`${API_URL}/api/marketplace/cart`, { items: cartItems }, {
        withCredentials: true,
        headers: csrfToken ? { 'x-csrf-token': decodeURIComponent(csrfToken) } : {},
      });
    } catch (e) {
      // silently ignore network errors during background sync
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      if (typeof window !== 'undefined') {
        const explicitlyLoggedOut = localStorage.getItem('platformbds_logged_out') === 'true';
        if (explicitlyLoggedOut) {
          setUser(null);
          setOrders([]);
          setWishlists([]);
          setCart([]);
          setIsLoading(false);
          return;
        }

        const savedUser = localStorage.getItem('platformbds_user_v3');
        const savedOrders = localStorage.getItem('platformbds_orders_v3');
        const savedWishlist = localStorage.getItem('platformbds_wishlist_v3');
        const savedCart = localStorage.getItem('platformbds_cart_v3');

        let initialCart: CartItem[] = [];
        if (savedCart) {
          try {
            initialCart = JSON.parse(savedCart);
            setCart(initialCart);
          } catch (e) {
            console.error('Failed to parse saved cart', e);
          }
        }

        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            // Also try to read user-scoped cart cache
            const userCartKey = `platformbds_user_cart_${parsedUser.id}`;
            const userScopedCart = localStorage.getItem(userCartKey);
            if (userScopedCart && (!initialCart || initialCart.length === 0)) {
              try {
                initialCart = JSON.parse(userScopedCart);
                setCart(initialCart);
              } catch (_) {}
            }
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

        try {
          let meRes = await axios.get(`${API_URL}/api/auth/me`, {
            withCredentials: true,
            timeout: 6000,
          }).catch(async (meErr) => {
            if (meErr?.response?.status === 401) {
              // Try silent refresh using refresh_token cookie
              try {
                const refreshRes = await axios.post(`${API_URL}/api/auth/refresh`, {}, {
                  withCredentials: true,
                  timeout: 6000,
                });
                if (refreshRes?.data?.success) {
                  // Retry /me after refresh
                  return await axios.get(`${API_URL}/api/auth/me`, {
                    withCredentials: true,
                    timeout: 6000,
                  });
                }
              } catch (_) {
                // Refresh token also invalid or expired
                throw meErr;
              }
            }
            throw meErr;
          });

          if (meRes?.data?.data?.user) {
            const apiUser = meRes.data.data.user;
            if (apiUser.role === 'SUPER_ADMIN') {
              setUser(null);
              localStorage.removeItem('platformbds_user_v3');
              localStorage.removeItem('platformbds_orders_v3');
              return;
            }
            const apiOrders = meRes.data.data.orders || [];
            const apiWishlists = meRes.data.data.user?.wishlists || [];

            // Extract cart items from backend database
            const serverCartItems: CartItem[] = (apiUser.cart?.items || [])
              .filter((it: any) => it.template)
              .map((it: any) => ({
                template: {
                  id: it.template.id,
                  name: it.template.name,
                  slug: it.template.slug,
                  thumbnail: it.template.thumbnail || '',
                  priceBuy: it.template.priceBuy || 499000,
                  priceRentMonthly: it.template.priceRentMonthly || 199000,
                },
                type: 'BUY' as const,
                subdomain: '',
                note: '',
              }));

            // Merge server cart with initial local cart (deduplicating by canonical template code)
            const mergedCartMap = new Map<string, CartItem>();
            serverCartItems.forEach((item) => {
              const code = extractTemplateCode(item.template || item);
              mergedCartMap.set(code, item);
            });
            initialCart.forEach((item) => {
              const code = extractTemplateCode(item.template || item);
              if (code && !mergedCartMap.has(code)) {
                mergedCartMap.set(code, item);
              }
            });
            const mergedCart = Array.from(mergedCartMap.values());

            setUser(apiUser);
            setOrders(apiOrders);
            setWishlists(apiWishlists);
            setCart(mergedCart);

            localStorage.setItem('platformbds_user_v3', JSON.stringify(apiUser));
            localStorage.setItem('platformbds_orders_v3', JSON.stringify(apiOrders));
            localStorage.setItem('platformbds_wishlist_v3', JSON.stringify(apiWishlists));
            localStorage.setItem('platformbds_cart_v3', JSON.stringify(mergedCart));
            localStorage.setItem(`platformbds_user_cart_${apiUser.id}`, JSON.stringify(mergedCart));

            if (mergedCart.length > serverCartItems.length) {
              axios.put(`${API_URL}/api/marketplace/cart`, { items: mergedCart }, { withCredentials: true }).catch(() => {});
            }
          }
        } catch (err: any) {
          // If explicitly unauthorized by backend (401), session is genuinely dead
          if (err?.response?.status === 401) {
            setUser(null);
            setOrders([]);
            setCart([]);
            setWishlists([]);
            localStorage.removeItem('platformbds_user_v3');
            localStorage.removeItem('platformbds_orders_v3');
            localStorage.removeItem('platformbds_cart_v3');
            localStorage.removeItem('platformbds_wishlist_v3');
          }
          // On network errors or timeouts, preserve localStorage cached user state
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
        
        localStorage.removeItem('platformbds_logged_out');
        setUser(loggedUser);
        localStorage.setItem('platformbds_user_v3', JSON.stringify(loggedUser));

        // Capture CSRF token from login response body (cross-domain safe)
        const csrfToken = res.data?.data?.csrfToken;
        if (csrfToken) {
          localStorage.setItem('csrf_token', csrfToken);
        }

        // Tự động đồng bộ lịch sử chat của khách vãng lai nếu có
        try {
          const guestSid = typeof window !== 'undefined' ? localStorage.getItem('AI_GUEST_SESSION_ID') : null;
          if (guestSid && loggedUser?.id) {
            axios.post(`${API_URL}/api/ai/sync-guest-history`, {
              guestSessionId: guestSid,
              userId: loggedUser.id,
            }, { withCredentials: true }).catch(() => {});
          }
        } catch (e) {}

        // Fetch fresh user profile, orders & cart for this user
        try {
          const meRes = await axios.get(`${API_URL}/api/auth/me`, {
            withCredentials: true,
            timeout: 4000,
          });
          if (meRes?.data?.data?.user) {
            const freshUser = meRes.data.data.user;
            const freshOrders = meRes.data.data.orders || [];
            const freshWishlists = meRes.data.data.user?.wishlists || [];

            const serverCartItems: CartItem[] = (freshUser.cart?.items || [])
              .filter((it: any) => it.template)
              .map((it: any) => ({
                template: {
                  id: it.template.id,
                  name: it.template.name,
                  slug: it.template.slug,
                  thumbnail: it.template.thumbnail || '',
                  priceBuy: it.template.priceBuy || 499000,
                  priceRentMonthly: it.template.priceRentMonthly || 199000,
                },
                type: 'BUY' as const,
                subdomain: '',
                note: '',
              }));

            // Merge server cart with current in-memory cart
            const mergedCartMap = new Map<string, CartItem>();
            serverCartItems.forEach((item) => mergedCartMap.set(item.template.slug || item.template.id, item));
            cart.forEach((item) => {
              const key = item.template?.slug || item.template?.id;
              if (key && !mergedCartMap.has(key)) {
                mergedCartMap.set(key, item);
              }
            });
            const mergedCart = Array.from(mergedCartMap.values());

            setUser(freshUser);
            setOrders(freshOrders);
            setWishlists(freshWishlists);
            setCart(mergedCart);

            localStorage.setItem('platformbds_user_v3', JSON.stringify(freshUser));
            localStorage.setItem('platformbds_orders_v3', JSON.stringify(freshOrders));
            localStorage.setItem('platformbds_wishlist_v3', JSON.stringify(freshWishlists));
            localStorage.setItem('platformbds_cart_v3', JSON.stringify(mergedCart));
            localStorage.setItem(`platformbds_user_cart_${freshUser.id}`, JSON.stringify(mergedCart));

            if (mergedCart.length > serverCartItems.length) {
              axios.put(`${API_URL}/api/marketplace/cart`, { items: mergedCart }, { withCredentials: true }).catch(() => {});
            }
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
      const csrfToken = typeof document !== 'undefined' ? (localStorage.getItem('csrf_token') || '') : null;
      const res = await axios.post(`${API_URL}/api/auth/register`, data, {
        timeout: 10000,
        withCredentials: true,
        headers: csrfToken ? { 'x-csrf-token': decodeURIComponent(csrfToken) } : {},
      });

      // Tự động đồng bộ lịch sử chat của khách vãng lai sau khi đăng ký
      if (res.data?.success) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('platformbds_logged_out');
        }
      }
      if (res.data?.success && res.data?.data?.user?.id) {
        try {
          const guestSid = typeof window !== 'undefined' ? localStorage.getItem('AI_GUEST_SESSION_ID') : null;
          if (guestSid) {
            axios.post(`${API_URL}/api/ai/sync-guest-history`, {
              guestSessionId: guestSid,
              userId: res.data.data.user.id,
            }, { withCredentials: true }).catch(() => {});
          }
        } catch (e) {}
      }

      return res.data?.success ?? true;
    } catch (err: any) {
      const serverMessage = err?.response?.data?.error?.message || err?.message;
      throw new Error(serverMessage || 'Đăng ký không thành công. Vui lòng thử lại.');
    }
  };

  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('platformbds_logged_out', 'true');
      localStorage.removeItem('platformbds_user_v3');
      localStorage.removeItem('platformbds_orders_v3');
      localStorage.removeItem('platformbds_wishlist_v3');
      localStorage.removeItem('platformbds_cart_v3');
      localStorage.removeItem('csrf_token');
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('platformbds_user_cart_') || key.startsWith('platformbds_orders_'))) {
          localStorage.removeItem(key);
        }
      }
    }

    setUser(null);
    setOrders([]);
    setWishlists([]);
    setCart([]);

    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, {
        withCredentials: true,
        timeout: 3000,
      });
    } catch (e) {}

    if (typeof window !== 'undefined') {
      window.location.href = '/';
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
    const canonicalCode = extractTemplateCode(templateSlug).toLowerCase();
    
    // Check if current user has an ACTIVE tenant website with this template
    const userTenant = (user as any)?.tenant;
    if (userTenant && (userTenant.status === 'ACTIVE' || !userTenant.status)) {
      const tCode = extractTemplateCode(userTenant.templateSlug || userTenant.template?.slug || userTenant.template || '').toLowerCase();
      if (tCode === canonicalCode) return true;
    }

    // Check user orders: ONLY COMPLETED orders count as purchased/owned!
    // PENDING, WAITING_PAYMENT, PAYMENT_REVIEW are NOT completed yet!
    return orders.some((o) => {
      if (o.status !== 'COMPLETED' && o.fulfillmentStatus !== 'ACTIVE') return false;
      const oCode = extractTemplateCode(o.template?.slug || (o.template as any)?.id || (o as any).productSnapshot?.slug || '').toLowerCase();
      return oCode === canonicalCode;
    });
  };

  const isPendingApproval = (templateSlug: string): boolean => {
    if (!templateSlug) return false;
    const canonicalCode = extractTemplateCode(templateSlug).toLowerCase();

    // Check if user has an order in pending/review status for this template
    return orders.some((o) => {
      if (o.status === 'COMPLETED' || o.status === 'REJECTED' || o.status === 'CANCELLED') return false;
      const oCode = extractTemplateCode(o.template?.slug || (o.template as any)?.id || (o as any).productSnapshot?.slug || '').toLowerCase();
      return oCode === canonicalCode;
    });
  };

  const addToCart = (template: any, type: 'BUY' | 'RENT' | 'BUY_SOURCE' = 'BUY', subdomain?: string, note?: string) => {
    const slug = template.slug || template.id;
    const canonicalCode = extractTemplateCode(template);
    const displayName = formatTemplateDisplayName(template);

    // If template is already owned and active by user
    if (isPurchased(slug)) {
      showToast(`Bạn đã sở hữu mẫu "${displayName}". Bạn có thể sử dụng vĩnh viễn không cần mua lại!`, 'info', {
        label: 'Vào CMS Quản trị',
        onClick: () => {
          const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com';
          if (typeof window !== 'undefined') window.location.href = cmsUrl;
        },
      });
      return;
    }

    // Deduplicate by canonical template code
    const exists = cart.some(item => extractTemplateCode(item.template || item) === canonicalCode);
    if (exists) {
      showToast(`Mẫu "${displayName}" đã có trong giỏ hàng!`, 'info', {
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
        name: displayName,
        slug: canonicalCode,
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
      if (user?.id) {
        localStorage.setItem(`platformbds_user_cart_${user.id}`, JSON.stringify(newCart));
      }
    }
    if (user) {
      syncCartToBackend(newCart);
    }

    showToast(`Đã thêm "${displayName}" vào giỏ hàng!`, 'success', {
      label: 'Xem giỏ hàng',
      onClick: () => {
        if (typeof window !== 'undefined') window.location.href = '/cart';
      },
    });
  };

  const removeFromCart = (templateId: string) => {
    const targetCode = extractTemplateCode(templateId);
    const newCart = cart.filter(item => {
      const itemCode = extractTemplateCode(item.template || item);
      return item.template?.id !== templateId && item.template?.slug !== templateId && itemCode !== targetCode;
    });
    setCart(newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('platformbds_cart_v3', JSON.stringify(newCart));
      if (user?.id) {
        localStorage.setItem(`platformbds_user_cart_${user.id}`, JSON.stringify(newCart));
      }
    }
    if (user) {
      syncCartToBackend(newCart);
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
      if (user?.id) {
        localStorage.setItem(`platformbds_user_cart_${user.id}`, JSON.stringify(newCart));
      }
    }
    if (user) {
      syncCartToBackend(newCart);
    }
  };

  const clearCart = () => {
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('platformbds_cart_v3', JSON.stringify([]));
      if (user?.id) {
        localStorage.setItem(`platformbds_user_cart_${user.id}`, JSON.stringify([]));
      }
    }
    if (user) {
      syncCartToBackend([]);
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
        toggleWishlist,
        isWishlisted,
        isPurchased,
        isPendingApproval,
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


