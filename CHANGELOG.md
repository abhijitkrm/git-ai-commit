# Changelog

All notable changes to the git-ai-commit project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-11-17

### Added
- **Configuration System** - Major new feature!
  - Set default provider without passing `--provider` flag every time
  - Configure default verbose and dry-run modes
  - Support for global configuration (`~/.git-ai-commit.json`)
  - Support for local/project-specific configuration (`./.git-ai-commit.json`)
  - Configuration precedence: CLI flags > Local config > Global config > Defaults
- **Config Command**:
  - `git-ai-commit config --show` - Display current configuration
  - `git-ai-commit config --set-provider <name>` - Set default provider
  - `git-ai-commit config --set-verbose <true|false>` - Set default verbose mode
  - `git-ai-commit config --set-dry-run <true|false>` - Set default dry-run mode
  - `--global` flag to save to global config (default)
  - `--local` flag to save to project-specific config
- **Documentation**:
  - New CONFIG.md with comprehensive configuration guide
  - Updated README.md with configuration section
  - Updated QUICKSTART.md with configuration setup
  - Added configuration examples to EXAMPLES.md

### Changed
- Version bumped to 1.1.0
- CLI now loads configuration from files before applying CLI flags
- Main command updated to merge config with CLI options
- Updated usage documentation in source code header
- `.gitignore` now excludes local config files (`.git-ai-commit.json`)

### Improved
- User experience: No longer need to pass `--provider` flag every time
- Project flexibility: Can set different providers per project
- Team collaboration: Can commit local config for team defaults

### Example Usage

```bash
# One-time setup
git-ai-commit config --set-provider anthropic

# Now just run without flags!
git-ai-commit  # Uses Anthropic automatically
```

## [1.0.0] - 2024-11-12

### Added
- Initial release of git-ai-commit
- **Multi-provider LLM support**:
  - OpenAI (GPT-4o-mini)
  - Anthropic (Claude 3.5 Haiku)
  - Google Gemini (Gemini Pro)
- **Complete git workflow automation**:
  - Automatic branch name generation
  - Smart commit message generation
  - Branch creation and checkout
  - Staging all changes
  - Committing with generated message
  - Pushing to remote repository
- **CLI features**:
  - `--provider` flag to select LLM provider
  - `--dry-run` flag to preview without making changes
  - `--verbose` flag for detailed logging
  - Help and version commands
- **Safety features**:
  - Git repository validation
  - Change detection (exits if no changes)
  - Branch name uniqueness (auto-appends suffix if exists)
  - Comprehensive error handling
  - Diff truncation for large changesets
- **Code quality**:
  - TypeScript implementation with full type safety
  - Modular architecture (Git, LLM, CLI separation)
  - Clean error messages
  - Extensive documentation
- **Branch name generation**:
  - Lowercase kebab-case format
  - Conventional prefixes (feature-, fix-, refactor-, etc.)
  - Maximum 50 characters
  - Descriptive and context-aware
- **Commit message generation**:
  - Conventional commit format
  - Types: feat, fix, refactor, docs, test, chore, style, perf
  - Concise and descriptive
  - Under 72 characters
- **Documentation**:
  - Comprehensive README with setup instructions
  - EXAMPLES.md with real-world scenarios
  - API key setup guides for all providers
  - Troubleshooting section
  - Best practices guide
- **Developer experience**:
  - npm scripts for build, dev, watch
  - TypeScript configuration
  - Installation script
  - .env.example template
  - .gitignore for Node.js projects

### Features in Detail

#### LLM Provider Abstraction
- Clean provider interface
- Easy to add new providers
- Consistent prompt engineering across providers
- Automatic diff truncation (500 lines max)
- Branch name sanitization

#### Git Operations
- Safe git command execution
- Error handling for all git operations
- Silent mode for internal checks
- Verbose logging option

#### CLI Interface
- Built with Commander.js
- Intuitive command-line options
- Clear help documentation
- Version information

### Configuration

#### Environment Variables
- `OPENAI_API_KEY` - For OpenAI GPT models
- `ANTHROPIC_API_KEY` - For Anthropic Claude models
- `GEMINI_API_KEY` or `GOOGLE_API_KEY` - For Google Gemini models

### Installation

```bash
npm install
npm run build
npm install -g .
```

Or use the install script:
```bash
./install.sh
```

### Usage

```bash
# Basic usage (OpenAI)
git-ai-commit

# Specify provider
git-ai-commit --provider anthropic
git-ai-commit --provider gemini

# Dry-run mode
git-ai-commit --dry-run

# Verbose logging
git-ai-commit --verbose

# Combine options
git-ai-commit --provider anthropic --dry-run --verbose
```

### Dependencies

#### Production
- `@anthropic-ai/sdk@^0.20.0` - Anthropic API client
- `@google/generative-ai@^0.2.0` - Google Gemini API client
- `commander@^11.1.0` - CLI argument parsing
- `openai@^4.28.0` - OpenAI API client

#### Development
- `@types/node@^20.11.0` - Node.js type definitions
- `ts-node@^10.9.2` - TypeScript execution for development
- `typescript@^5.3.3` - TypeScript compiler

### Technical Details

- **Language**: TypeScript
- **Runtime**: Node.js >= 18.0.0
- **Architecture**: Modular (Git operations, LLM providers, CLI)
- **Error Handling**: Comprehensive try-catch with clear messages
- **Testing**: Manual testing (automated tests to be added in future)

### Known Limitations

- Requires active internet connection
- API calls incur costs (minimal, ~$0.001-0.01 per commit)
- Diff truncated to 500 lines to avoid token limits
- No interactive editing of generated content (must use --dry-run)
- No support for commit message body (only subject line)

### Future Enhancements

Planned for future releases:
- Support for more LLM providers (local models, other APIs)
- Customizable prompt templates
- Configuration file support (.git-ai-commit.json)
- Interactive mode for editing generated content
- Commit message body generation
- Branch naming strategies (custom prefixes, etc.)
- Automated tests (unit and integration)
- Support for conventional commit scopes
- Git hooks integration
- Pre-commit validation
- Commit message linting

### Breaking Changes

None (initial release)

### Security

- API keys must be set via environment variables
- No API keys stored in code or version control
- Secure execution of git commands
- Input sanitization for branch names and commit messages

### Performance

- Fast execution (typically 2-5 seconds per run)
- Efficient diff processing (truncation for large changes)
- Minimal API token usage
- Async/await for non-blocking operations

### Compatibility

- **Operating Systems**: macOS, Linux, Windows (WSL)
- **Node.js**: >= 18.0.0
- **Git**: Any modern version
- **Shells**: bash, zsh, fish, PowerShell

### Credits

- OpenAI for GPT models
- Anthropic for Claude models
- Google for Gemini models
- Commander.js for CLI framework

### License

MIT License - Free to use and modify

---

## How to Update

To update to a new version:

```bash
git pull origin main
npm install
npm run build
npm install -g .
```

Or run the install script:
```bash
./install.sh
```

## Reporting Issues

If you encounter any issues:
1. Check the [README.md](README.md) troubleshooting section
2. Review the [EXAMPLES.md](EXAMPLES.md) for usage patterns
3. Open an issue on GitHub with:
   - Your Node.js version (`node -v`)
   - Your git version (`git --version`)
   - The command you ran
   - The error message
   - Whether you used `--verbose` flag

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests (if applicable)
5. Update documentation
6. Submit a pull request

---

**Made with ❤️ to automate git workflows with AI**
