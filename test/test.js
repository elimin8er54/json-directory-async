const { Scanner } = require("../src/dist");
const { expect } = require("chai");
const paths = require("path");

describe("json-directory-async", () => {
  it("should return an Object", async () => {
    const scan = new Scanner();
    const tree = await scan.scan("./test/tree");

    expect(tree).to.be.an("object");
  });

  it("should return a default object due to file permission errors", async () => {
    const scan = new Scanner();
    const tree = await scan.scan("./test/tree/AFolder/Permissions");
    const defaultObject = {
      path: paths.normalize("./test/tree/AFolder/Permissions"),
      size: 0,
    };

    expect(tree).to.deep.equals(defaultObject);
  });

  it("should return a Promise", async () => {
    const scan = new Scanner();
    const tree = scan.scan("./test/tree");

    expect(tree).to.be.an("Promise");
  });

  it("should return all stats", async () => {
    const scan = new Scanner();
    const tree = await scan.scan("./test/tree");

    expect(tree).to.not.have.key("stats");
  });

  it("should have symbolic link", async () => {
    const scan = new Scanner({ showSymbolicLink: true });
    const tree = await scan.scan("./test/tree/AFolder/wowsymlink.js");

    expect(tree).to.have.property("isSymbolicLink", true);
  });

  it("should return same object", async () => {
    const scan = new Scanner({ showSymbolicLink: true });
    const path = paths.normalize("./test/tree/WouldBeEmptyIfGItLet");
    const tree = await scan.scan(path);

    const expectedResult = {
      path: paths.normalize("test/tree/WouldBeEmptyIfGItLet"),
      children: [
        {
          path: paths.normalize("test/tree/WouldBeEmptyIfGItLet/.gitkeep"),
          size: 0,
          sizeFormatted: "0 B",
          extension: "",
          type: "file",
          name: ".gitkeep",
          isSymbolicLink: false,
        },
      ],
      size: 0,
      sizeFormatted: "0 B",
      type: "folder",
      name: "WouldBeEmptyIfGItLet",
      isSymbolicLink: false,
    };

    expect(tree).to.deep.equals(expectedResult);
  });

  it("should have all stat keys", async () => {
    const scan = new Scanner({
      stats: [
        "dev",
        "mode",
        "nlink",
        "uid",
        "gid",
        "rdev",
        "blksize",
        "ino",
        "size",
        "blocks",
        "atimeMs",
        "mtimeMs",
        "ctimeMs",
        "birthtimeMs",
        "atime",
        "mtime",
        "ctime",
        "birthtime",
      ],
    });
    const tree = await scan.scan("./test/tree");

    expect(tree.properties).to.include.all.keys(
      "dev",
      "mode",
      "nlink",
      "uid",
      "gid",
      "rdev",
      "blksize",
      "ino",
      "size",
      "blocks",
      "atimeMs",
      "mtimeMs",
      "ctimeMs",
      "birthtimeMs",
      "atime",
      "mtime",
      "ctime",
      "birthtime"
    );
  });

  it("should execute the callback 11 times", async () => {
    let callbackCount = 0;
    const TOTAL = 11;

    const scan = new Scanner({ showSymbolicLink: true });
    const tree = await scan.scan("./test/tree", (item) => {
      callbackCount++;
    });

    expect(callbackCount).to.equal(TOTAL);
  });
});
