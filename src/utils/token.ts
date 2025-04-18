import { AuthUser } from "./IAuthUser"

export const decodeToken = (token: string): AuthUser => {
    try {
        const payload = token.split('.')[1];
        
        // Corrigir Base64Url para Base64 padrão
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

        // Adicionar padding se necessário
        const paddedBase64 = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');

        const decoded = atob(paddedBase64);
        return JSON.parse(decoded);
    } catch (error) {
        console.error('Failed to decode token:', error);
        throw new Error('Invalid token');
    }
};
