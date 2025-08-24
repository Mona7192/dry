// utils/jwt.ts
export function isTokenExpired(token: string | null): boolean {
    if (!token) return true;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);

        // Add some buffer (5 minutes) to consider token expired before actual expiry
        const buffer = 5 * 60; // 5 minutes in seconds

        return payload.exp < (now + buffer);
    } catch (error) {
        console.error('Invalid token format:', error);
        return true;
    }
}

export function getTokenPayload(token: string | null): any {
    if (!token) return null;

    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
        console.error('Invalid token format:', error);
        return null;
    }
}

export function isTokenValid(token: string | null): boolean {
    if (!token) return false;

    try {
        const parts = token.split('.');
        if (parts.length !== 3) return false;

        const payload = JSON.parse(atob(parts[1]));
        const now = Math.floor(Date.now() / 1000);

        return payload.exp > now;
    } catch (error) {
        return false;
    }
}

export function getTokenTimeLeft(token: string | null): number {
    if (!token) return 0;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);

        return Math.max(0, payload.exp - now);
    } catch (error) {
        return 0;
    }
}