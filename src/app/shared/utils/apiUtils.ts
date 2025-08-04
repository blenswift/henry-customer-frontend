export function getApiUrl(): string {
  return (window as any).API_URL + '/api' || '';
}
