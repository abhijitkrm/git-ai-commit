# Contributing to git-ai-commit

First off, thank you for considering contributing to git-ai-commit! It's people like you that make git-ai-commit such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your contribution
4. Make your changes
5. Test your changes
6. Commit your changes
7. Push to your fork
8. Open a Pull Request

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

**Use the bug report template** which includes:
- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Your environment (OS, Node.js version, git version)
- Screenshots if applicable
- Additional context

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- A clear and descriptive title
- A detailed description of the proposed functionality
- Explain why this enhancement would be useful
- List any alternatives you've considered

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Simple issues perfect for beginners
- `help wanted` - Issues where we'd appreciate community help

### Pull Requests

1. Follow the [TypeScript style guide](#coding-standards)
2. Update documentation as needed
3. Add tests if applicable
4. Ensure all tests pass
5. Update CHANGELOG.md with your changes

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/git-ai-commit.git
cd git-ai-commit

# Install dependencies
npm install

# Build the project
npm run build

# Install globally for testing
npm link
```

### Development Workflow

```bash
# Watch mode for development
npm run watch

# Run in development mode
npm run dev -- --help

# Build
npm run build

# Clean build artifacts
npm run clean
```

### Testing Your Changes

```bash
# Test the CLI locally
node dist/index.js --dry-run

# Or after npm link
git-ai-commit --dry-run --verbose

# Test with different providers
git-ai-commit --provider openai --dry-run
git-ai-commit --provider anthropic --dry-run
git-ai-commit --provider gemini --dry-run
```

## Coding Standards

### TypeScript Style

- Use TypeScript for all new code
- Follow existing code style
- Use meaningful variable and function names
- Add type annotations where helpful
- Avoid `any` types when possible

### Code Organization

```typescript
// Good: Clear, typed, documented
/**
 * Execute a git command and return output
 */
private exec(command: string, options: ExecOptions = {}): string {
  // Implementation
}

// Bad: Unclear, untyped
private run(cmd: any) {
  // Implementation
}
```

### Best Practices

1. **Single Responsibility**: Each function should do one thing well
2. **Error Handling**: Always handle errors gracefully
3. **Documentation**: Add JSDoc comments for public APIs
4. **Type Safety**: Leverage TypeScript's type system
5. **Modularity**: Keep code modular and testable

### File Structure

```
src/
├── index.ts              # Main entry point
├── git/                  # Git operations (future)
├── providers/            # LLM providers (future)
├── cli/                  # CLI logic (future)
└── utils/                # Utilities (future)
```

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```
feat(providers): add support for local LLM models

Add support for running local LLM models via Ollama.
This allows users to avoid API costs and work offline.

Closes #123
```

```
fix(git): handle branch names with special characters

Previously, branch names with slashes would cause errors.
This fix properly escapes special characters in branch names.

Fixes #456
```

```
docs(readme): update installation instructions

Add troubleshooting section for common Node.js version issues.
```

## Pull Request Process

### Before Submitting

1. **Update your branch**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test thoroughly**:
   ```bash
   npm run build
   git-ai-commit --dry-run --verbose
   ```

3. **Update documentation**:
   - README.md if adding features
   - EXAMPLES.md for usage examples
   - CHANGELOG.md with your changes

4. **Check your code**:
   - No console.log statements (use proper logging)
   - No commented-out code
   - Follow TypeScript best practices

### Submitting

1. **Push to your fork**:
   ```bash
   git push origin feature-your-feature-name
   ```

2. **Open a Pull Request** on GitHub

3. **Fill out the PR template** completely

4. **Link related issues**: Use keywords like "Fixes #123" or "Closes #456"

### PR Template

Your PR should include:
- **Description**: What does this PR do?
- **Motivation**: Why is this change needed?
- **Changes**: List of changes made
- **Testing**: How was this tested?
- **Screenshots**: If UI-related
- **Checklist**: Complete the checklist

### Review Process

1. A maintainer will review your PR
2. Address any feedback or requested changes
3. Once approved, a maintainer will merge your PR
4. Your contribution will be included in the next release!

### After Your PR is Merged

- Delete your feature branch
- Pull the latest changes from main
- Celebrate! 🎉 You've contributed to git-ai-commit!

## Areas for Contribution

We'd love help with:

### High Priority

- **More LLM Providers**: Add support for local models (Ollama, LM Studio)
- **Tests**: Unit and integration tests
- **Configuration File**: Support for `.git-ai-commit.json` config
- **Interactive Mode**: Allow editing generated content before committing

### Medium Priority

- **Custom Prompts**: Configurable prompt templates
- **Commit Body**: Generate multi-line commit messages
- **Branch Strategies**: Customizable branch naming conventions
- **Hooks Integration**: Git hooks support

### Nice to Have

- **VS Code Extension**: Integrate with VS Code
- **Web UI**: Simple web interface for configuration
- **Analytics**: Track usage patterns (opt-in)
- **Plugins**: Plugin system for extensibility

## Questions?

- Open an issue with the `question` label
- Check existing issues and discussions
- Read the [README.md](README.md) and [EXAMPLES.md](EXAMPLES.md)

## Recognition

Contributors will be:
- Added to the contributors list
- Credited in release notes
- Mentioned in the README (for significant contributions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to git-ai-commit!** 🚀
