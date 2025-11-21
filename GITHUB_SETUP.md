# GitHub Setup Guide

This guide will help you publish git-ai-commit to GitHub and set up all features.

## Initial Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `git-ai-commit`
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)
4. Choose "Public" for open source or "Private" if preferred

### 2. Initialize Git and Push

```bash
cd /Users/abhijitkumar/git-ai-commit

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: initial commit with complete TypeScript CLI tool

- Multi-provider LLM support (OpenAI, Anthropic, Gemini)
- Complete git workflow automation
- Dry-run and verbose modes
- Comprehensive documentation
- GitHub Actions CI/CD
- Issue and PR templates"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/git-ai-commit.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Update URLs in Files

Replace `YOUR_USERNAME` with your actual GitHub username in these files:

**README.md:**
```bash
sed -i '' 's/YOUR_USERNAME/your-github-username/g' README.md
```

**package.json:**
```bash
sed -i '' 's/YOUR_USERNAME/your-github-username/g' package.json
```

**CONTRIBUTING.md:**
```bash
sed -i '' 's/YOUR_USERNAME/your-github-username/g' CONTRIBUTING.md
```

Or manually find and replace:
- All instances of `YOUR_USERNAME` with your GitHub username
- Update author email in `package.json`

### 4. Commit URL Updates

```bash
git add README.md package.json CONTRIBUTING.md
git commit -m "docs: update GitHub username in documentation"
git push
```

## GitHub Repository Settings

### 1. Repository Description

Go to your repository on GitHub and add:

**Description:**
```
Automate git workflow with AI-generated branch names and commit messages using OpenAI, Anthropic, or Google Gemini
```

**Website:**
```
https://github.com/YOUR_USERNAME/git-ai-commit
```

**Topics:** (Click gear icon next to "About")
```
git, ai, cli, openai, anthropic, gemini, typescript, nodejs, automation, llm, conventional-commits, git-workflow
```

### 2. Enable GitHub Features

Go to Settings → General:

- ✅ **Issues** - Enable issue tracking
- ✅ **Discussions** - Enable community discussions (recommended)
- ✅ **Projects** - Enable if you want project boards
- ✅ **Wiki** - Optional
- ✅ **Sponsorships** - Enable if using GitHub Sponsors

### 3. Branch Protection Rules

Go to Settings → Branches → Add rule:

**For `main` branch:**
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
  - Select: CI build job
- ✅ Require branches to be up to date before merging
- ✅ Include administrators (recommended)

### 4. Labels

GitHub will automatically create standard labels. Add custom ones:

Go to Issues → Labels → New label:

**Priority Labels:**
- `priority: high` - #d73a4a
- `priority: medium` - #fbca04
- `priority: low` - #0e8a16

**Type Labels:**
- `type: feature` - #0075ca
- `type: bug` - #d73a4a
- `type: docs` - #0075ca
- `type: refactor` - #fbca04

**Status Labels:**
- `status: needs-review` - #fbca04
- `status: in-progress` - #0e8a16
- `status: blocked` - #d73a4a

**Special Labels:**
- `good first issue` - #7057ff
- `help wanted` - #008672

### 5. Enable GitHub Actions

GitHub Actions should be enabled by default. Verify:

1. Go to Actions tab
2. You should see the CI workflow
3. It will run automatically on push and PR

### 6. Security Settings

Go to Settings → Security:

- ✅ Enable **Dependabot alerts**
- ✅ Enable **Dependabot security updates**
- ✅ Enable **Secret scanning** (if public repo)
- ✅ Enable **Private vulnerability reporting**

## Optional GitHub Features

### GitHub Pages (Documentation)

If you want to host documentation:

1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main`, folder: `/docs` (create docs folder first)
4. Your site will be at: `https://YOUR_USERNAME.github.io/git-ai-commit/`

### GitHub Sponsors

If you want to accept sponsorships:

1. Set up [GitHub Sponsors](https://github.com/sponsors)
2. Update `.github/FUNDING.yml` with your sponsor username:
   ```yaml
   github: your-username
   ```

### Social Preview

Add a social preview image:

1. Create an image (1280×640px recommended)
2. Go to Settings → General → Social preview
3. Upload your image

## npm Package Publishing (Optional)

To publish as an npm package:

### 1. Login to npm

```bash
npm login
```

### 2. Update package.json

Make sure these are set:
```json
{
  "name": "@your-username/git-ai-commit",
  "version": "1.0.0",
  "publishConfig": {
    "access": "public"
  }
}
```

### 3. Publish

```bash
npm publish
```

### 4. Update README

Add npm badges:
```markdown
[![npm version](https://badge.fury.io/js/git-ai-commit.svg)](https://www.npmjs.com/package/git-ai-commit)
[![npm downloads](https://img.shields.io/npm/dm/git-ai-commit.svg)](https://www.npmjs.com/package/git-ai-commit)
```

## Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Check for security issues
npm audit

# Fix security issues
npm audit fix
```

### Creating Releases

When you're ready for a new version:

```bash
# Update version
npm version patch  # or minor, or major

# Push with tags
git push --follow-tags

# Create GitHub release
gh release create v1.0.1 --generate-notes
```

Or manually on GitHub:
1. Go to Releases → Draft a new release
2. Choose tag (create new tag v1.0.1)
3. Set release title and description
4. Publish release

## Checklist

Before making your repository public:

- [ ] All URLs updated with your username
- [ ] Author information updated in package.json
- [ ] README badges working
- [ ] CI workflow passing
- [ ] .env.example has no real API keys
- [ ] .gitignore is properly configured
- [ ] LICENSE file is correct
- [ ] Repository description and topics set
- [ ] Branch protection rules configured
- [ ] Labels created
- [ ] Security features enabled
- [ ] Issues and Discussions enabled

## Post-Publication

### Promote Your Project

- Share on Twitter, Reddit, Hacker News
- Write a blog post about it
- Submit to:
  - [Product Hunt](https://www.producthunt.com/)
  - [Awesome Lists](https://github.com/topics/awesome)
  - Dev communities (Dev.to, Hashnode, etc.)

### Monitor

- Watch for GitHub Issues
- Respond to Pull Requests
- Monitor GitHub Discussions
- Check Dependabot alerts

## Getting Help

If you need help with GitHub setup:
- [GitHub Docs](https://docs.github.com/)
- [GitHub Community](https://github.com/community)
- [GitHub Support](https://support.github.com/)

---

**You're all set! Your project is now GitHub-ready! 🚀**
