function debounce(func: any, wait: any) {
    let timeout: ReturnType<typeof setTimeout>;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export default debounce;