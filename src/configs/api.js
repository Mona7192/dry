// configs/api.js
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// اگر بک‌اند جداگانه داری:
// export const API_BASE_URL = 'http://localhost:8000/api';
// export const API_BASE_URL = 'https://your-backend.com/api';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    VERIFY: `${API_BASE_URL}/auth/verify`,
};

// Helper function برای API calls
export const apiRequest = async (url, options = {}) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    };

    const response = await fetch(url, {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    });

    return response;
};