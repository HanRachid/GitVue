const clientId = process.env.VITE_CLIENT_ID;
const clientSecret = process.env.VITE_CLIENT_SECRET;

/**
 *
 * Get access code
 *
 */
export function getAccessCode() {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get('code');

  return codeParam;
}

/**
 * get the authenticated user's session code url to fetch. Used to check if user is authenticated.
 */
export function getSessionCodeUrl(clientId, clientSecret, accessCode) {
  if (accessCode) {
    const params =
      '?client_id=' +
      clientId +
      '&client_secret=' +
      clientSecret +
      '&code=' +
      accessCode;

    return 'https://github.com/login/oauth/access_token' + params;
  }
  return null;
}

/**
 * Creates new access token for current session
 */
export async function getSession(url) {
  const getSession = await fetch(url);

  const sessionResponse = await getSession.text();
  const sessionToken = sessionResponse.split('&')[0].split('access_token=')[1];
  return sessionToken;
}

/**
 * Redirect user to Github OAuth, callback redirect is set in OAuth App settings
 */
export async function githubOauth(clientId) {
  window.location.assign(
    'https://github.com/login/oauth/authorize?client_id=' + clientId
  );
}
