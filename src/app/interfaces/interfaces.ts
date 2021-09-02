export interface AuthResponse{
    ok:    boolean;
    uid?:   string;
    name?:  string;
    surnames?: string;
    email?: string;
    token?: string;
    msg?: string;
}

export interface Usuario {
    uid: string;
    name: string;
    surnames: string;
    email: string;
}