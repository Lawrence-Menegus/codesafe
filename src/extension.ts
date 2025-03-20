// Creator: Lawrence Menegus 
// CodeSafe Extension 

// Import the extension 
import * as vscode from 'vscode';

// Keywords to detect in the code
const SENSITIVE_KEYWORDS = [
    // General API Keys
    "api_key", "apikey", "api-key", "api.key", "apiKey", "API_KEY",
    "access_key", "accessKey", "ACCESS_KEY", "access_key_id", "ACCESS_KEY_ID",

    // Passwords & Secrets
    "password", "passwd", "pass", "pwd", "user_password", "userPass",
    "admin_password", "root_password", "db_password", "database_password",
    "sql_password", "mysql_password", "postgres_password", "oracle_password",
    "redis_password", "mongodb_password", "mssql_password", "cassandra_password",
    "ftp_password", "smtp_password", "email_password", "outlook_password", "gmail_password",

    // Authentication Tokens
    "token", "access_token", "auth_token", "oauth_token", "bearer_token",
    "jwt_token", "jwtSecret", "csrf_token", "session_token", "refresh_token",
    "app_token", "device_token",

    // Encryption & Signing Keys
    "encryption_key", "crypto_key", "secure_key", "SIGNING_KEY", "GPG_KEY",
    "jwt_secret_key", "private_secret", "env_secret", "app_secret",

    // Public & Private Keys
    "public_key", "publicKey", "PUBLIC_KEY", "ssh_public_key", "id_rsa.pub",
    "private_key", "privateKey", "PRIVATE_KEY", "ssh_private_key", "id_rsa",
    "id_dsa", "id_ecdsa", "id_ed25519",

    // OAuth & Client Secrets
    "client_secret", "clientSecret", "CLIENT_SECRET",
    "app_client_secret", "oauth_client_secret",

    // AWS Keys
    "aws_secret_access_key", "AWS_SECRET_ACCESS_KEY", "aws_access_key_id", "AWS_ACCESS_KEY_ID",
    "aws_session_token", "aws_security_token", "aws_private_key", "aws_public_key",

    // Google Cloud Platform (GCP) API Keys
    "gcp_api_key", "google_api_key", "google_client_secret", "google_secret",
    "google_oauth_token", "gcp_service_account", "firebase_api_key", "firebase_secret",
    "gcp_access_token", "google_application_credentials",

    // Microsoft Azure Keys
    "azure_storage_key", "azure_secret_key", "azure_api_key",
    "azure_tenant_id", "azure_client_id", "azure_client_secret",
    "microsoft_oauth_token", "azure_sas_token",

    // AI & LLM API Keys
    "openai_api_key", "OPENAI_API_KEY", "openai_secret",
    "anthropic_api_key", "cohere_api_key", "mistral_api_key",
    "stability_api_key", "stability_secret",
    "huggingface_api_key", "huggingface_secret",
    "replicate_api_key", "deepgram_api_key", "ai21_api_key",
    "nvidia_nemo_api_key", "palm_api_key",

    // Cloudflare Keys
    "cloudflare_api_key", "cloudflare_token", "cloudflare_secret",
    "cloudflare_global_api_key", "cloudflare_bearer_token",

    // Twilio Keys
    "twilio_api_key", "twilio_secret", "twilio_auth_token",

    // Stripe, PayPal, Braintree API Keys
    "stripe_secret_key", "stripe_api_key", "paypal_secret", "paypal_client_id",
    "braintree_private_key", "braintree_api_key",

    // Social Media API Keys
    "twitter_api_key", "twitter_api_secret", "twitter_bearer_token",
    "discord_token", "slack_token", "slack_api_key",
    "facebook_api_key", "instagram_api_key", "linkedin_api_key",
    "youtube_api_key", "tiktok_api_key",

    // Git & DevOps Tokens
    "github_token", "github_api_key", "gitlab_token", "gitlab_api_key",
    "bitbucket_token", "bitbucket_api_key", "circleci_api_key",
    "travisci_api_key", "jenkins_api_key",

    // Database Connection Strings
    "mongo_uri", "mongodb_uri", "mongodb_connection_string",
    "postgres_connection_string", "mysql_connection_string",
    "redis_url", "cassandra_url", "mssql_connection_string",
    "db_url", "database_url",

    // Miscellaneous
    "smtp_secret", "email_secret", "service_account_key",
    "vault_token", "digitalocean_api_key", "heroku_api_key",
    "dockerhub_token", "shopify_api_key", "sendgrid_api_key",
    "mailgun_api_key", "pagerduty_api_key", "newrelic_api_key",
    "datadog_api_key", "zendesk_api_key", "splunk_api_key"
];

export function activate(context: vscode.ExtensionContext) {
    console.log('CodeSafe security scanner is now active!');

    let alreadyRedacted = new Set<number>(); // Tracks redacted lines
    let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);

    async function scanForSensitiveKeywords() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage("Open a file to scan for security issues.");
            return;
        }

        const document = editor.document;
        const text = document.getText();
        const matches: { keyword: string; line: number; start: number; end: number }[] = [];
        let decorationTypes: vscode.TextEditorDecorationType[] = [];

        SENSITIVE_KEYWORDS.forEach(keyword => {
            if (!keyword.trim()) {return;}

            let regex = new RegExp(`\\b${keyword}\\b\\s*=\\s*["']([^"']+)["']`, 'gi');
            let match;
            while ((match = regex.exec(text)) !== null) {
                const line = document.positionAt(match.index).line;
                const start = match.index + keyword.length + 2;
                const end = start + match[1].length + 2;

                if (!alreadyRedacted.has(line)) {
                    matches.push({ keyword, line, start, end });
                }
            }
        });

        if (matches.length > 0) {
            let currentMatchIndex = 0;

            const highlightNextMatch = () => {
                if (currentMatchIndex >= matches.length) {
                    statusBarItem.hide();
                    vscode.window.showInformationMessage('All sensitive data entries have been reviewed.');
                    return;
                }

                const match = matches[currentMatchIndex];
                const startPos = document.positionAt(match.start);
                const endPos = document.positionAt(match.end);

                let decorationType = vscode.window.createTextEditorDecorationType({
                    backgroundColor: 'rgba(135, 44, 24, 0.71)',
                    isWholeLine: false,
                });

                editor.setDecorations(decorationType, [new vscode.Range(startPos, endPos)]);
                decorationTypes.push(decorationType);

                // Show status bar message with buttons
                statusBarItem.text = `Sensitive data found: ${match.keyword} on line ${match.line + 1}`;
                statusBarItem.show();

                vscode.window.showInformationMessage(
                    `Found sensitive data: ${match.keyword} on line ${match.line + 1}`,
                    'Resolved', 'Skip'
                ).then(selectedButton => {
                    if (selectedButton) {
                        alreadyRedacted.add(match.line);
                        decorationTypes.forEach(decoration => decoration.dispose());
                        currentMatchIndex++;
                        highlightNextMatch();
                    }
                });
            };

            highlightNextMatch();
        } else {
            vscode.window.showInformationMessage("No sensitive data found.");
        }
    }

    let disposable = vscode.commands.registerCommand('safecode.scan', async () => {
        await scanForSensitiveKeywords();
    });

    vscode.workspace.onDidChangeTextDocument(async (event) => {
        if (event.contentChanges.length > 0) {
            const newKeywordsDetected = SENSITIVE_KEYWORDS.filter(keyword =>
                event.document.getText().includes(keyword)
            );

            if (newKeywordsDetected.length > 0) {
                await scanForSensitiveKeywords();
            }
        }
    });

    context.subscriptions.push(disposable);
}