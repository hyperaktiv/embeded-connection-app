import React, { createContext } from 'react';
import { AuthStore } from './authStore';

class RootStore {
    constructor() {
        this.authStore = new AuthStore(this);
    }
}

export const StoreContext = createContext(new RootStore());


export const StoreProvider = ({ children, store }) => {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}