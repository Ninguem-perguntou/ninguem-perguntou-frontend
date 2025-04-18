export interface AuthUser {
    accountNo: string
    email: string
    username: string
    documentId: string
    exp: number
  }
  
export interface AuthState {
    user: AuthUser | null
    accessToken: string | null
    isAuthenticated: boolean
    setUser: (user: AuthUser | null) => void
    setAuthData: (user: AuthUser, token: string) => void
    clearAuth: () => void
    getToken: () => string | null;
}