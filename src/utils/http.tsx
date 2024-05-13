type inputValue = string | URL | Request
type Options =  RequestInit | undefined
type Timeout = {
    timeout?: number
}
type RequestOptions = {
    timeout?: number
}

class HttpClient {
    private timeout: number = 30000;
    // 默认60秒去取消请求
    private fetchWidthTimeout(url:inputValue,  { signal, timeout, ...options }:Options&Timeout = {}) {
        if(!timeout){
            timeout = this.timeout;
        }
        const controller = new AbortController();
        const promise = fetch(url, { signal: controller.signal, ...options });
        if (signal) signal.addEventListener("abort", () => controller.abort());
        const timer = setTimeout(() => controller.abort(), timeout);
        return promise.finally(() => clearTimeout(timer));
    }

    post(url: inputValue, data: any, options?:RequestOptions&Options): Promise<any> {
        return this.fetchWidthTimeout(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include'
        })
    }

    get(url: inputValue, options?:RequestOptions&Options): Promise<any> {
        return this.fetchWidthTimeout(url, {
            ...options,
            method: 'GET',
            credentials: 'include'
        })
    }

    delete(url: inputValue, options?:RequestOptions&Options): Promise<any> {
        return this.fetchWidthTimeout(url, {
            ...options,
            credentials:'include',
            method: 'DELETE',
        })
    }

    put(url: inputValue, data?: any, options?:RequestOptions&Options): Promise<any> {
        return this.fetchWidthTimeout(url, {
            ...options,
            body: JSON.stringify(data),
            credentials: 'include',
            method:"PUT"
        })
    }
}

export const request = new HttpClient()