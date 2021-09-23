import * as fs from 'fs';
import paths from "path";
import { Util, Callback, Documents, ItemStats, Options, Type } from "./Util";

//Thank you Typescript for forcing me to reformat the code properly with all the errors it gives me.

export default class Scanner {

    showSymbolicLink: boolean = false;
    showDepth: boolean = false;
    showSize: boolean = true;
    showType: boolean = true;
    showName: boolean = true;
    showExtension: boolean = true;
    itemStats: ItemStats = [];

    constructor(options?: Options) {
        if (options) {
            if (options.showSymbolicLink !== undefined)
                this.showSymbolicLink = options.showSymbolicLink;
            if (options.showSize !== undefined)
                this.showSize = options.showSize;
            if (options.showType !== undefined)
                this.showType = options.showType;
            if (options.showExtension !== undefined)
                this.showExtension = options.showExtension;
            if (options.showDepth !== undefined)
                this.showDepth = options.showDepth;
            if (options.showName !== undefined)
                this.showName = options.showName;
            if (options.stats)
                this.itemStats = options.stats

        }
    }

    /**
     * This is a proxy function so that the user does not have 
     * to worry about passing the starting depth for the recursive function
     * @param  {String} path
     * @return {Folders | Files}
     */
    public async scan(path: string, currentProgress?: Callback<Documents>): Promise<Documents> {
        let depth = 1;
        return this.scans(path, depth, currentProgress);
    }

    /**
     * Recurseivly get files and folders as a json object
     * Should be called by the scan function
     * @param  {String} path
     * @param  {number} depth
     * @return {Folders | Files}
     */
    private async scans(path: string, depth: number, currentProgress?: Callback<Documents>): Promise<Documents> {

        let item: Documents;
        let stats: fs.Stats;
        const defaultReturn = { path: paths.normalize(path), size: 0 };
        try {
            stats = await fs.promises.stat(paths.join(path));
        }
        catch (e: any) {
            //I return an error code with a size of 0 because if I return null then there would be no size to calculate.
            //Which would then cause an error.
            return defaultReturn;
        }

        if (stats.isDirectory()) {
            item = { path: "", children: [] };
            let dir: string[];

            try {
                dir = await fs.promises.readdir(path);
            } catch (e: any) {
                return defaultReturn;
            }

            item.path = paths.normalize(path);
            item.children = await Promise.all(dir.map((child) => { return this.scans(path + paths.sep + child, depth + 1, currentProgress) }));

            const fullSize = item.children.reduce((previousValue, currentValue) => previousValue + currentValue.size, 0);
            if (this.showSize) {
                item.size = fullSize;
                item.sizeFormatted = Util.formatByte(fullSize);
            }
            if (this.showDepth) {
                item.depth = depth;
            }
            if (this.showType) {
                item.type = Type.Folder;
            }
            if (this.showName) {
                item.name = paths.basename(path);
            }
        } else if (stats.isFile()) {

            item = { path: "" }

            item.path = paths.normalize(path);
            if (this.showSize) {
                item.size = stats.size;
                item.sizeFormatted = Util.formatByte(stats.size);
            }

            if (this.showExtension) {
                item.extension = paths.extname(path);
            }
            if (this.showDepth) {
                item.depth = depth;
            }
            if (this.showType) {
                item.type = Type.File;
            }
            if (this.showName) {
                item.name = paths.basename(path);
            }

        } else {
            //Dummy item incase a check fails. But this should not be called ever unless someone makes a mistake.
            //It also keeps Typescript happy.
            item = { path: "Error", size: 0 }
        }


        if (this.itemStats) {
            this.itemStats.forEach((stat: string) => {
                if (!item.properties) {
                    item.properties = {};
                }
                item.properties[stat] = (stats as any)[stat];
            });
        }

        if (this.showSymbolicLink) {
            let lstats: fs.Stats;
            try {
                lstats = await fs.promises.lstat(paths.join(path));
            }
            catch (e: any) {
                //I return an error code with a size of 0 because if I return null then there would be no size to calculate.
                //Which would then cause an error.
                return defaultReturn;
            }
            item.isSymbolicLink = lstats.isSymbolicLink();

        }
        if (currentProgress) {
            currentProgress(item);
        }

        return item;
    }

}
