# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

The git-ai-commit team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings.

### Where to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

1. **GitHub Security Advisories** (Preferred)
   - Go to the Security tab
   - Click "Report a vulnerability"
   - Fill out the form with details

2. **Email** (Alternative)
   - Send an email to the project maintainers
   - Include "SECURITY" in the subject line
   - Provide detailed information about the vulnerability

### What to Include

Please include the following information in your report:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability
- Suggested fix (if you have one)

### Response Timeline

- **Within 24-48 hours**: We'll acknowledge receipt of your vulnerability report
- **Within 7 days**: We'll provide a detailed response indicating next steps
- **Within 30 days**: We'll aim to release a fix or workaround

### What to Expect

After you submit a report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release patched versions as soon as possible
5. Credit you in the security advisory (if desired)

## Security Best Practices

### API Key Security

**Never commit API keys to version control**

- Use environment variables for API keys
- Add `.env` files to `.gitignore`
- Rotate API keys regularly
- Use separate keys for development and production

**Example of secure setup:**

```bash
# .env (never commit this file)
OPENAI_API_KEY=sk-your-secret-key

# Load from environment
export OPENAI_API_KEY=sk-your-secret-key
```

### Running git-ai-commit Securely

1. **Verify git commands**: Use `--dry-run` to preview before execution
2. **Review generated content**: Always review branch names and commit messages
3. **Use HTTPS**: Prefer HTTPS over SSH for git remotes when security is critical
4. **Limit permissions**: Use API keys with minimal required permissions
5. **Monitor usage**: Regularly check your API usage for anomalies

### CI/CD Security

If using git-ai-commit in CI/CD:

- Store API keys as encrypted secrets
- Use short-lived tokens when possible
- Limit CI/CD access to specific branches
- Review logs for exposed credentials
- Use separate API keys for CI/CD

**GitHub Actions example:**

```yaml
env:
  OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

## Known Security Considerations

### API Keys in Process Memory

- API keys are temporarily stored in process memory during execution
- They are not written to disk or logs
- Ensure your system is secure from memory dumps

### Git Command Execution

- git-ai-commit executes git commands via shell
- Commands are sanitized to prevent injection
- Branch names and commit messages are escaped

### Network Security

- All LLM API calls use HTTPS
- No data is sent to third parties except chosen LLM provider
- Diffs are truncated before sending to APIs

### Diff Privacy

- Be aware that code diffs are sent to LLM providers
- Don't use on repositories with sensitive/proprietary code without permission
- Consider using local LLMs for sensitive projects (future feature)

## Security Updates

Security updates will be released as patch versions and announced via:

- GitHub Security Advisories
- Release notes
- CHANGELOG.md

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release fixes as soon as possible
5. Publish a security advisory

We follow responsible disclosure:

- We'll work with you to understand and resolve the issue
- We'll keep you informed throughout the process
- We'll credit you in the advisory (unless you prefer anonymity)

## Secure Development

We follow secure development practices:

- Code reviews for all changes
- TypeScript for type safety
- Input validation and sanitization
- Minimal dependencies
- Regular dependency updates
- Security audits via `npm audit`

## Third-Party Dependencies

We regularly:

- Monitor dependencies for vulnerabilities
- Update to patched versions promptly
- Review security advisories
- Minimize dependency count

Check current vulnerabilities:

```bash
npm audit
```

## Questions?

If you have questions about security that don't involve reporting a vulnerability:

- Open a GitHub Discussion
- Check the FAQ in README.md
- Review existing security advisories

## Hall of Fame

We recognize security researchers who responsibly disclose vulnerabilities:

<!-- Contributors will be listed here -->

- No vulnerabilities reported yet

Thank you for helping keep git-ai-commit and its users safe!

---

**Last Updated**: 2024-11-12
