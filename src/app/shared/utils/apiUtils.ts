export function getApiUrl(): string {
  if (window.location.host.includes('demo')) {
    return 'https://demo-api.henryapp.de/v1';
  } else {
    return 'https://api.henryapp.de/v1';
  }
}

