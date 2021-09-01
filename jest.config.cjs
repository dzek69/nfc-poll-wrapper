module.exports = {
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec).[jt]s?(x)"
    ],
    collectCoverageFrom: [
        'src/**/*.{mjs,js,jsx,ts,tsx}',
        '!**/*.d.ts'
    ],
    setupFiles: [
        '<rootDir>/test/bootstrap.cjs'
    ],
    testURL: 'http://localhost:8080',
    moduleNameMapper: {
        '^(.*)\.js$': '$1',
    },
};


