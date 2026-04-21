export const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? '/portfolio' : '';
};

export const withBase = (path: string) => {
  const base = getBasePath();
  if (!base) return path;
  
  // Remove leading dot if present (e.g., ./font.ttf -> /font.ttf)
  let normalizedPath = path;
  if (normalizedPath.startsWith('./')) {
    normalizedPath = normalizedPath.substring(1);
  }
  
  // Ensure path starts with a slash
  if (!normalizedPath.startsWith('/')) {
    normalizedPath = '/' + normalizedPath;
  }
  
  // Avoid double prefixing
  if (normalizedPath.startsWith(base)) {
    return normalizedPath;
  }
  
  return `${base}${normalizedPath}`;
};

// modifed by shaurya
