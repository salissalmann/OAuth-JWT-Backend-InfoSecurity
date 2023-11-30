import { Header, ServerResponse } from "@/interfaces/response.interface";

export class ApiResponse implements ServerResponse {
    public status: string;
    public header: Header;
    public body: any;
    public message: string;

    constructor(status: string, header: Header, body: any, message: string) {
        this.status = status;
        this.header = header;
        this.body = body;
        this.message = message;
    }

    toJSON() {
        return {
            status: this.status,
            header: this.header,
            message: this.message,
            body: this.body,
        };
    }

    static success(header: Header, body: any, message: string = 'Success') {
        return new ApiResponse('success', header, body, message);
    }

    static error(header: Header, body: any = null, message: string = 'Error') {
        return new ApiResponse('error', header, body, message);
    }
}