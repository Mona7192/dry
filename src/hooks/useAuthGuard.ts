// hooks/useAuthGuard.ts
import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { isTokenExpired } from '@/utils/jwt';

interface UseAuthGuardOptions {
    redirectToModal?: boolean; // Show modal instead of redirecting
    skipAutoCheck?: boolean; // Skip automatic token checking on mount
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
    const { redirectToModal = true, skipAutoCheck = false } = options;

    const {
        isAuthenticated,
        user,
        openAuthModal,
        logout,
        checkAuthStatus
    } = useUserStore();

    // Check authentication status on mount
    useEffect(() => {
        if (!skipAutoCheck) {
            checkAuthentication();
        }
    }, [skipAutoCheck]);

    const checkAuthentication = async (): Promise<boolean> => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        // No token found
        if (!token) {
            if (isAuthenticated) {
                logout(); // Clear invalid state
            }
            if (redirectToModal) {
                openAuthModal('login');
            }
            return false;
        }

        // Token expired
        if (isTokenExpired(token)) {
            logout();
            if (redirectToModal) {
                openAuthModal('login');
            }
            return false;
        }

        // If we have a token but no user data, verify with backend
        if (!isAuthenticated || !user) {
            const isValid = await checkAuthStatus();
            if (!isValid && redirectToModal) {
                openAuthModal('login');
            }
            return isValid;
        }

        return true;
    };

    const requireAuth = async (): Promise<boolean> => {
        const isValid = await checkAuthentication();
        return isValid;
    };

    const makeAuthenticatedRequest = async (
        url: string,
        options: RequestInit = {}
    ): Promise<Response | null> => {
        // Check auth before making request
        const isValid = await requireAuth();
        if (!isValid) {
            throw new Error('Authentication required');
        }

        const token = localStorage.getItem('token');

        // Add auth headers
        const authenticatedOptions: RequestInit = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, authenticatedOptions);

            // Handle auth errors
            if (response.status === 401 || response.status === 302) {
                logout();
                if (redirectToModal) {
                    openAuthModal('login');
                }
                throw new Error('Authentication expired');
            }

            return response;
        } catch (error) {
            console.error('Authenticated request failed:', error);
            throw error;
        }
    };

    return {
        isAuthenticated,
        user,
        checkAuthentication,
        requireAuth,
        makeAuthenticatedRequest,
        openAuthModal: () => openAuthModal('login'),
    };
};