import React from 'react';
import { GoogleLogout } from 'react-google-login';



const clientId =
    '388386057528-6cn15hut0f1o5olc5ltuolfj1ea8j2v6.apps.googleusercontent.com';

function Logout() {
    const onSuccess = () => {
        console.log('Logout made successfully');
        alert('Logout made successfully ✌');

    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );

}

export default Logout;