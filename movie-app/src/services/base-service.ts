import { GenericResponse } from "../models/index";


const request = <T, K>(): (
    requestPath: string,
    method: string,
    headers: {},
    payload: K
) => Promise<GenericResponse<T>> => {
    return async (
        requestPath: string,
        method: string,
        headers: {},
        payload: K
    ) => {
        const baseUrl: string = process.env.REACT_APP_BASE_API_URL|| '';
        const authorizationToken: string = process.env.REACT_APP_API_TOKEN || '';
        const body = payload ? JSON.stringify(payload) : null;
        return new Promise<GenericResponse<T>>((resolve) => {
            fetch(`${baseUrl}/${requestPath}`, {
                method,
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authorizationToken}`,
                ...headers
                },
                body
            })
                .then(async (res: Response) => {
                    if (!res.ok) {
                        throw JSON.stringify(await res.json());
                    }
                    return res.json();
                })
                .then((result) => {
                    resolve(new GenericResponse(result, true, null as any));
                }, (error) => {
                    const errorMessage = JSON.parse(error).status_message;
                    resolve(new GenericResponse(null as any, false, errorMessage));
                }).catch((error) => {
                    const errorMessage = JSON.parse(error).status_message;
                    resolve(new GenericResponse(null as any, false, errorMessage));
                });
        });
    }
};

export const get = <T>(): (
    requestPath: string, headers?: {}
) => Promise<GenericResponse<T>> => {
    const _request = request<T, null>();
    return async (requestPath: string, headers: {} = {}) => {
        return await _request(requestPath, 'GET', headers, null);
    }
};

export const post = <T, K>(): (
    requestPath: string, payload: K, headers?: {}
) => Promise<GenericResponse<T>> => {
    const _request = request<T, K>();
    return async (requestPath: string, payload: K, headers: {} = {}) => {
        return await _request(requestPath, 'POST', headers, payload);
    }
};

export const put = <T, K>(): (
    requestPath: string, payload: K, headers?: {}
) => Promise<GenericResponse<T>> => {
    const _request = request<T, K>();
    return async (requestPath: string, payload: K, headers: {} = {}) => {
        return await _request(requestPath, 'PUT', headers, payload);
    }
};

export const _delete = <T>(): (
    requestPath: string, headers?: {}
) => Promise<GenericResponse<T>> => {
    const _request = request<T, null>();
    return async (requestPath: string, headers: {} = {}) => {
        return await _request(requestPath, 'DELETE', headers, null);
    }
};