export function getApiUrl(): string {
  const currentUrl = window.location.origin;
  if (window.location.host.includes('localhost')) {
    return 'https://www.dev.orderxpay.eu/api';
  }
  return currentUrl + '/api';
}
