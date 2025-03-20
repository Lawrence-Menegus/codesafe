# CodeSafe README

CodeSafe is a security scanner for Visual Studio Code that helps developers identify sensitive information (like API keys, passwords, tokens, and other secrets) within their codebase. It automatically scans for predefined sensitive keywords to identify them which improves security and privacy.

## Features

Automated Scanning: Automatically detects sensitive information such as API keys, passwords, database connection strings, and more.

Redaction Prompt: When sensitive keywords are found, it prompts the user with the option to redact them with a single click.

Customizable Sensitivity: Users can ignore specific keywords or lines to prevent unnecessary prompts.

Real-Time Scanning: Continuously scans the document as it changes to ensure that new secrets are flagged immediately.

## Requirements

Visual Studio Code: This extension requires the latest version of VS Code.

## Extension Settings

This extension does not add additional settings but allows you to enable or disable the scanning process using the safecode.scan command.

For example:

CodeSafe.scan: Scan the current file for sensitive information.
You can bind this command to a keyboard shortcut for quick access.

## Known Issues

Currently, the extension only supports basic redaction and might not handle edge cases like multiline secrets.

If you use special characters or custom encodings in your sensitive values, they may not be detected accurately.

## Release Notes

### 1.0.0

Initial release of CodeSafe, featuring sensitive keyword detection and redaction.


**Enjoy!**
