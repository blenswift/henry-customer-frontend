export function getApiUrl(): string {
  const currentUrl = window.location.pathname;
  if (window.location.host.includes('localhost')) {
    return 'https://orderxpay.eu/api';
  }

  return 'api' + currentUrl;
}
