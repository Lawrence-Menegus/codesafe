# CodeSafe  

CodeSafe is a security scanner for Visual Studio Code that helps developers identify and locate sensitive information, such as API keys, passwords, tokens, and other secrets, within their codebase. It automatically scans for predefined sensitive keywords and alerts the user, enhancing security and privacy.  

## Features  

- **Automated Scanning** – Detects sensitive information like API keys, passwords, and database connection strings automatically.  
- **User Notification** – Alerts the user when sensitive keywords are found and provides the option to redact them.  
- **Customizable Sensitivity** – Allows users to ignore specific keywords or lines to reduce unnecessary alerts.  
- **Real-Time Scanning** – Continuously monitors code changes and flags new secrets immediately.  

## Requirements  

- **Visual Studio Code** – Requires the latest version of VS Code.  

## Installation  

1. Open **Visual Studio Code**  
2. Go to the **Extensions** Marketplace (`Ctrl + Shift + X`)  
3. Search for **CodeSafe**  
4. Click **Install**  

## Usage  

### Automatic Scanning  

CodeSafe runs automatically and detects exposed API keys and sensitive data in real time.  

### Manual Scan  

If you need to run a scan manually, follow these steps:  

1. Press **Ctrl + Shift + P**  
2. Type: **Scan Code for Security Risks**  
3. Press **Enter**  

The extension will highlight areas where sensitive information, such as API keys or passwords, is exposed.  

## Extension Settings  

CodeSafe does not add additional settings but allows you to enable or disable scanning using the `safecode.scan` command.  

## Release Notes  

### 1.0.0  

- Initial release of CodeSafe  
- Features automatic detection of sensitive information and user alerts  

## License  

MIT License  


## Contributor

Lawrence Menegus 

