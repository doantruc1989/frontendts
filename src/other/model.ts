import { ReactNode } from "react";

export interface blogs {
    map(arg0: (blog: any) => JSX.Element): import("react").ReactNode;
    id: number,
    image: string,
    content: string,
    title: string,
    littlecontent: string,
    createdAt: Date,
}

export interface categories {
    map(arg0: (category: any) => JSX.Element): import("react").ReactNode;
    id: number,
    image: string,
    path: string,
    category: string,
}

export interface products {
    map(arg0: (product: any) => JSX.Element): import("react").ReactNode;
    id: number,
    image: string,
    productName: string,
    price: number,
    content: string,
}

export interface items {
    quantity: number
}

export interface users {
    map(arg0: (user: any) => JSX.Element): import("react").ReactNode;
    username: string,
    image: string,
    email: string,
}
