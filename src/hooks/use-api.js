import { useCallback, useState } from "react";

export const IDLE = Symbol('IDLE');
export const PENDING = Symbol('PENDING');
export const SUCCESS = Symbol('SUCCESS');
export const ERROR = Symbol('ERROR');

export const STATUS = {
    IDLE,
    PENDING,
    SUCCESS,
    ERROR,
}

export const useApi = (fn) => {
    const [status, setStatus] = useState(IDLE);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    if (typeof (fn) !== 'function') {
        throw Error('fn argument has much a function')
    }

    const exce = useCallback(async (...args) => {
        setStatus(PENDING);
        setError(null);
        setData(null);
        try {
            const data = await fn(...args);
            setData(data)
            setStatus(SUCCESS);
        } catch (error) {
            console.log('error 1', error);
            console.log('error 2', error.response?.data?.error);
            setStatus(ERROR);
            setError({ ...error.response?.data?.error});
        }
    }, [fn])

    return {
        exce,
        data,
        status,
        error,
        setData,
    }
}

