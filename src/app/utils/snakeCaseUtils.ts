
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


// 將 camelCase 字串轉成 snake_case
function camelToSnake(key: string): string {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase();
}

export function toSnakeCase<T>(obj: T): T {
  if (Array.isArray(obj)) {
    // 陣列情況，遞迴每個元素
    return obj.map(v =>
      v && typeof v === 'object' ? toSnakeCase(v) : v
    ) as unknown as T;
  } else if (obj && typeof obj === 'object') {
    // 物件情況
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        camelToSnake(key),
        value && typeof value === 'object' ? toSnakeCase(value) : value
      ])
    ) as T;
  }
  return obj;
}