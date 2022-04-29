import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { Alert } from 'react-native';

const BASE_URL = 'http://107.20.2.255:3000/api/';
const TIMEOUT = 10000;

const embededClient = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
});

//intercept requests or responses before they are handled
embededClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token && token !== '') {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})


const post = async (path, data) => {
    console.log({ path, method: 'POST', params: data });
    const response = await embededClient.post(path, data);
    return response;
}

const get = async (path, config = {}) => {
    console.log({ path, method: 'GET', params: config ? config.params : undefined });
    const response = await embededClient.get(path, config);
    return response;
}

const patch = async (path, data) => {
    console.log({ path, method: 'PATCH', params: data });
    const response = await embededClient.patch(path, data);
    return response;
}

const put = async (path, data) => {
    console.log({ path, method: 'PUT', params: data });
    const response = await embededClient.put(path, data);
    return response;
}

const del = async (path, config = {}) => {
    console.log({ path, method: 'DELETE', params: config ? config.params : undefined });
    const response = await embededClient.delete(path, config);
    return response;
}

//handle server error base on https response status
const handleServerError = (error) => {
    const { response } = error;
    if (response && response.status >= 400) {
        console.log(response);
        if (response.data) {
            Alert.alert(
                "",
                response.data.message,
                [
                    {
                        text: "OK",
                        style: "cancel"
                    }
                ]
            );
            return {
                error: response.data.error || {},
                __typename: 'ErrorResponse'
            };
        } else {
            return {
                error: {},
                __typename: 'ErrorResponse'
            }
        }
    } else {
        return {
            error: 'Unhandled Error API',
            __typename: 'ErrorResponse'
        };
    }
}

// api request
export const register = async (username, password) => {
    try {
        const response = await post(`auth/signup`, {
            username: username,
            password: password
        });
        return response.data;
    } catch (error) {
        return handleServerError(error);
    }
}
export const loginApp = async (username, password) => {
    try {
        const response = await post('auth/signin', { username, password });

        // AsyncStorage.setItem('accessToken', response.data.accessToken, (err) => {
        //     if (err) {
        //         console.log("App has problem when setItem() to AsyncStorage.");
        //         throw err;
        //     }
        //     console.log("Save accessToken to AsyncStorage.");
        // }).catch((err) => {
        //     console.log("Error when setItem to AsyncStorage is: " + err);
        // });

        return response.data;
    } catch (error) {
        return handleServerError(error);
    }
}


export const updatePassword = async (oldPassword, newPassword, confirmNewPassword, _id) => {
    try {
        if (newPassword === confirmNewPassword) {
            const response = await put(`private/user/${_id}`, {
                'oldPassword': oldPassword,
                'newPassword': confirmNewPassword
            });
            return response.data;
        }
    } catch (error) {
        return handleServerError(error);
    }
}


// room
export const createNewRoom = async (field, value, _id) => {

}

export const getAllRoom = async () => {
    try {
        const response = await get(`room`);
        return response.data;
    } catch (error) {
        return handleServerError(error);
    }
}

export const getOneRoom = async (_id) => {
    try {
        const response = await get(`room/${_id}`);
        return response.data;
    } catch (error) {
        return handleServerError(error);
    }
}

export const getUpdateRoom = async (field, value, _id) => {

}

export const deleteRoom = async (_id) => {
    try {
        const response = await del(`room/${_id}`);
        return response.data;
    } catch (error) {
        return handleServerError(error);
    }
}

export const getRoomType = async () => {
    try {
        const response = await get(`room-types`);
        return response.data;
    } catch (error) {
        return handleServerError(error);
    }
}

// user device
export const createUserDevice = async (field, value, _id) => {

}

export const getAllUserDevice = async () => {
    try {
        const response = await get(`userDevice`);
        return response.data;
    } catch (error) {
        return handleServerError(error);
    }
}

export const getOneUserDevice = async (_id) => {
    try {
        const response = await get(`userDevice/${_id}`);
        return response.data;
    } catch (error) {
        return handleServerError(error);
    }
}

export const getUpdateUserDevice = async (field, value, _id) => {

}

export const deleteUserDevice = async (_id) => {
    try {
        const response = await del(`userDevice/${_id}`);
        return response.data;
    } catch (error) {
        return handleServerError(error);
    }
}

