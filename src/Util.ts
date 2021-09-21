import type fs from "fs";

export type Callback<T = any> = (result?: T) => void;
export type Documents = Files | Folders;
export type ItemStats = (keyof fs.Stats)[];
export enum Type {
    File = "file",
    Folder = "folder"
}


export type Folders = {
    size?: number,
    sizeFormatted?: string,
    path: string,
    isSymbolicLink?: boolean,
    children: any[],
    type?: Type.Folder,
    depth?: number,
    name?: string,
    properties?: { [key: string]: number }
}



export type Files = {
    size?: number,
    sizeFormatted?: string,
    path: string,
    isSymbolicLink?: boolean,
    extension?: string,
    type?: Type.File,
    depth?: number,
    name?: string,
    properties?: { [key: string]: number }
}

export type Options = {
    showSymbolicLink?: boolean,
    showSize?: boolean,
    showType?: boolean,
    showExtension?: boolean,
    showDepth?: boolean,
    showName?: boolean,
    stats?: ItemStats
}

export class Util {
    constructor() {

    }
    //https://stackoverflow.com/questions/1242266/converting-bytes-to-gb-in-c
    //Changed it to work with javascript/typescript
    public static formatByte(bytes: number): string {
        const suffix: string[] = ["B", "KB", "MB", "GB", "TB"];

        let dblSByte: number = bytes;
        let i: number;
        for (i = 0; i < suffix.length && bytes >= 1024; i++, bytes /= 1024) {
            dblSByte = bytes / 1024.0;
        }
        return Math.round(dblSByte) + " " + suffix[i];
    }
}
