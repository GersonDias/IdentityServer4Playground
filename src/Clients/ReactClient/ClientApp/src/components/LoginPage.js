import React from 'react';
import userManager from '../utils/userManager';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.oidc.user,
});

class LoginPage extends React.Component {
    onLoginButtonClick(ev) {
        ev.preventDefault();
        userManager.signinRedirect();
    }

    onLogoutButtonClick(ev) {
        ev.preventDefault();
        userManager.signoutRedirect();
    }

    render() {
        return (
            <div>
                {
                    !this.props.user ? (
                        <button onClick={this.onLoginButtonClick}>
                            Login with IdentityServer!
                        </button>
                    ) : (
                        <button onClick={this.onLogoutButtonClick}>
                            Logout {this.props.user.profile.name}
                        </button>
                    )
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(LoginPage);