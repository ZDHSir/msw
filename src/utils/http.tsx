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

    post(url: inputValue, options?:RequestOptions&Options): Promise<any> {
        return this.fetchWidthTimeout(url, {
            credentials: 'include',
            ...options,
            method: 'POST',
        })
    }

    get(url: inputValue, options?:RequestOptions&Options): Promise<any> {
        return this.fetchWidthTimeout(url, {
            credentials: 'include',
            ...options,
            method: 'GET',
        })
    }

    delete(url: inputValue, options?:RequestOptions&Options): Promise<any> {
        return this.fetchWidthTimeout(url, {
            credentials:'include',
            ...options,
            method: 'DELETE',
        })
    }

    put(url: inputValue, options?:RequestOptions&Options): Promise<any> {
        return this.fetchWidthTimeout(url, {
            credentials: 'include',
            ...options,
            method:"PUT"
        })
    }
}

export const request = new HttpClient()