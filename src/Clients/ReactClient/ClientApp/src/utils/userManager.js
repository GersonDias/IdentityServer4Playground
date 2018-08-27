import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
    client_id: 'react',
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
    response_type: 'code id_token token',
    scope: 'openid profile ReactWebApi',
    authority: 'http://localhost:5000',
    silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loaduserInfo: true,
    grandType: 'hybrid'
}

const userManager = createUserManager(userManagerConfig);

export default userManager;