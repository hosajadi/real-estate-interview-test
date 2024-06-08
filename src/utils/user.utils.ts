import * as crypto from 'crypto';

export const generateVerificationCode = (length: number, numeric = false) => {
    const possible = numeric
        ? '0123456789'
        : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return code;
};
export const comparePasswordHash = async (
    password: string,
    hash: string
): Promise<boolean> => {
    const salt = hash.slice(64);
    const hashPassword = crypto.scryptSync(password, salt, 32).toString('hex');
    return hashPassword === hash.slice(0, 64);
};

/**
 *
 * @param duration  could be 1d, 1h, 1m, 1s
 * @returns {number} timestamp
 */
export const calculateExpirationDate = (duration: string) => {
    const date = new Date();
    const durationUnit = duration.slice(-1);
    const durationValue = parseInt(duration.slice(0, -1));
    switch (durationUnit) {
        case 'd':
            date.setUTCDate(date.getUTCDate() + durationValue);
            break;
        case 'h':
            date.setUTCHours(date.getUTCHours() + durationValue);
            break;
        case 'm':
            date.setUTCMinutes(date.getUTCMinutes() + durationValue);
            break;
        case 's':
            date.setUTCSeconds(date.getUTCSeconds() + durationValue);
            break;
        default:
            throw new Error('Invalid duration unit');
    }
    return date.getTime();
};
