# git-ai-commit Examples

Real-world usage examples and scenarios for git-ai-commit.

## Table of Contents

1. [Configuration Examples](#configuration-examples)
2. [Basic Usage](#basic-usage)
3. [Provider-Specific Examples](#provider-specific-examples)
4. [Workflow Scenarios](#workflow-scenarios)
5. [Advanced Usage](#advanced-usage)
6. [Integration Examples](#integration-examples)

## Configuration Examples

### Example 0: First-Time Interactive Setup

**Scenario**: You just installed git-ai-commit and running it for the first time.

```bash
# First run - no API key set, no provider configured
$ git-ai-commit

🤖 Welcome to git-ai-commit!

Please select your preferred LLM provider:

  1. OpenAI (GPT-4)
  2. Anthropic (Claude)
  3. Google Gemini

Enter your choice (1-3): 2

✓ Set anthropic as default provider

🔑 Anthropic API key not found.

Get your API key from: https://console.anthropic.com/

Enter your Anthropic API key: sk-ant-api03-xyz...

✓ API key saved to /Users/you/.zshrc
✓ API key set for current session

💡 For future terminal sessions, run: source /Users/you/.zshrc

# Now the tool proceeds with the normal workflow
📝 Generated branch name: feature-add-user-auth
✓ Created and checked out branch: feature-add-user-auth
✓ Staged all changes
💬 Generated commit message:
  "feat: implement user authentication system"
✓ Created commit
✓ Pushed to origin/feature-add-user-auth

✨ All done! Your changes have been committed and pushed.

# Future runs will use the saved configuration automatically!
```

### Example 1: Set Default Provider

**Scenario**: You prefer Anthropic and don't want to type `--provider anthropic` every time.

```bash
# Set Anthropic as default globally
$ git-ai-commit config --set-provider anthropic
✓ Configuration saved to /Users/you/.git-ai-commit.json

✨ Configuration updated!

📋 Current Configuration:

  Provider: anthropic
  Verbose:  false
  Dry Run:  false

# Now just run git-ai-commit
$ git-ai-commit
# Uses Anthropic automatically!
```

### Example 2: Project-Specific Configuration

**Scenario**: You have different projects that need different providers.

```bash
# Work project - uses company's Anthropic account
$ cd ~/work-project
$ git-ai-commit config --set-provider anthropic --local
✓ Configuration saved to /Users/you/work-project/.git-ai-commit.json

# Personal project - uses your OpenAI account
$ cd ~/personal-project
$ git-ai-commit config --set-provider openai --local
✓ Configuration saved to /Users/you/personal-project/.git-ai-commit.json

# Open source - uses Gemini
$ cd ~/oss-project
$ git-ai-commit config --set-provider gemini --local
✓ Configuration saved to /Users/you/oss-project/.git-ai-commit.json

# Now each project uses its own provider automatically
$ cd ~/work-project && git-ai-commit    # Uses Anthropic
$ cd ~/personal-project && git-ai-commit  # Uses OpenAI
$ cd ~/oss-project && git-ai-commit     # Uses Gemini
```

### Example 3: Show Configuration

**Scenario**: You want to check what provider you're using.

```bash
$ git-ai-commit config --show

📋 Current Configuration:

  Provider: anthropic
  Verbose:  false
  Dry Run:  false

📁 Config Files:

  Global: /Users/you/.git-ai-commit.json ✓
  Local:  /Users/you/project/.git-ai-commit.json (not found)

💡 Note: CLI flags override config file settings
```

### Example 4: Enable Verbose Mode by Default

**Scenario**: You're debugging and want verbose output always.

```bash
# Enable verbose globally
$ git-ai-commit config --set-verbose true
✓ Configuration saved to /Users/you/.git-ai-commit.json

# Or just for this project
$ git-ai-commit config --set-verbose true --local
✓ Configuration saved to /Users/you/project/.git-ai-commit.json

# Now all runs are verbose
$ git-ai-commit
[VERBOSE] Checking if current directory is a git repository...
[GIT] git rev-parse --is-inside-work-tree
...
```

### Example 5: Override Configuration

**Scenario**: You have Anthropic set as default but want to try OpenAI once.

```bash
# Config says Anthropic
$ git-ai-commit config --show
Provider: anthropic

# But use OpenAI just this time
$ git-ai-commit --provider openai
# Uses OpenAI this run

# Next run uses Anthropic again (from config)
$ git-ai-commit
# Uses Anthropic
```

### Example 6: Multiple Settings at Once

**Scenario**: Set up a new project with specific settings.

```bash
$ cd ~/new-project

# Set multiple options at once (local)
$ git-ai-commit config --set-provider gemini --set-verbose true --local
✓ Configuration saved to /Users/you/new-project/.git-ai-commit.json

✨ Configuration updated!

📋 Current Configuration:

  Provider: gemini
  Verbose:  true
  Dry Run:  false
```

## Basic Usage

### Example 1: Simple Feature Addition

**Scenario**: You've added a new login feature to your application.

```bash
# Make your changes
# ... edit files ...

# Run git-ai-commit
$ git-ai-commit

📝 Generated branch name: feature-add-user-login-endpoint
✓ Created and checked out branch: feature-add-user-login-endpoint
✓ Staged all changes

💬 Generated commit message:
  "feat: add user login endpoint with JWT authentication"
✓ Created commit
✓ Pushed to origin/feature-add-user-login-endpoint

✨ All done! Your changes have been committed and pushed.
```

### Example 2: Bug Fix

**Scenario**: You've fixed a null pointer exception.

```bash
$ git-ai-commit

📝 Generated branch name: fix-null-pointer-user-service
✓ Created and checked out branch: fix-null-pointer-user-service
✓ Staged all changes

💬 Generated commit message:
  "fix: handle null pointer exception in user service"
✓ Created commit
✓ Pushed to origin/fix-null-pointer-user-service

✨ All done! Your changes have been committed and pushed.
```

### Example 3: Documentation Update

**Scenario**: Updated API documentation.

```bash
$ git-ai-commit

📝 Generated branch name: docs-update-api-documentation
✓ Created and checked out branch: docs-update-api-documentation
✓ Staged all changes

💬 Generated commit message:
  "docs: update API documentation with new endpoints"
✓ Created commit
✓ Pushed to origin/docs-update-api-documentation

✨ All done! Your changes have been committed and pushed.
```

## Provider-Specific Examples

### Using OpenAI (GPT-4)

```bash
# OpenAI is the default
$ git-ai-commit

# Or explicitly specify
$ git-ai-commit --provider openai

# With verbose logging
$ git-ai-commit --provider openai --verbose
[VERBOSE] Checking if current directory is a git repository...
[VERBOSE] Inspecting current changes...
[VERBOSE] Found changes:
 M src/auth/login.ts
 A src/auth/jwt.ts
[VERBOSE] Generating branch name with LLM...
[GIT] git checkout -b feature-add-jwt-authentication
[VERBOSE] Creating new branch...
...
```

### Using Anthropic Claude

```bash
# Set API key
$ export ANTHROPIC_API_KEY=sk-ant-...

# Run with Anthropic
$ git-ai-commit --provider anthropic

📝 Generated branch name: feature-implement-jwt-auth-system
✓ Created and checked out branch: feature-implement-jwt-auth-system
...
```

### Using Google Gemini

```bash
# Set API key
$ export GEMINI_API_KEY=...

# Run with Gemini
$ git-ai-commit --provider gemini

📝 Generated branch name: feature-add-authentication-system
✓ Created and checked out branch: feature-add-authentication-system
...
```

## Workflow Scenarios

### Scenario 1: Testing Before Committing (Dry-Run)

**Use Case**: You want to see what branch name and commit message would be generated before actually committing.

```bash
$ git-ai-commit --dry-run

📝 Generated branch name: feature-add-user-profile-page

[DRY RUN] Would execute:
  git checkout -b feature-add-user-profile-page
  git add .

💬 Generated commit message:
  "feat: add user profile page with edit functionality"
  git commit -m "feat: add user profile page with edit functionality"
  git push origin feature-add-user-profile-page

[DRY RUN] No changes were made to the repository.
```

### Scenario 2: Verbose Debugging

**Use Case**: You want to see exactly what's happening at each step.

```bash
$ git-ai-commit --verbose

[VERBOSE] Checking if current directory is a git repository...
[GIT] git rev-parse --is-inside-work-tree
[VERBOSE] Inspecting current changes...
[GIT] git status --short
[VERBOSE] Found changes:
 M src/components/Header.tsx
 M src/styles/global.css

[VERBOSE] Generating branch name with LLM...
📝 Generated branch name: refactor-header-component-styling

[VERBOSE] Creating new branch...
[GIT] git checkout -b refactor-header-component-styling
✓ Created and checked out branch: refactor-header-component-styling

[VERBOSE] Staging all changes...
[GIT] git add .
✓ Staged all changes

[VERBOSE] Generating commit message with LLM...
💬 Generated commit message:
  "refactor: improve header component styling and responsiveness"

[VERBOSE] Creating commit...
[GIT] git commit -m "refactor: improve header component styling and responsiveness"
✓ Created commit

[VERBOSE] Pushing to remote...
[GIT] git push origin refactor-header-component-styling
✓ Pushed to origin/refactor-header-component-styling

✨ All done! Your changes have been committed and pushed.
```

### Scenario 3: Multiple Small Changes

**Use Case**: You've made several small refactoring changes.

```bash
# Refactored database query logic
$ git-ai-commit

📝 Generated branch name: refactor-optimize-database-queries
💬 Generated commit message:
  "refactor: optimize database query performance with indexing"
✓ All done!
```

### Scenario 4: Large Codebase Changes

**Use Case**: Made extensive changes across multiple files.

```bash
$ git-ai-commit --provider anthropic --verbose

# The tool automatically truncates large diffs to avoid token limits
[VERBOSE] Found changes:
 M src/api/users.ts
 M src/api/auth.ts
 M src/models/User.ts
 M src/services/email.ts
 A src/utils/validation.ts
 M tests/auth.test.ts
 ... (25 more files)

📝 Generated branch name: feature-implement-complete-auth-system
💬 Generated commit message:
  "feat: implement complete authentication system with email verification"
✓ All done!
```

## Advanced Usage

### Example 1: Combining Options

```bash
# Dry-run with verbose output using Anthropic
$ git-ai-commit --provider anthropic --dry-run --verbose

[VERBOSE] Checking if current directory is a git repository...
[VERBOSE] Inspecting current changes...
[VERBOSE] Found changes:
 M README.md

[VERBOSE] Generating branch name with LLM...
📝 Generated branch name: docs-update-installation-guide

[DRY RUN] Would execute:
  git checkout -b docs-update-installation-guide
  git add .

[VERBOSE] Generating commit message with LLM...
💬 Generated commit message:
  "docs: update installation guide with troubleshooting section"
  git commit -m "docs: update installation guide with troubleshooting section"
  git push origin docs-update-installation-guide

[DRY RUN] No changes were made to the repository.
```

### Example 2: Handling Existing Branch Names

**Scenario**: The generated branch name already exists.

```bash
$ git-ai-commit

[VERBOSE] Branch feature-add-login exists, trying feature-add-login-2
📝 Generated branch name: feature-add-login-2
✓ Created and checked out branch: feature-add-login-2
...
```

### Example 3: Different Types of Commits

**Feature Addition**:
```bash
$ git-ai-commit
# Output: feature-add-payment-integration
# Commit: "feat: integrate Stripe payment gateway"
```

**Bug Fix**:
```bash
$ git-ai-commit
# Output: fix-memory-leak-in-websocket
# Commit: "fix: resolve memory leak in WebSocket connection handler"
```

**Refactoring**:
```bash
$ git-ai-commit
# Output: refactor-simplify-authentication-logic
# Commit: "refactor: simplify authentication middleware logic"
```

**Tests**:
```bash
$ git-ai-commit
# Output: test-add-integration-tests-api
# Commit: "test: add integration tests for API endpoints"
```

**Chores**:
```bash
$ git-ai-commit
# Output: chore-update-dependencies
# Commit: "chore: update npm dependencies to latest versions"
```

## Integration Examples

### Example 1: With Git Hooks

Create a pre-commit script that uses dry-run to preview:

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Previewing AI-generated commit message..."
git-ai-commit --dry-run
```

### Example 2: In a Shell Script

```bash
#!/bin/bash
# deploy.sh

set -e

# Make changes
echo "Making changes..."
# ... your changes ...

# Use git-ai-commit to commit
echo "Committing with AI..."
git-ai-commit --provider openai

echo "Deployment complete!"
```

### Example 3: With Environment-Specific Providers

```bash
# dev-commit.sh
#!/bin/bash

# Use different providers for different environments
if [[ "$ENV" == "production" ]]; then
  git-ai-commit --provider anthropic --verbose
else
  git-ai-commit --provider openai
fi
```

### Example 4: Automated Testing Workflow

```bash
#!/bin/bash
# test-and-commit.sh

# Run tests
npm test

# If tests pass, commit with AI
if [ $? -eq 0 ]; then
  echo "Tests passed! Committing changes..."
  git-ai-commit
else
  echo "Tests failed. Fix errors before committing."
  exit 1
fi
```

## Common Patterns

### Pattern 1: Quick Feature Development

```bash
# 1. Start working
cd my-project
# ... make changes ...

# 2. Preview what would be generated
git-ai-commit --dry-run

# 3. If satisfied, commit for real
git-ai-commit

# 4. Continue working on the same branch if needed
# ... more changes ...
git add .
git commit -m "Additional changes"
git push
```

### Pattern 2: Experimentation with Dry-Run

```bash
# Try different providers to see which generates better output
git-ai-commit --provider openai --dry-run
git-ai-commit --provider anthropic --dry-run
git-ai-commit --provider gemini --dry-run

# Choose the best one and run for real
git-ai-commit --provider anthropic
```

### Pattern 3: Debugging Issues

```bash
# Enable verbose mode to see what's happening
git-ai-commit --verbose

# If something fails, you'll see:
[VERBOSE] Checking if current directory is a git repository...
[GIT] git rev-parse --is-inside-work-tree
[ERROR] Not inside a git repository
```

## Error Scenarios

### No Changes

```bash
$ git-ai-commit
No changes detected. Nothing to commit.
```

### Not a Git Repository

```bash
$ cd /tmp
$ git-ai-commit
[ERROR] Not inside a git repository
```

### Missing API Key

```bash
$ git-ai-commit --provider anthropic
[ERROR] ANTHROPIC_API_KEY environment variable is not set
```

### Git Push Failure

```bash
$ git-ai-commit
📝 Generated branch name: feature-add-new-api
✓ Created and checked out branch: feature-add-new-api
✓ Staged all changes
💬 Generated commit message: "feat: add new API endpoint"
✓ Created commit
[ERROR] Git command failed: git push origin feature-add-new-api
fatal: The current branch has no upstream branch.
```

## Tips and Tricks

### Tip 1: Use Aliases

Add to your `.bashrc` or `.zshrc`:

```bash
alias gac="git-ai-commit"
alias gacd="git-ai-commit --dry-run"
alias gacv="git-ai-commit --verbose"
alias gaca="git-ai-commit --provider anthropic"
alias gacg="git-ai-commit --provider gemini"
```

Usage:
```bash
$ gac              # Quick commit
$ gacd             # Preview
$ gacv             # Verbose commit
$ gaca             # Use Anthropic
```

### Tip 2: Provider Selection Based on Task

```bash
# For complex refactoring, use Anthropic (better at understanding context)
git-ai-commit --provider anthropic

# For quick fixes, use OpenAI (faster)
git-ai-commit --provider openai

# For experimentation, try all and compare
git-ai-commit --provider openai --dry-run
git-ai-commit --provider anthropic --dry-run
git-ai-commit --provider gemini --dry-run
```

### Tip 3: Review Before Pushing

```bash
# Use dry-run first
git-ai-commit --dry-run

# If you like it, commit locally but review before pushing
git-ai-commit
git log -1  # Review the commit
git show    # See the changes

# Push manually if satisfied
git push origin $(git branch --show-current)
```

---

**Need more examples?** Check out the main [README.md](README.md) for detailed documentation.
