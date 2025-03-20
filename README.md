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

## Use 

### Works automatically 

however 

### If Needed to Run Manually 

Do The Followimg:

control+shift + P 

Type in Bar: 
Scan Code For Security Risks 

Press Enter 

It will highlight were you need to change the code for exposed keys, passwords or codes. 

## Release Notes

### 1.0.0

Initial release of CodeSafe, featuring sensitive keyword detection and redaction.


**Enjoy!**
