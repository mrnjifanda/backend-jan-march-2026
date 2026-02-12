const generateOTP = (length, type = 'numeric') => {
    const keys = {
        numeric: '0123456789',
        alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    };

    const chars = keys[type] || keys['numeric'];
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return otp;
};

module.exports = {
    generateOTP
};