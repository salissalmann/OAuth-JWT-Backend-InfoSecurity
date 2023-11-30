
export interface Header {
    error: number;
    errorCode: number | null;
    errorMessage: string | null;
}

export interface ServerResponse {
    status: string;
    header: Header;
    body: object;
    message: string;
}