export default {
    gridUrl: "http://localhost:4444/wd/hub",
    baseUrl: "http://localhost",
    pageLoadTimeout: 2000,
    httpTimeout: 60000,
    testTimeout: 90000,
    resetCursor: false,
    sets: {
        desktop: {
            files: [
                "testplane-tests/**/*.testplane.(t|j)s"
            ],
            browsers: [
                "chrome"
            ]
        }
    },
    browsers: {
        chrome: {
            automationProtocol: "devtools",
            headless: true,
            desiredCapabilities: {
                browserName: "chrome"
            }
        }
    },
    plugins: {
        "html-reporter/testplane": {
            // https://github.com/gemini-testing/html-reporter
            enabled: true,
            path: "testplane-report",
            defaultView: "all",
            diffMode: "3-up-scaled"
        },
        '@testplane/global-hook': {
            beforeEach: async ({browser}) => {
                // await browser.deleteCookie(); // Например, мы хотим всегда очищать cookies перед запуском теста
            },
            afterEach: async ({browser}) => {
                await browser.execute(() => {
                    try {
                        localStorage.clear(); // И всегда очищать за собой localStorage после завершения теста
                    } catch (e) { }
                });
            }
        },
    }
};
