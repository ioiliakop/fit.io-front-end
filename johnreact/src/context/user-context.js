import React from 'react';
import { userInfo } from 'os';

const userContext = React.createContext({
    isLoggedIn: false,
    token: '',
    userInfo: {}
});

export default userContext;