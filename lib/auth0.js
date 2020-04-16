import { initAuth0 } from '@auth0/nextjs-auth0'

export default initAuth0({
    clientId: process.env.AUTH0_CLIENTID,
    clientSecret: process.env.AUTH0_CLIENTSECRET,
    scope: process.env.AUTH0_SCOPE,
    domain: process.env.AUTH0_DOMAIN,
    redirectUri: process.env.AUTH0_REDIRECTURI,
    postLogoutRedirectUri: process.env.AUTH0_POSTLOGOUTREDIRECTURI,
    session: {
        cookieSecret: process.env.AUTH0_SESSION_COOKIESECRET,
        cookieLifetime: process.env.AUTH0_SESSION_COOKIELIFETIME
    }
})
