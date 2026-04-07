import axios from "axios";
import axiosClient from "../utils/axiosClient";
export class BaseService<T> {
    protected _baseUrl: string;
    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    async getAll(): Promise<T[]> {
        try {
            const response = await axiosClient.get<T[]>(this._baseUrl);
            return response.data;
        } catch (err: unknown) {
            this.handleError(err);
            throw err;
        }
    }

    async getById(id: string): Promise<T> {
        try {
            const response = await axiosClient.get<T>(`${this._baseUrl}/${id}`);
            return response.data;
        } catch (err: unknown) {
            this.handleError(err);
            throw err;
        }
    }

    async create(item: T): Promise<void> {
        try {
            const response = await axiosClient.post<T>(this._baseUrl, item);
            console.log(response.data);
            console.log("Successfully created");
        } catch (err: unknown) {
            this.handleError(err);
            throw err;
        }
    }

    async update(item: T): Promise<void> {
        try {
            const response = await axiosClient.put<T>(`${this._baseUrl}`, item);
            console.log(response.data);
            console.log("Successfaully updated");
        } catch (err: unknown) {
            this.handleError(err);
            throw err;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await axiosClient.delete(`${this._baseUrl}/${id}`);
            console.log("Successfully deleted");
        } catch (err: unknown) {
            this.handleError(err);
            throw err;
        }
    }

    protected handleError(err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error("API Error:", err.response?.data?.message || err.message);
        } else if (err instanceof Error) {
            console.error("Unexpected Error:", err.message);
        } else {
            console.error("Unknown Error:", err);
        }
    }
}