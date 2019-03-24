import React from 'react';

const userContext = React.createContext({
    isLoggedIn: false,
    token: '',
    userInfo: {},
    setUserContext: () => {}
});

export default userContext;