import { AuthState } from '@/utils/IAuthUser'
import { create } from 'zustand'

// Nome da chave do cookie
const ACCESS_TOKEN_KEY = 'auth_token'

export const useAuthStore = create<AuthState>()((set, get) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  return {
    user: null,
    accessToken: token,
    isAuthenticated: !!token,

    setUser: (user) => set({ user }),

    setAuthData: (user, token) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, token)
      set({
        user,
        accessToken: token,
        isAuthenticated: true,
      })
    },

    clearAuth: () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      })
    },

    getToken: () => get().accessToken,
  }
})

// Hook de conveniência para acessar o store
export const useAuth = () => useAuthStore()