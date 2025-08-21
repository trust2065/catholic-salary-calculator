
// 將 snake_case 轉成 camelCase
export function snakeToCamel(key: string): string {
  return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// 通用版 toCamelCase
export function toCamelCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(v => (typeof v === 'object' && v !== null ? toCamelCase(v) : v));
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        snakeToCamel(key),
        typeof value === 'object' && value !== null ? toCamelCase(value) : value
      ])
    );
  }
  return obj;
}