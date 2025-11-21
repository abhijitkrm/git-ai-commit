# git-ai-commit Quick Start Guide

Get started with git-ai-commit in 5 minutes!

## Installation (2 minutes)

### Step 1: Install

```bash
# Clone or navigate to the directory
cd git-ai-commit

# Run the installer
./install.sh
```

The installer will:
- Check Node.js version (requires >= 18.0.0)
- Install dependencies
- Build TypeScript
- Install globally

### Step 2: First Run (Interactive Setup)

**NEW**: No manual setup required! Just run the tool and it will guide you.

On your first run, git-ai-commit will:
1. Ask you to select your preferred LLM provider
2. Prompt you to enter your API key
3. Automatically save the API key to your shell configuration
4. Set the provider as your default

```bash
cd your-project

# First run - interactive setup
git-ai-commit

# Output:
# 🤖 Welcome to git-ai-commit!
#
# Please select your preferred LLM provider:
#
#   1. OpenAI (GPT-4)
#   2. Anthropic (Claude)
#   3. Google Gemini
#
# Enter your choice (1-3): 2
#
# ✓ Set anthropic as default provider
#
# 🔑 Anthropic API key not found.
#
# Get your API key from: https://console.anthropic.com/
#
# Enter your Anthropic API key: sk-ant-your-key-here
#
# ✓ API key saved to /Users/you/.zshrc
# ✓ API key set for current session
```

**Alternative: Manual Setup (Optional)**

If you prefer to set up manually:

```bash
# Set API key
export OPENAI_API_KEY=sk-your-key-here
# or
export ANTHROPIC_API_KEY=sk-ant-your-key-here
# or
export GEMINI_API_KEY=your-key-here

# Set default provider
git-ai-commit config --set-provider anthropic
```

## Using git-ai-commit (1 minute)

After the interactive setup, you're ready to use git-ai-commit!

### 1. Make some changes

```bash
# Edit a file in your git repository
echo "console.log('hello');" >> index.js
```

### 2. Run git-ai-commit

```bash
git-ai-commit
```

Expected output:
```
📝 Generated branch name: feature-add-hello-log
✓ Created and checked out branch: feature-add-hello-log
✓ Staged all changes
💬 Generated commit message:
  "feat: add hello world console log"
✓ Created commit
✓ Pushed to origin/feature-add-hello-log
✨ All done! Your changes have been committed and pushed.
```

### 3. Preview with dry-run (optional)

To see what would be generated without committing:

```bash
git-ai-commit --dry-run
```

Output:
```
📝 Generated branch name: feature-add-hello-log
[DRY RUN] Would execute:
  git checkout -b feature-add-hello-log
  git add .
💬 Generated commit message:
  "feat: add hello world console log"
  git commit -m "feat: add hello world console log"
  git push origin feature-add-hello-log
[DRY RUN] No changes were made to the repository.
```

## Common Commands

```bash
# Basic usage (uses OpenAI by default)
git-ai-commit

# Use different provider
git-ai-commit --provider anthropic
git-ai-commit --provider gemini

# Preview without committing
git-ai-commit --dry-run

# Show detailed logs
git-ai-commit --verbose

# Combine options
git-ai-commit --provider anthropic --dry-run --verbose
```

## Typical Workflow

```bash
# 1. Make changes to your code
vim src/app.ts

# 2. Preview what will be generated
git-ai-commit --dry-run

# 3. If satisfied, commit
git-ai-commit

# Done! Your changes are committed and pushed
```

## Tips

### Tip 1: Use Aliases

Add to `~/.zshrc` or `~/.bashrc`:
```bash
alias gac="git-ai-commit"
alias gacd="git-ai-commit --dry-run"
alias gacv="git-ai-commit --verbose"
```

Then use:
```bash
gac      # Quick commit
gacd     # Preview
gacv     # Verbose commit
```

### Tip 2: Always Dry-Run First

```bash
# Good practice:
git-ai-commit --dry-run   # Check
git-ai-commit             # Commit

# Or combine:
gacd && gac
```

### Tip 3: Use Verbose for Debugging

```bash
git-ai-commit --verbose
```

Shows every step and git command executed.

## Troubleshooting

### "Command not found"

```bash
# Try:
npm install -g .

# Or:
npm link

# Or restart terminal
```

### "Not inside a git repository"

```bash
# Make sure you're in a git repo:
git init

# Or navigate to existing repo:
cd /path/to/your/repo
```

### "No changes detected"

```bash
# Make sure you have changes:
git status

# If no changes, edit some files first
```

### "API key not set"

```bash
# Set the key for your provider:
export OPENAI_API_KEY=your-key
export ANTHROPIC_API_KEY=your-key
export GEMINI_API_KEY=your-key
```

## Getting API Keys

### OpenAI
1. Visit: https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### Anthropic
1. Visit: https://console.anthropic.com/
2. Sign in or create account
3. Go to API Keys
4. Create new key
5. Copy the key (starts with `sk-ant-`)

### Google Gemini
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Create API key
4. Copy the key

## Example Session

```bash
$ cd my-app
$ git status
On branch main
Changes not staged for commit:
  modified:   src/auth.ts
  modified:   src/login.ts

$ git-ai-commit --dry-run
📝 Generated branch name: feature-add-jwt-authentication
[DRY RUN] Would execute:
  git checkout -b feature-add-jwt-authentication
  git add .
💬 Generated commit message:
  "feat: implement JWT authentication for login endpoint"
  git commit -m "feat: implement JWT authentication for login endpoint"
  git push origin feature-add-jwt-authentication
[DRY RUN] No changes were made to the repository.

$ git-ai-commit
📝 Generated branch name: feature-add-jwt-authentication
✓ Created and checked out branch: feature-add-jwt-authentication
✓ Staged all changes
💬 Generated commit message:
  "feat: implement JWT authentication for login endpoint"
✓ Created commit
✓ Pushed to origin/feature-add-jwt-authentication
✨ All done! Your changes have been committed and pushed.
```

## Next Steps

1. Read the full [README.md](README.md) for detailed documentation
2. Check out [EXAMPLES.md](EXAMPLES.md) for more real-world scenarios
3. Customize prompts in `src/index.ts` if needed
4. Set up shell aliases for faster access

## Need Help?

- Run: `git-ai-commit --help`
- Check: [README.md](README.md)
- See: [EXAMPLES.md](EXAMPLES.md)
- Review: [CHANGELOG.md](CHANGELOG.md)

---

**You're all set! Start committing with AI! 🚀**
