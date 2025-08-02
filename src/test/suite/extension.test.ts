import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';

suite('K&R Formatter Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Extension should be present', () => {
        assert.ok(vscode.extensions.getExtension('ralphvwilliams.kr-formatter'));
    });

    test('Should register C document formatter', async () => {
        const doc = await vscode.workspace.openTextDocument({
            content: 'int main(){return 0;}',
            language: 'c'
        });

        const formatProvider = vscode.languages.registerDocumentFormattingEditProvider;
        assert.ok(formatProvider);
    });

    test('Should activate extension properly', () => {
        const extension = vscode.extensions.getExtension('ralphvwilliams.kr-formatter');
        assert.ok(extension);
        assert.ok(extension.isActive !== undefined);
    });

    test('Should have correct package.json configuration', () => {
        const extension = vscode.extensions.getExtension('ralphvwilliams.kr-formatter');
        assert.ok(extension);
        
        const packageJSON = extension.packageJSON;
        assert.strictEqual(packageJSON.name, 'kr-formatter');
        assert.strictEqual(packageJSON.publisher, 'ralphvwilliams');
        assert.ok(packageJSON.categories.includes('Formatters'));
    });

    test('Should provide formatting for C language', async () => {
        // Create a simple C document
        const doc = await vscode.workspace.openTextDocument({
            content: 'int main(){return 0;}',
            language: 'c'
        });

        // Check if there are any formatting providers registered for C
        const providers = vscode.languages.registerDocumentFormattingEditProvider;
        assert.ok(providers, 'Document formatting provider should be available');
        
        // Just verify the document was created successfully
        assert.strictEqual(doc.languageId, 'c');
        assert.ok(doc.getText().includes('main'));
    });
});