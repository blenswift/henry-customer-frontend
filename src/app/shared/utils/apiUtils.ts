export function getApiUrl(): string {
  const currentUrl = window.location.origin;
  if (window.location.host.includes('localhost')) {
    return 'https://api.dev.henryapp.de/v1';
  }
  return currentUrl + '/v1';
}
