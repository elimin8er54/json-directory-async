import { Callback, Documents, ItemStats, Options } from "./Util";
export default class Scanner {
    showSymbolicLink: boolean;
    showDepth: boolean;
    showSize: boolean;
    showType: boolean;
    showName: boolean;
    showExtension: boolean;
    itemStats: ItemStats;
    constructor(options?: Options);
    /**
     * This is a proxy function so that the user does not have
     * to worry about passing the starting depth for the recursive function
     * @param  {String} path
     * @return {Folders | Files}
     */
    scan(path: string, currentProgress?: Callback<Documents>): Promise<Documents>;
    /**
     * Recurseivly get files and folders as a json object
     * Should be called by the scan function
     * @param  {String} path
     * @param  {number} depth
     * @return {Folders | Files}
     */
    private scans;
}
