import Cookies from 'universal-cookie';
import cookie from '../../config/cookie'

export const setCookie = (name, value) => {

    try {
        const cookies = new Cookies();
        cookies.set(name, value, { 
            path: cookie.path,
        });

    } catch (err) {
        return undefined;
    }
};

export const getCookie = (name) => {

    try {
        const cookies = new Cookies();
        return cookies.get(name);

    } catch (err) {
        return undefined;
    }
};

export const getAll = () => {

    try {
        const cookies = new Cookies();
        const allCookies = cookies.getAll({ 
            path: cookie.path,
        });
        return allCookies

    } catch (err) {
        return undefined;
    }
};

export const removeCookie = (name) => {

    try {
        const cookies = new Cookies();
        cookies.remove(name, { 
            path: cookie.path,
        });

    } catch (err) {
        return undefined;
    }
};