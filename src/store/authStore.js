import { action, makeAutoObservable, observable } from 'mobx';

//observable defines a trackable field that stores the state.
//action marks a method as action that will modify the state.

class AuthStore {

    @observable auth = {};
    @observable user = {};

    constructor() {
        makeObservable(this)
    }

    @action saveAuth = (auth) => {
        this.auth = auth;
    }

    @action saveUser = (user) => {
        this.user = user;
    }

    @action resetAll = () => {
        this.auth = null;
        this.user = null;
    }
}

export default AuthStore;