import * as path from 'path';
import Mocha from 'mocha';
import * as fs from 'fs';

export function run(): Promise<void> {
    // Create the mocha test
    const mocha = new Mocha({
        ui: 'tdd',
        color: true
    });

    const testsRoot = path.resolve(__dirname, '..');

    return new Promise((c, e) => {
        try {
            // Find test files manually
            const testFiles: string[] = [];
            
            function findTestFiles(dir: string) {
                const items = fs.readdirSync(dir);
                for (const item of items) {
                    const fullPath = path.join(dir, item);
                    const stat = fs.statSync(fullPath);
                    if (stat.isDirectory()) {
                        findTestFiles(fullPath);
                    } else if (item.endsWith('.test.js')) {
                        testFiles.push(fullPath);
                    }
                }
            }
            
            findTestFiles(testsRoot);
            
            // Add files to the test suite
            testFiles.forEach((f: string) => mocha.addFile(f));

            try {
                // Run the mocha test
                mocha.run((failures: number) => {
                    if (failures > 0) {
                        e(new Error(`${failures} tests failed.`));
                    } else {
                        c();
                    }
                });
            } catch (err) {
                console.error(err);
                e(err);
            }
        } catch (err) {
            return e(err);
        }
    });
}