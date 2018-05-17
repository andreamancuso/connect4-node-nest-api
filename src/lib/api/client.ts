import axios, {AxiosResponse, AxiosError} from 'axios';
import {APIClientConf} from "../../types";

class APIClient {
    private conf: APIClientConf;

    constructor(conf: APIClientConf) {
        this.conf = conf;
    }

    get<T>(path: string): Promise<T> {
        return new Promise((resolve, reject) => {
            const {endpoints: {base: baseEndpoint}, timeout} = this.conf;

            axios.get<T>(`${baseEndpoint}${path}`, {timeout})
            .then((response: AxiosResponse<T>) => resolve(response.data))
            .catch(this.handleError(reject));
        });
    }

    post(path: string, body?: any): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
            const {endpoints: {base: baseEndpoint}, timeout} = this.conf;

            axios.post(`${baseEndpoint}${path}`, body, {timeout})
            .then((response: AxiosResponse) => resolve(response))
            .catch(this.handleError(reject));
        });
    }

    put(path: string, body?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const {endpoints: {base: baseEndpoint}, timeout} = this.conf;

            axios.put(`${baseEndpoint}${path}`, body, {timeout})
            .then((response: AxiosResponse) => resolve())
            .catch(this.handleError(reject));
        });
    }

    handleError(reject: Function) {
        return function (error: AxiosError) {
            if (error.response) {
                reject(error.response.data);
            } else {
                // Something happened in setting up the request that triggered an Error
                reject(`Error: ${error.message}`);
            }
        };
    }
}

export default APIClient;
