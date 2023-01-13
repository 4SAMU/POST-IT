const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SocialApp", () => {
    let socialApp;

    beforeEach(async () => {
        socialApp = await ethers.getContractAt("SocialApp", (await ethers.provider.getSigner(0)).address);
    });

    it("should create a new profile", async () => {
        await socialApp.createProfile("John Doe", "Bio", "imageHash");
        const profile = await socialApp.getProfile((await ethers.provider.getSigner(0)).address);
        expect(profile.name).to.equal("John Doe");
        expect(profile.imageHash).to.equal("imageHash");
        expect(profile.bio).to.equal("Bio");
    });

    it("should edit a profile", async () => {
        await socialApp.createProfile("John Doe", "Bio", "imageHash");
        await socialApp.editProfile("Jane Doe", "New Bio", "newImageHash");
        const profile = await socialApp.getProfile((await ethers.provider.getSigner(0)).address);
        expect(profile.name).to.equal("Jane Doe");
        expect(profile.imageHash).to.equal("newImageHash");
        expect(profile.bio).to.equal("New Bio");
    });

    it("should create a new post", async () => {
        await socialApp.createProfile("John Doe", "Bio", "imageHash");
        await socialApp.createPost("Hello World!", "fileHash");
        const post = await socialApp.getUserPosts((await ethers.provider.getSigner(0)).address);
expect(post.userAddress).to.equal((await ethers.provider.getSigner(0)).address);
expect(post.text).to.equal("Hello World!");
expect(post.fileHash).to.equal("fileHash");
});

it("should edit a post", async () => {
    await socialApp.createProfile("John Doe", "Bio", "imageHash");
    await socialApp.createPost("Hello World!", "fileHash");
    await socialApp.editPost(0, "Goodbye World!");
    const post = await socialApp.getUserPosts((await ethers.provider.getSigner(0)).address);
    expect(post.text).to.equal("Goodbye World!");
});

it("should delete a post", async () => {
    await socialApp.createProfile("John Doe", "Bio", "imageHash");
    await socialApp.createPost("Hello World!", "fileHash");
    await socialApp.deletePost(0);
    const post = await socialApp.getUserPosts((await ethers.provider.getSigner(0)).address);
    expect(post.length).to.equal(0);
});
});