import auth0 from '../../lib/auth0'

const auth0return = async (request, response) => {
    await auth0.handleCallback(request, response, { redirectTo: '/app' })
}

export default auth0return
