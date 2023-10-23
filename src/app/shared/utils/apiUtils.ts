export function getApiUrl(): string {
  if (window.location.host.includes('localhost')) {
    return 'https://api.dev.henryapp.de/v1';
  } else if (window.location.host.includes('dev')) {
    return 'https://api.dev.henryapp.de/v1';
  } else if (window.location.host.includes('demo')) {
    return 'https://api.demo.henryapp.de/v1';
  } else if (window.location.host.includes('staging')) {
    return 'https://api.staging.henryapp.de/v1';
  } else {
    return 'https://api.henryapp.de/v1';
  }
}
