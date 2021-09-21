
const { Scanner } = require('../src/dist');
const { expect } = require('chai');
const paths = require('path');

describe('json-directory-async', () => {

    it('should return an Object', async () => {
        const scan = new Scanner();
        const tree = await scan.scan("./test/tree");

        expect(tree).to.be.an('object');


        console.log(JSON.stringify(tree));
    });

    it('should return a Promise', async () => {
        const scan = new Scanner();
        const tree = scan.scan("./test/tree");

        expect(tree).to.be.an('Promise');
    });


    it('should return all stats', async () => {
        const scan = new Scanner();
        const tree = await scan.scan("./test/tree");

        expect(tree).to.not.have.key("stats");
    });


    it('should have symbolic link', async () => {
        const scan = new Scanner({ showSymbolicLink: true });
        const tree = await scan.scan("./test/tree/AFolder/symlink");

        expect(tree).to.have.property("isSymbolicLink", true);
    });

    it('should return dummy object with size 0 and path', async () => {
        const scan = new Scanner({ showSymbolicLink: true });
        const path = paths.normalize("./test/tree/EmptyFolder");
        const tree = await scan.scan(path);

        expect(tree).to.have.property("size", 0);
        expect(tree).to.have.property("path", path);
    });

    it('should have all stat keys', async () => {
        const scan = new Scanner({
            stats: ['dev',
                'mode',
                'nlink',
                'uid',
                'gid',
                'rdev',
                'blksize',
                'ino',
                'size',
                'blocks',
                'atimeMs',
                'mtimeMs',
                'ctimeMs',
                'birthtimeMs',
                'atime',
                'mtime',
                'ctime',
                'birthtime']
        });
        const tree = await scan.scan("./test/tree");

        expect(tree.properties).to.include.all.keys('dev',
            'mode',
            'nlink',
            'uid',
            'gid',
            'rdev',
            'blksize',
            'ino',
            'size',
            'blocks',
            'atimeMs',
            'mtimeMs',
            'ctimeMs',
            'birthtimeMs',
            'atime',
            'mtime',
            'ctime',
            'birthtime');

    });

    it('should execute the callback 12 times', async () => {

        let callbackCount = 0;
        const TOTAL = 12;

        const scan = new Scanner({ showSymbolicLink: true });
        const tree = await scan.scan("./test/tree", (item) => {
            callbackCount++;
        });

        expect(callbackCount).to.equal(TOTAL);
    });

});




