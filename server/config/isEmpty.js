function isEmpty (value) {
    if (value == null) return true; // Checks for null or undefined
    if (typeof value === 'object') return Object.keys(value).length === 0;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    return false;
};

module.exports = isEmpty;