/// <reference types="node" />
import type fs from "fs";
export declare type Callback<T = any> = (result?: T) => void;
export declare type Documents = Files | Folders;
export declare type ItemStats = (keyof fs.Stats)[];
export declare enum Type {
    File = "file",
    Folder = "folder"
}
export declare type Folders = {
    size?: number;
    sizeFormatted?: string;
    path: string;
    isSymbolicLink?: boolean;
    children: any[];
    type?: Type.Folder;
    depth?: number;
    name?: string;
    properties?: {
        [key: string]: number;
    };
};
export declare type Files = {
    size?: number;
    sizeFormatted?: string;
    path: string;
    isSymbolicLink?: boolean;
    extension?: string;
    type?: Type.File;
    depth?: number;
    name?: string;
    properties?: {
        [key: string]: number;
    };
};
export declare type Options = {
    showSymbolicLink?: boolean;
    showSize?: boolean;
    showType?: boolean;
    showExtension?: boolean;
    showDepth?: boolean;
    showName?: boolean;
    stats?: ItemStats;
};
export declare class Util {
    constructor();
    static formatByte(bytes: number): string;
}
