import * as vscode from 'vscode';
import * as child_process from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider('c', {
            provideDocumentFormattingEdits(document) {
                return formatDocument(document);
            },
        })
    );
}

async function formatDocument(document: vscode.TextDocument): Promise<vscode.TextEdit[]> {
    return new Promise((resolve, reject) => {
        const code = document.getText();

        const command = `clang-format -style="{BasedOnStyle: llvm, BreakBeforeBraces: WebKit, IndentWidth: 4}"`;

        const proc = child_process.exec(command, (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(`clang-format error: ${stderr}`);
                reject(stderr);
                return;
            }

            const edit = vscode.TextEdit.replace(
                new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(code.length)
                ),
                stdout
            );

            resolve([edit]);
        });
        if (proc.stdin) {
            proc.stdin.write(code);
            proc.stdin.end();
        } else {
            reject("clang-format stdin is null");
        }
    });
}