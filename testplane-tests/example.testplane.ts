
// describe("test", () => {
//     it("example", async ({browser}) => {
//         await browser.url("https://github.com/gemini-testing/testplane");

//         await expect(browser.$(".f4.my-3")).toHaveText("Testplane (ex-hermione) browser test runner based on mocha and wdio");
//     });
// });



describe("test2", () => {
    it("example", async ({browser}) => {
        await browser.url("http://localhost:3000/hw/store");

        await expect(browser.$(".Application-Brand")).toHaveText("Kogtetochka store");
    });
});

