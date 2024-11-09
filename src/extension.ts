// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

class Provider {
	async resolveCustomTextEditor(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel, token: vscode.CancellationToken): Promise<void> {
		webviewPanel.webview.onDidReceiveMessage(async (message) => {
			console.log("EXT MSG: ", message);
		});
		webviewPanel.webview.options = {
			enableScripts: true
		};
		webviewPanel.webview.html = `<!DOCTYPE html>
		<html>
			<body>
				<h1>Hello World</h1>
				<div id="messages">
				</div>
				<script>
					const vscode = acquireVsCodeApi();
					console.log('Hello World');
					const {port1, port2} = new MessageChannel();
					vscode.postMessage({
						command: "init",
					}, port1);
					document.addEventListener('message', (event) => {
						console.log("MSG: ", event.data);
					});
				</script>
			</body>
		</html>`;
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const provider = new Provider();
	context.subscriptions.push(vscode.window.registerCustomEditorProvider("tmptest.provider", provider));
}

// This method is called when your extension is deactivated
export function deactivate() {}
