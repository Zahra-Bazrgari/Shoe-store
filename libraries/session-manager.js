import { tokenName } from "./constants"

export const setSessionToken = (token) => {
    localStorage.setItem(tokenName, token);
}

export const getSessionToken = () => {
    return localStorage.getItem(tokenName);
}

export const removeSessionToken = () => {
    localStorage.removeItem(tokenName)
}