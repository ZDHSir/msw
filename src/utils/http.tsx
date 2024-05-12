class HttpClient {
    private baseURL: string;
    private mode: string;
    private http = fetch
    constructor(baseURL: string, mode: string) {
        this.baseURL = baseURL;
        this.mode = mode;
    }
    post(url: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {})
    }
    get(url: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {})
    }

    delete(url: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {})
    }

    put(url: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {})
    }
}

export const request = new HttpClient("/api", import.meta.env.MODE)