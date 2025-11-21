# Configuration Guide

git-ai-commit supports configuration files to set default options, so you don't need to specify them every time.

## Quick Start

Set Anthropic as your default provider:

```bash
git-ai-commit config --set-provider anthropic
```

Now you can just run:

```bash
git-ai-commit  # Will use Anthropic automatically
```

## Configuration Precedence

Settings are applied in this order (highest to lowest priority):

1. **CLI Flags** - Options passed on the command line
2. **Local Config** - `.git-ai-commit.json` in current directory
3. **Global Config** - `~/.git-ai-commit.json` in home directory
4. **Default** - Built-in defaults (OpenAI, no verbose, no dry-run)

## Configuration File Locations

### Global Configuration

**Location**: `~/.git-ai-commit.json`

**Applies to**: All projects on your machine

**Use when**: You want consistent defaults across all your projects

```bash
# Set global defaults
git-ai-commit config --set-provider anthropic --global
```

### Local Configuration

**Location**: `./.git-ai-commit.json` (current directory)

**Applies to**: Current project only

**Use when**: You want project-specific settings

```bash
# Set local defaults for this project
git-ai-commit config --set-provider gemini --local
```

## Configuration Options

### Provider

Set the default LLM provider:

```bash
# Use OpenAI (GPT-4)
git-ai-commit config --set-provider openai

# Use Anthropic (Claude)
git-ai-commit config --set-provider anthropic

# Use Google Gemini
git-ai-commit config --set-provider gemini
```

### Verbose Mode

Enable detailed logging by default:

```bash
# Enable verbose mode
git-ai-commit config --set-verbose true

# Disable verbose mode
git-ai-commit config --set-verbose false
```

### Dry-Run Mode

Enable dry-run mode by default (useful for testing):

```bash
# Enable dry-run mode
git-ai-commit config --set-dry-run true

# Disable dry-run mode
git-ai-commit config --set-dry-run false
```

## Command Reference

### Show Configuration

Display current configuration and config file locations:

```bash
git-ai-commit config --show
```

Output:
```
📋 Current Configuration:

  Provider: anthropic
  Verbose:  false
  Dry Run:  false

📁 Config Files:

  Global: /Users/you/.git-ai-commit.json ✓
  Local:  /path/to/project/.git-ai-commit.json (not found)

💡 Note: CLI flags override config file settings
```

### Set Multiple Options

You can set multiple options at once:

```bash
# Set provider and enable verbose
git-ai-commit config --set-provider anthropic --set-verbose true

# Set all options
git-ai-commit config --set-provider gemini --set-verbose true --set-dry-run false
```

### Global vs Local

By default, settings are saved globally. Use `--local` for project-specific settings:

```bash
# Global (default) - affects all projects
git-ai-commit config --set-provider anthropic

# Explicit global flag (same as above)
git-ai-commit config --set-provider anthropic --global

# Local - affects current project only
git-ai-commit config --set-provider anthropic --local
```

## Configuration File Format

The configuration file is a simple JSON file:

**~/.git-ai-commit.json** (Global):
```json
{
  "provider": "anthropic",
  "verbose": false,
  "dryRun": false
}
```

**./.git-ai-commit.json** (Local):
```json
{
  "provider": "gemini",
  "verbose": true
}
```

You can also create or edit these files manually if you prefer.

## Use Cases

### Use Case 1: Consistent Provider Across All Projects

You prefer Anthropic for all your work:

```bash
# Set globally once
git-ai-commit config --set-provider anthropic

# Now use it everywhere without flags
cd ~/project1
git-ai-commit

cd ~/project2
git-ai-commit
```

### Use Case 2: Different Provider Per Project

You want to use different providers for different projects:

```bash
# Work project - use Anthropic
cd ~/work-project
git-ai-commit config --set-provider anthropic --local

# Personal project - use OpenAI
cd ~/personal-project
git-ai-commit config --set-provider openai --local

# Open source project - use Gemini
cd ~/oss-project
git-ai-commit config --set-provider gemini --local
```

### Use Case 3: Development vs Production

Enable verbose and dry-run for development:

```bash
# Development
cd ~/my-project
git-ai-commit config --set-verbose true --set-dry-run true --local

# When committing to production, override with flags
git-ai-commit --dry-run false
```

### Use Case 4: Team Configuration

Commit local config to share settings with your team:

```bash
# Create local config for the team
git-ai-commit config --set-provider anthropic --local

# Remove from .gitignore (if you want to share)
# Edit .gitignore and remove .git-ai-commit.json

# Commit it
git add .git-ai-commit.json
git commit -m "chore: add default git-ai-commit config"
git push

# Team members get the config when they pull
```

**Note**: By default, `.git-ai-commit.json` is in `.gitignore` to prevent accidental commits. Remove it from `.gitignore` if you want to share team defaults.

## Override Config with CLI Flags

CLI flags always take precedence over config:

```bash
# Config says: provider=anthropic
# But you want to use OpenAI this one time:
git-ai-commit --provider openai

# Config says: verbose=false
# But you want to debug this run:
git-ai-commit --verbose

# Config says: dry-run=true
# But you want to actually commit:
git-ai-commit --dry-run false
```

## Examples

### Example 1: First-Time Setup

```bash
# Install
npm install -g git-ai-commit

# Set API key
export ANTHROPIC_API_KEY=sk-ant-...

# Set default provider
git-ai-commit config --set-provider anthropic

# Use it (no flags needed!)
cd my-project
git-ai-commit
```

### Example 2: Per-Project Setup

```bash
# Project A - Use Anthropic
cd ~/project-a
git-ai-commit config --set-provider anthropic --local

# Project B - Use OpenAI
cd ~/project-b
git-ai-commit config --set-provider openai --local

# Project C - Use Gemini with verbose
cd ~/project-c
git-ai-commit config --set-provider gemini --set-verbose true --local
```

### Example 3: Switching Providers

```bash
# Currently using OpenAI
git-ai-commit config --show

# Switch to Anthropic
git-ai-commit config --set-provider anthropic

# Verify
git-ai-commit config --show
```

### Example 4: Testing Mode

```bash
# Enable dry-run by default for testing
git-ai-commit config --set-dry-run true

# All runs will be dry-run
git-ai-commit  # Dry-run
git-ai-commit  # Dry-run

# When ready to commit for real, override
git-ai-commit --dry-run false

# Or disable dry-run default
git-ai-commit config --set-dry-run false
```

## Troubleshooting

### Issue: Config changes not taking effect

**Problem**: You changed the config but it's still using old settings.

**Solutions**:
1. Check if there's a local config overriding your global config:
   ```bash
   git-ai-commit config --show
   ```

2. Make sure you're using the right scope (--global vs --local)

3. CLI flags override config - make sure you're not passing flags

### Issue: Can't find config file

**Problem**: Config file doesn't exist.

**Solution**: Create it with a config command:
```bash
git-ai-commit config --set-provider anthropic
```

### Issue: Want to reset to defaults

**Solution**: Delete the config file(s):
```bash
# Delete global config
rm ~/.git-ai-commit.json

# Delete local config
rm ./.git-ai-commit.json
```

Or manually edit the file to remove unwanted settings.

### Issue: Invalid JSON in config file

**Problem**: Manually edited config has syntax errors.

**Solution**:
1. Check JSON syntax with a validator
2. Or recreate with config commands:
   ```bash
   git-ai-commit config --set-provider anthropic
   ```

## Tips

1. **Start global**: Set your preferred provider globally, override locally when needed

2. **Use --show often**: Check current settings with `git-ai-commit config --show`

3. **CLI flags for experimentation**: Try different providers without changing config:
   ```bash
   git-ai-commit --provider anthropic --dry-run
   git-ai-commit --provider gemini --dry-run
   git-ai-commit --provider openai --dry-run
   ```

4. **Verbose for debugging**: Enable verbose in config for projects you're actively debugging:
   ```bash
   git-ai-commit config --set-verbose true --local
   ```

5. **Dry-run for safety**: Enable dry-run in config for important repos:
   ```bash
   git-ai-commit config --set-dry-run true --local
   ```

## Security Note

Config files do NOT store API keys. API keys must be set as environment variables:

```bash
export OPENAI_API_KEY=sk-...
export ANTHROPIC_API_KEY=sk-ant-...
export GEMINI_API_KEY=...
```

Never commit API keys to config files!

---

**For more information**, see:
- [README.md](README.md) - Full documentation
- [QUICKSTART.md](QUICKSTART.md) - Getting started guide
- [EXAMPLES.md](EXAMPLES.md) - Usage examples
