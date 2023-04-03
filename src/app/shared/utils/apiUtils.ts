export function getApiUrl(): string {
  let currentUrl = window.location.href;
  if (currentUrl.includes('localhost')) {
    currentUrl = 'https://orderxpay.eu/api';
  }

  return currentUrl;
}
