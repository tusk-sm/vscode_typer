// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "typer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	function wait(milliseconds) {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	}

	let disposable = vscode.commands.registerCommand('typer.helloWorld', function () {
		const editor = vscode.window.activeTextEditor;		
		const string = editor.document.getText();
		console.log(string)
		let line  = 0;
		const array = string.split('');
		vscode.commands.executeCommand('editor.autoClosingQuotes:never');
		vscode.commands.executeCommand('editor.action.selectAll');
		vscode.commands.executeCommand('editor.action.clipboardCutAction');
		let typing = array.reduce((promise, character, index) =>
				promise.then((_) => 
					editor.edit(editBuilder => { 						
						let pos = new vscode.Position(line, index);						
						if(character != '\n') {
							editBuilder.insert(pos, character) ;
						}						
					})
						.then(_ => { return wait(30) })
							.then(_ => { if(character === '\n') { line++ }})		
				)
			, Promise.resolve())
		
		vscode.window.showInformationMessage('Typing!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
