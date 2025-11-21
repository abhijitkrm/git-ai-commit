#!/usr/bin/env bash

# git-ai-commit Installation Script
# Builds and installs the git-ai-commit CLI tool

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "${BOLD}git-ai-commit Installation Script${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo -e "${YELLOW}Please install Node.js >= 18.0.0 from https://nodejs.org/${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}Error: Node.js version must be >= 18.0.0${NC}"
    echo -e "${YELLOW}Current version: $(node -v)${NC}"
    echo -e "${YELLOW}Please upgrade Node.js from https://nodejs.org/${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) detected${NC}\n"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to install dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Dependencies installed${NC}\n"

# Build TypeScript
echo -e "${BLUE}Building TypeScript...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to build TypeScript${NC}"
    exit 1
fi

echo -e "${GREEN}✓ TypeScript built successfully${NC}\n"

# Make the dist file executable
chmod +x dist/index.js

# Install globally
echo -e "${BLUE}Installing globally...${NC}"
npm install -g .

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Warning: Global install failed. You may need to use sudo:${NC}"
    echo -e "${BOLD}  sudo npm install -g .${NC}\n"
    echo -e "${YELLOW}Or use npm link:${NC}"
    echo -e "${BOLD}  npm link${NC}\n"
else
    echo -e "${GREEN}✓ Installed globally${NC}\n"
fi

# Check if command is available
if command -v git-ai-commit &> /dev/null; then
    echo -e "${GREEN}${BOLD}Installation complete!${NC}\n"
    echo -e "${GREEN}✓ git-ai-commit is ready to use!${NC}\n"
else
    echo -e "${YELLOW}Installation complete, but command not found in PATH${NC}"
    echo -e "${YELLOW}You may need to:${NC}"
    echo -e "  1. Restart your terminal"
    echo -e "  2. Or run: ${BOLD}source ~/.bashrc${NC} / ${BOLD}source ~/.zshrc${NC}"
    echo -e "  3. Or use: ${BOLD}npm link${NC}\n"
fi

# API Key setup reminder
echo -e "${BOLD}Next Steps:${NC}"
echo -e "1. Set up your API key:\n"
echo -e "   For OpenAI:"
echo -e "     ${CYAN}export OPENAI_API_KEY=your-api-key${NC}\n"
echo -e "   For Anthropic:"
echo -e "     ${CYAN}export ANTHROPIC_API_KEY=your-api-key${NC}\n"
echo -e "   For Google Gemini:"
echo -e "     ${CYAN}export GEMINI_API_KEY=your-api-key${NC}\n"
echo -e "2. Run: ${BOLD}git-ai-commit --help${NC}\n"
echo -e "3. Try it: ${BOLD}git-ai-commit --dry-run${NC}\n"

echo -e "${BOLD}Quick Start:${NC}"
echo -e "  ${CYAN}git-ai-commit${NC}                    - Use OpenAI (default)"
echo -e "  ${CYAN}git-ai-commit --provider anthropic${NC} - Use Anthropic"
echo -e "  ${CYAN}git-ai-commit --dry-run${NC}            - Preview without committing"
echo -e "  ${CYAN}git-ai-commit --verbose${NC}            - Show detailed logging"
echo ""
echo -e "For more information, see: ${BOLD}README.md${NC}"
