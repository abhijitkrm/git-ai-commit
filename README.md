# git-ai-commit

<div align="center">

[![CI](https://github.com/YOUR_USERNAME/git-ai-commit/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/git-ai-commit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Automate your git workflow with AI-generated branch names and commit messages**

Supports OpenAI • Anthropic Claude • Google Gemini

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Examples](#examples) • [Contributing](CONTRIBUTING.md)

</div>

---

## Features

- 🤖 **AI-Powered**: Generate meaningful branch names and commit messages using state-of-the-art LLMs
- 🔄 **Complete Workflow**: Automates branch creation, staging, committing, and pushing
- 🎯 **Multiple Providers**: Support for OpenAI, Anthropic, and Google Gemini
- 🛡️ **Safe**: Dry-run mode to preview changes before execution
- 📝 **Conventional Commits**: Generates commit messages following conventional commit standards
- 🎨 **Smart Branch Names**: Creates kebab-case branch names with conventional prefixes

## Quick Start

```bash
# Install
npm install

# Build
npm run build

# Install globally (optional)
npm install -g .

# Set your API key
export OPENAI_API_KEY=your-api-key-here

# Run
git-ai-commit
```

## Installation

### Prerequisites

- **Node.js**: >= 18.0.0
- **Git**: Installed and configured
- **API Key**: For at least one of the supported providers

### Step-by-Step Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url> git-ai-commit
   cd git-ai-commit
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the TypeScript code**:
   ```bash
   npm run build
   ```

4. **Install globally** (optional but recommended):
   ```bash
   npm install -g .
   ```

   Or create a symlink:
   ```bash
   npm link
   ```

5. **Set up your API keys**:
   ```bash
   # For OpenAI
   export OPENAI_API_KEY=sk-...

   # For Anthropic
   export ANTHROPIC_API_KEY=sk-ant-...

   # For Google Gemini
   export GEMINI_API_KEY=...
   # OR
   export GOOGLE_API_KEY=...
   ```

   Add these to your shell configuration file (`~/.bashrc`, `~/.zshrc`) to make them permanent:
   ```bash
   echo 'export OPENAI_API_KEY=your-key' >> ~/.zshrc
   source ~/.zshrc
   ```

## Usage

### Basic Usage

```bash
# Use default provider (OpenAI)
git-ai-commit

# Specify a provider
git-ai-commit --provider anthropic
git-ai-commit --provider gemini
```

### Command-Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `--provider <name>` | LLM provider: `openai`, `anthropic`, or `gemini` | `openai` |
| `--dry-run` | Preview changes without modifying the repository | `false` |
| `--verbose` | Show detailed logging of each step | `false` |
| `-h, --help` | Display help information | - |
| `-V, --version` | Display version number | - |

### Examples

**1. Basic usage with OpenAI:**
```bash
git-ai-commit
```

**2. Use Anthropic Claude:**
```bash
git-ai-commit --provider anthropic
```

**3. Use Google Gemini:**
```bash
git-ai-commit --provider gemini
```

**4. Preview changes without committing (dry-run):**
```bash
git-ai-commit --dry-run
```

**5. Verbose output to see each step:**
```bash
git-ai-commit --verbose
```

**6. Combine options:**
```bash
git-ai-commit --provider anthropic --dry-run --verbose
```

## Configuration

**NEW**: You can now set default options without passing flags every time!

### Quick Setup

Set Anthropic as your default provider:

```bash
git-ai-commit config --set-provider anthropic
```

Now just run `git-ai-commit` without any flags!

### Configuration Commands

```bash
# Show current configuration
git-ai-commit config --show

# Set default provider
git-ai-commit config --set-provider anthropic  # Global (all projects)
git-ai-commit config --set-provider gemini --local  # This project only

# Set other defaults
git-ai-commit config --set-verbose true
git-ai-commit config --set-dry-run false
```

### Configuration Files

- **Global**: `~/.git-ai-commit.json` - Affects all projects
- **Local**: `./.git-ai-commit.json` - Project-specific settings

### Priority

Settings are applied in this order:

1. CLI flags (highest priority)
2. Local config (`./.git-ai-commit.json`)
3. Global config (`~/.git-ai-commit.json`)
4. Built-in defaults (lowest priority)

### Example Workflow

```bash
# One-time setup: Set your preferred provider globally
git-ai-commit config --set-provider anthropic

# Now use it everywhere without flags
cd ~/project1
git-ai-commit  # Uses Anthropic

cd ~/project2
git-ai-commit  # Uses Anthropic

# Override for specific run
git-ai-commit --provider openai  # Use OpenAI this time
```

**For detailed configuration guide**, see [CONFIG.md](CONFIG.md)

## How It Works

The tool performs the following steps automatically:

1. **Validates Git Repository**: Checks that you're inside a git repository
2. **Inspects Changes**: Analyzes both staged and unstaged changes
3. **Generates Branch Name**: Uses AI to create a descriptive, kebab-case branch name
4. **Creates New Branch**: Creates and checks out the new branch
5. **Stages Changes**: Runs `git add .` to stage all changes
6. **Generates Commit Message**: Uses AI to create a conventional commit message
7. **Creates Commit**: Commits the changes with the generated message
8. **Pushes to Remote**: Pushes the branch to origin

## Branch Name Format

Generated branch names follow these conventions:

- **Lowercase kebab-case**: `feature-add-user-auth`
- **Conventional prefixes**:
  - `feature-`: New features
  - `fix-`: Bug fixes
  - `refactor-`: Code refactoring
  - `docs-`: Documentation changes
  - `test-`: Test additions or modifications
  - `chore-`: Maintenance tasks
- **Maximum 50 characters**
- **Descriptive and specific**

### Example Branch Names

```
feature-add-login-endpoint
fix-null-pointer-in-user-service
refactor-database-query-logic
docs-update-api-documentation
test-add-unit-tests-for-auth
chore-update-dependencies
```

## Commit Message Format

Generated commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>: <description>
```

### Commit Types

- `feat`: A new feature
- `fix`: A bug fix
- `refactor`: Code refactoring without changing functionality
- `docs`: Documentation only changes
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `style`: Code style changes (formatting, etc.)
- `perf`: Performance improvements

### Example Commit Messages

```
feat: add user authentication endpoint
fix: handle null pointer exception in payment service
refactor: simplify database query logic
docs: update API documentation with new endpoints
test: add unit tests for authentication module
chore: update npm dependencies
style: format code with prettier
perf: optimize image loading performance
```

## Environment Variables

| Variable | Provider | Required |
|----------|----------|----------|
| `OPENAI_API_KEY` | OpenAI | Yes (if using OpenAI) |
| `ANTHROPIC_API_KEY` | Anthropic | Yes (if using Anthropic) |
| `GEMINI_API_KEY` or `GOOGLE_API_KEY` | Google Gemini | Yes (if using Gemini) |

## API Key Setup

### OpenAI

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to [API Keys](https://platform.openai.com/api-keys)
4. Create a new API key
5. Set the environment variable:
   ```bash
   export OPENAI_API_KEY=sk-...
   ```

### Anthropic

1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Set the environment variable:
   ```bash
   export ANTHROPIC_API_KEY=sk-ant-...
   ```

### Google Gemini

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create an API key
4. Set the environment variable:
   ```bash
   export GEMINI_API_KEY=...
   # OR
   export GOOGLE_API_KEY=...
   ```

## Development

### Project Structure

```
git-ai-commit/
├── src/
│   └── index.ts          # Main source code
├── dist/                 # Compiled JavaScript (generated)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

### Available Scripts

```bash
# Build the TypeScript code
npm run build

# Run in development mode (with ts-node)
npm run dev

# Watch mode (rebuild on changes)
npm run watch

# Clean build artifacts
npm run clean
```

### Building from Source

```bash
# Install dependencies
npm install

# Build
npm run build

# The compiled code will be in ./dist/index.js
```

### Testing Locally

```bash
# Without installing globally
node dist/index.js --help

# Or with ts-node
npm run dev -- --help
```

## Error Handling

The tool handles various error scenarios:

### Not a Git Repository

```
[ERROR] Not inside a git repository
```

**Solution**: Navigate to a git repository directory.

### No Changes Detected

```
No changes detected. Nothing to commit.
```

**Solution**: Make some changes to your files before running the tool.

### Missing API Key

```
[ERROR] OPENAI_API_KEY environment variable is not set
```

**Solution**: Set the required API key for your chosen provider.

### Branch Already Exists

If the generated branch name already exists, the tool automatically appends a numeric suffix:
- `feature-add-auth` → `feature-add-auth-2`

### Git Command Failures

```
[ERROR] Git command failed: git push origin feature-name
```

The tool will display the git error message and exit. Common issues:
- No remote configured
- Authentication failures
- Network issues

## Troubleshooting

### Issue: Command not found

**Problem**: `git-ai-commit: command not found`

**Solution**:
1. Make sure you've built the project: `npm run build`
2. Install globally: `npm install -g .`
3. Or use the full path: `node dist/index.js`

### Issue: Permission denied

**Problem**: Permission denied when executing

**Solution**:
```bash
chmod +x dist/index.js
```

### Issue: TypeScript errors

**Problem**: Compilation errors

**Solution**:
```bash
# Clean and rebuild
npm run clean
npm run build
```

### Issue: API rate limits

**Problem**: Too many requests to the API

**Solution**:
- Use `--dry-run` mode for testing
- Wait before retrying
- Check your API usage limits

### Issue: Large diffs

**Problem**: Diff is too large for the API

**Solution**: The tool automatically truncates diffs to 500 lines. If you still have issues, consider staging changes in smaller batches.

## Best Practices

1. **Review Generated Content**: Always review the generated branch name and commit message, especially for important changes.

2. **Use Dry-Run First**: Test with `--dry-run` to see what would be generated:
   ```bash
   git-ai-commit --dry-run --verbose
   ```

3. **Meaningful Changes**: Make logical, atomic changes. Don't mix multiple unrelated changes.

4. **Provider Selection**:
   - **OpenAI**: Fast, reliable, good for general use
   - **Anthropic**: Excellent at understanding context
   - **Gemini**: Good balance of speed and quality

5. **Secure API Keys**: Never commit API keys to version control. Use environment variables.

6. **Cost Awareness**: Each run makes 2 API calls (branch name + commit message). Monitor your usage.

## Limitations

- Requires an active internet connection
- Depends on external API availability
- API calls incur costs (usually minimal)
- Generated content may occasionally need manual adjustment
- Diff truncated to 500 lines to avoid token limits

## FAQ

### Q: Which provider should I use?

**A**: All providers work well. OpenAI (GPT-4) is the default and most tested. Anthropic Claude is excellent for understanding complex changes. Gemini offers a good balance.

### Q: How much does it cost?

**A**: Very little. Each run makes 2 API calls with small prompts. Typical cost is $0.001-0.01 per commit.

### Q: Can I customize the prompts?

**A**: Yes! Edit the prompts in `src/index.ts` in the `generateBranchName()` and `generateCommitMessage()` methods.

### Q: Does it work with staged changes?

**A**: Yes. If you have staged changes, it will use those. Otherwise, it will stage all changes.

### Q: Can I use it in CI/CD?

**A**: Yes, but make sure to:
- Set API keys as secrets
- Handle authentication for git push
- Consider the API costs

### Q: What if I don't like the generated names/messages?

**A**: Use `--dry-run` first, or manually edit the commit after it's created with `git commit --amend`.

## Contributing

Contributions are welcome! Areas for improvement:

- Support for more LLM providers
- Customizable prompt templates
- Configuration file support
- Interactive mode for editing generated content
- Support for commit message bodies
- Branch naming strategies

## License

MIT License - feel free to use and modify as needed.

## Contributing

We love contributions! git-ai-commit is open source and we welcome:

- 🐛 Bug reports
- ✨ Feature requests
- 📝 Documentation improvements
- 🔧 Code contributions
- 💡 Ideas and suggestions

**Quick links:**
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Code of Conduct](CODE_OF_CONDUCT.md) - Our community standards
- [Security Policy](SECURITY.md) - Report security vulnerabilities
- [Open Issues](https://github.com/YOUR_USERNAME/git-ai-commit/issues) - Find something to work on
- [Discussions](https://github.com/YOUR_USERNAME/git-ai-commit/discussions) - Ask questions

### Good First Issues

New to the project? Look for issues labeled [`good first issue`](https://github.com/YOUR_USERNAME/git-ai-commit/labels/good%20first%20issue).

### Development Setup

```bash
git clone https://github.com/YOUR_USERNAME/git-ai-commit.git
cd git-ai-commit
npm install
npm run build
npm link
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

## Support

### Getting Help

- 📖 [Read the docs](README.md) - Comprehensive guide
- 💡 [Check examples](EXAMPLES.md) - Real-world usage
- 🚀 [Quick start](QUICKSTART.md) - Get started in 5 minutes
- ❓ [Open an issue](https://github.com/YOUR_USERNAME/git-ai-commit/issues/new/choose) - Report bugs or request features
- 💬 [Start a discussion](https://github.com/YOUR_USERNAME/git-ai-commit/discussions) - Ask questions

### Useful Links

- [GitHub Repository](https://github.com/YOUR_USERNAME/git-ai-commit)
- [Issue Tracker](https://github.com/YOUR_USERNAME/git-ai-commit/issues)
- [Changelog](CHANGELOG.md)
- [License](LICENSE)

## Roadmap

Future features we're considering:

- [ ] Support for local LLM models (Ollama, LM Studio)
- [ ] Configuration file (`.git-ai-commit.json`)
- [ ] Interactive mode for editing generated content
- [ ] Custom prompt templates
- [ ] Commit message body generation
- [ ] VS Code extension
- [ ] Git hooks integration
- [ ] Plugin system

See [open issues](https://github.com/YOUR_USERNAME/git-ai-commit/issues) for more.

## Star History

If you find this project useful, please consider giving it a star ⭐️

## Contributors

Thanks to all contributors who have helped make git-ai-commit better!

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- This section is auto-generated, add contributors manually if needed -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## Acknowledgments

- [OpenAI](https://openai.com/) for GPT models
- [Anthropic](https://www.anthropic.com/) for Claude models
- [Google](https://ai.google.dev/) for Gemini models
- [Commander.js](https://github.com/tj/commander.js) for CLI framework
- All our amazing [contributors](https://github.com/YOUR_USERNAME/git-ai-commit/graphs/contributors)

---

<div align="center">

**Made with ❤️ to make git workflows smarter**

[⬆ Back to top](#git-ai-commit)

</div>
