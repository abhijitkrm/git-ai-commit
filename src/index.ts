#!/usr/bin/env node

/**
 * git-ai-commit - Automate git workflow with AI-generated branch names and commit messages
 *
 * USAGE:
 *   git-ai-commit [options]
 *   git-ai-commit config [options]
 *
 * OPTIONS:
 *   --provider <name>    LLM provider: openai|anthropic|gemini
 *   --dry-run            Show what would be done without making changes
 *   --verbose            Show detailed logging
 *   -h, --help           Display help information
 *
 * CONFIG COMMANDS:
 *   git-ai-commit config --show                          Show current configuration
 *   git-ai-commit config --set-provider <name>           Set default provider
 *   git-ai-commit config --set-provider anthropic        Set Anthropic as default
 *   git-ai-commit config --set-verbose true --global     Enable verbose globally
 *   git-ai-commit config --set-provider gemini --local   Set Gemini for this project
 *
 * ENVIRONMENT VARIABLES:
 *   OPENAI_API_KEY      API key for OpenAI
 *   ANTHROPIC_API_KEY   API key for Anthropic
 *   GEMINI_API_KEY      API key for Google Gemini (or GOOGLE_API_KEY)
 *
 * CONFIGURATION:
 *   Global config: ~/.git-ai-commit.json (affects all projects)
 *   Local config:  ./.git-ai-commit.json (project-specific)
 *   Priority: CLI flags > Local config > Global config > Defaults
 *
 * EXAMPLES:
 *   git-ai-commit                              # Use configured defaults
 *   git-ai-commit --provider anthropic         # Override provider
 *   git-ai-commit --dry-run --verbose          # Override flags
 *   git-ai-commit config --set-provider anthropic  # Set default to Anthropic
 *   git-ai-commit config --show                # Show configuration
 *
 * SETUP:
 *   1. Install dependencies: npm install
 *   2. Build: npm run build
 *   3. Install globally: npm install -g .
 *   4. Set API key: export ANTHROPIC_API_KEY=your-key-here
 *   5. Set default provider: git-ai-commit config --set-provider anthropic
 *   6. Run: git-ai-commit
 */

import { execSync } from 'child_process';
import { Command } from 'commander';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// ============================================================================
// Types and Interfaces
// ============================================================================

type Provider = 'openai' | 'anthropic' | 'gemini';

interface Config {
  provider?: Provider;
  verbose?: boolean;
  dryRun?: boolean;
}

interface CLIOptions {
  provider: Provider;
  dryRun: boolean;
  verbose: boolean;
}

interface GitChanges {
  status: string;
  diff: string;
  hasStagedChanges: boolean;
  hasUnstagedChanges: boolean;
}

interface LLMResponse {
  content: string;
}

// ============================================================================
// Configuration Management
// ============================================================================

class ConfigManager {
  private static readonly CONFIG_FILENAME = '.git-ai-commit.json';
  private static readonly GLOBAL_CONFIG_PATH = path.join(os.homedir(), ConfigManager.CONFIG_FILENAME);

  /**
   * Get local config path (in current directory)
   */
  private static getLocalConfigPath(): string {
    return path.join(process.cwd(), ConfigManager.CONFIG_FILENAME);
  }

  /**
   * Read config from a file
   */
  private static readConfigFile(filePath: string): Config | null {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
      }
    } catch (error) {
      // Silently fail - will use defaults
    }
    return null;
  }

  /**
   * Load configuration with precedence: Local > Global > Defaults
   */
  static loadConfig(): Config {
    // Try local config first
    const localConfig = this.readConfigFile(this.getLocalConfigPath());
    if (localConfig) {
      return localConfig;
    }

    // Try global config
    const globalConfig = this.readConfigFile(this.GLOBAL_CONFIG_PATH);
    if (globalConfig) {
      return globalConfig;
    }

    // Return defaults
    return {
      provider: 'openai',
      verbose: false,
      dryRun: false,
    };
  }

  /**
   * Save configuration globally
   */
  static saveGlobalConfig(config: Config): void {
    try {
      fs.writeFileSync(
        this.GLOBAL_CONFIG_PATH,
        JSON.stringify(config, null, 2),
        'utf-8'
      );
      console.log(`✓ Configuration saved to ${this.GLOBAL_CONFIG_PATH}`);
    } catch (error: any) {
      throw new Error(`Failed to save config: ${error.message}`);
    }
  }

  /**
   * Save configuration locally (in current directory)
   */
  static saveLocalConfig(config: Config): void {
    try {
      const localPath = this.getLocalConfigPath();
      fs.writeFileSync(
        localPath,
        JSON.stringify(config, null, 2),
        'utf-8'
      );
      console.log(`✓ Configuration saved to ${localPath}`);
    } catch (error: any) {
      throw new Error(`Failed to save config: ${error.message}`);
    }
  }

  /**
   * Display current configuration
   */
  static showConfig(): void {
    const config = this.loadConfig();
    const localConfigPath = this.getLocalConfigPath();
    const hasLocal = fs.existsSync(localConfigPath);
    const hasGlobal = fs.existsSync(this.GLOBAL_CONFIG_PATH);

    console.log('\n📋 Current Configuration:\n');
    console.log(`  Provider: ${config.provider}`);
    console.log(`  Verbose:  ${config.verbose || false}`);
    console.log(`  Dry Run:  ${config.dryRun || false}`);
    console.log('\n📁 Config Files:\n');
    console.log(`  Global: ${this.GLOBAL_CONFIG_PATH} ${hasGlobal ? '✓' : '(not found)'}`);
    console.log(`  Local:  ${localConfigPath} ${hasLocal ? '✓' : '(not found)'}`);
    console.log('\n💡 Note: CLI flags override config file settings\n');
  }
}

// ============================================================================
// Git Operations
// ============================================================================

class GitOperations {
  constructor(private verbose: boolean = false) {}

  /**
   * Execute a git command and return the output
   */
  private exec(command: string, options: { silent?: boolean; ignoreError?: boolean } = {}): string {
    if (this.verbose && !options.silent) {
      console.log(`[GIT] ${command}`);
    }

    try {
      const output = execSync(command, {
        encoding: 'utf-8',
        stdio: options.silent ? 'pipe' : 'pipe',
      });
      return output.trim();
    } catch (error: any) {
      if (options.ignoreError) {
        return '';
      }
      throw new Error(`Git command failed: ${command}\n${error.message}`);
    }
  }

  /**
   * Check if we're inside a git repository
   */
  isGitRepository(): boolean {
    try {
      this.exec('git rev-parse --is-inside-work-tree', { silent: true });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get current git status
   */
  getStatus(): string {
    return this.exec('git status --short');
  }

  /**
   * Get unstaged diff
   */
  getDiff(): string {
    return this.exec('git diff', { ignoreError: true });
  }

  /**
   * Get staged diff
   */
  getStagedDiff(): string {
    return this.exec('git diff --cached', { ignoreError: true });
  }

  /**
   * Get all changes (staged and unstaged)
   */
  getChanges(): GitChanges {
    const status = this.getStatus();
    const stagedDiff = this.getStagedDiff();
    const unstagedDiff = this.getDiff();

    return {
      status,
      diff: stagedDiff || unstagedDiff,
      hasStagedChanges: stagedDiff.length > 0,
      hasUnstagedChanges: unstagedDiff.length > 0,
    };
  }

  /**
   * Check if there are any changes
   */
  hasChanges(): boolean {
    const status = this.getStatus();
    return status.length > 0;
  }

  /**
   * Check if a branch exists
   */
  branchExists(branchName: string): boolean {
    try {
      this.exec(`git rev-parse --verify ${branchName}`, { silent: true });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Create a new branch
   */
  createBranch(branchName: string): void {
    this.exec(`git checkout -b ${branchName}`);
  }

  /**
   * Stage all changes
   */
  stageAll(): void {
    this.exec('git add .');
  }

  /**
   * Create a commit
   */
  commit(message: string): void {
    // Escape quotes in the message
    const escapedMessage = message.replace(/"/g, '\\"');
    this.exec(`git commit -m "${escapedMessage}"`);
  }

  /**
   * Push to remote
   */
  push(branchName: string): void {
    this.exec(`git push origin ${branchName}`);
  }

  /**
   * Get current branch name
   */
  getCurrentBranch(): string {
    return this.exec('git branch --show-current');
  }
}

// ============================================================================
// LLM Provider Abstraction
// ============================================================================

abstract class LLMProvider {
  abstract generateBranchName(changes: GitChanges): Promise<string>;
  abstract generateCommitMessage(stagedDiff: string): Promise<string>;

  /**
   * Truncate diff to avoid huge prompts
   */
  protected truncateDiff(diff: string, maxLines: number = 500): string {
    const lines = diff.split('\n');
    if (lines.length <= maxLines) {
      return diff;
    }
    return lines.slice(0, maxLines).join('\n') + '\n\n... (diff truncated)';
  }

  /**
   * Clean and validate branch name
   */
  protected cleanBranchName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\-\/]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);
  }
}

class OpenAIProvider extends LLMProvider {
  private client: OpenAI;

  constructor(apiKey: string) {
    super();
    this.client = new OpenAI({ apiKey });
  }

  async generateBranchName(changes: GitChanges): Promise<string> {
    const truncatedDiff = this.truncateDiff(changes.diff, 300);

    const prompt = `Based on the following git changes, generate a concise, descriptive branch name in kebab-case format.

Git Status:
${changes.status}

Git Diff (truncated):
${truncatedDiff}

Rules:
- Use lowercase kebab-case (e.g., feature-add-user-auth)
- Maximum 50 characters
- Be specific and descriptive
- Use conventional prefixes: feature-, fix-, refactor-, docs-, test-, chore-
- Respond with ONLY the branch name, nothing else

Branch name:`;

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 50,
    });

    const branchName = response.choices[0]?.message?.content?.trim() || '';
    return this.cleanBranchName(branchName);
  }

  async generateCommitMessage(stagedDiff: string): Promise<string> {
    const truncatedDiff = this.truncateDiff(stagedDiff);

    const prompt = `Based on the following staged git changes, generate a concise conventional commit message.

Staged Changes:
${truncatedDiff}

Rules:
- Follow conventional commit format: type: description
- Types: feat, fix, refactor, docs, test, chore, style, perf
- Keep the subject line under 72 characters
- Be specific and descriptive
- Respond with ONLY the commit message, nothing else

Commit message:`;

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });

    return response.choices[0]?.message?.content?.trim() || 'chore: update code';
  }
}

class AnthropicProvider extends LLMProvider {
  private client: Anthropic;

  constructor(apiKey: string) {
    super();
    this.client = new Anthropic({ apiKey });
  }

  async generateBranchName(changes: GitChanges): Promise<string> {
    const truncatedDiff = this.truncateDiff(changes.diff, 300);

    const prompt = `Based on the following git changes, generate a concise, descriptive branch name in kebab-case format.

Git Status:
${changes.status}

Git Diff (truncated):
${truncatedDiff}

Rules:
- Use lowercase kebab-case (e.g., feature-add-user-auth)
- Maximum 50 characters
- Be specific and descriptive
- Use conventional prefixes: feature-, fix-, refactor-, docs-, test-, chore-
- Respond with ONLY the branch name, nothing else

Branch name:`;

    const response = await this.client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 50,
      messages: [{ role: 'user', content: prompt }],
    });

    const branchName = response.content[0]?.type === 'text' ? response.content[0].text.trim() : '';
    return this.cleanBranchName(branchName);
  }

  async generateCommitMessage(stagedDiff: string): Promise<string> {
    const truncatedDiff = this.truncateDiff(stagedDiff);

    const prompt = `Based on the following staged git changes, generate a concise conventional commit message.

Staged Changes:
${truncatedDiff}

Rules:
- Follow conventional commit format: type: description
- Types: feat, fix, refactor, docs, test, chore, style, perf
- Keep the subject line under 72 characters
- Be specific and descriptive
- Respond with ONLY the commit message, nothing else

Commit message:`;

    const response = await this.client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 100,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.content[0]?.type === 'text' ? response.content[0].text.trim() : 'chore: update code';
  }
}

class GeminiProvider extends LLMProvider {
  private client: GoogleGenerativeAI;

  constructor(apiKey: string) {
    super();
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async generateBranchName(changes: GitChanges): Promise<string> {
    const truncatedDiff = this.truncateDiff(changes.diff, 300);

    const prompt = `Based on the following git changes, generate a concise, descriptive branch name in kebab-case format.

Git Status:
${changes.status}

Git Diff (truncated):
${truncatedDiff}

Rules:
- Use lowercase kebab-case (e.g., feature-add-user-auth)
- Maximum 50 characters
- Be specific and descriptive
- Use conventional prefixes: feature-, fix-, refactor-, docs-, test-, chore-
- Respond with ONLY the branch name, nothing else

Branch name:`;

    const model = this.client.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const branchName = response.text().trim();

    return this.cleanBranchName(branchName);
  }

  async generateCommitMessage(stagedDiff: string): Promise<string> {
    const truncatedDiff = this.truncateDiff(stagedDiff);

    const prompt = `Based on the following staged git changes, generate a concise conventional commit message.

Staged Changes:
${truncatedDiff}

Rules:
- Follow conventional commit format: type: description
- Types: feat, fix, refactor, docs, test, chore, style, perf
- Keep the subject line under 72 characters
- Be specific and descriptive
- Respond with ONLY the commit message, nothing else

Commit message:`;

    const model = this.client.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text().trim() || 'chore: update code';
  }
}

// ============================================================================
// Provider Factory
// ============================================================================

class ProviderFactory {
  static create(provider: Provider): LLMProvider {
    switch (provider) {
      case 'openai': {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
          throw new Error('OPENAI_API_KEY environment variable is not set');
        }
        return new OpenAIProvider(apiKey);
      }
      case 'anthropic': {
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          throw new Error('ANTHROPIC_API_KEY environment variable is not set');
        }
        return new AnthropicProvider(apiKey);
      }
      case 'gemini': {
        const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
        if (!apiKey) {
          throw new Error('GEMINI_API_KEY or GOOGLE_API_KEY environment variable is not set');
        }
        return new GeminiProvider(apiKey);
      }
      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  }
}

// ============================================================================
// Main Workflow
// ============================================================================

class GitAICommit {
  private git: GitOperations;
  private provider: LLMProvider;
  private options: CLIOptions;

  constructor(options: CLIOptions) {
    this.options = options;
    this.git = new GitOperations(options.verbose);
    this.provider = ProviderFactory.create(options.provider);
  }

  private log(message: string): void {
    console.log(message);
  }

  private verbose(message: string): void {
    if (this.options.verbose) {
      console.log(`[VERBOSE] ${message}`);
    }
  }

  private error(message: string): void {
    console.error(`[ERROR] ${message}`);
  }

  /**
   * Generate a unique branch name
   */
  private async generateUniqueBranchName(changes: GitChanges): Promise<string> {
    this.verbose('Generating branch name with LLM...');

    let branchName = await this.provider.generateBranchName(changes);
    let suffix = 0;
    let uniqueBranchName = branchName;

    // Handle existing branch names
    while (this.git.branchExists(uniqueBranchName)) {
      suffix++;
      uniqueBranchName = `${branchName}-${suffix}`;
      this.verbose(`Branch ${branchName} exists, trying ${uniqueBranchName}`);
    }

    return uniqueBranchName;
  }

  /**
   * Main workflow execution
   */
  async execute(): Promise<void> {
    try {
      // 1. Check if we're in a git repository
      this.verbose('Checking if current directory is a git repository...');
      if (!this.git.isGitRepository()) {
        this.error('Not inside a git repository');
        process.exit(1);
      }

      // 2. Get current changes
      this.verbose('Inspecting current changes...');
      const changes = this.git.getChanges();

      if (!this.git.hasChanges()) {
        this.log('No changes detected. Nothing to commit.');
        return;
      }

      this.verbose(`Found changes:\n${changes.status}\n`);

      // 3. Generate branch name
      const branchName = await this.generateUniqueBranchName(changes);
      this.log(`\n📝 Generated branch name: ${branchName}`);

      if (this.options.dryRun) {
        this.log(`\n[DRY RUN] Would execute:`);
        this.log(`  git checkout -b ${branchName}`);
        this.log(`  git add .`);
      } else {
        // 4. Create and checkout new branch
        this.verbose('Creating new branch...');
        this.git.createBranch(branchName);
        this.log(`✓ Created and checked out branch: ${branchName}`);

        // 5. Stage all changes
        this.verbose('Staging all changes...');
        this.git.stageAll();
        this.log('✓ Staged all changes');
      }

      // 6. Get staged diff for commit message
      const stagedDiff = this.options.dryRun
        ? changes.diff
        : this.git.getStagedDiff();

      // 7. Generate commit message
      this.verbose('Generating commit message with LLM...');
      const commitMessage = await this.provider.generateCommitMessage(stagedDiff);
      this.log(`\n💬 Generated commit message:\n  "${commitMessage}"`);

      if (this.options.dryRun) {
        this.log(`  git commit -m "${commitMessage}"`);
        this.log(`  git push origin ${branchName}`);
        this.log('\n[DRY RUN] No changes were made to the repository.');
      } else {
        // 8. Create commit
        this.verbose('Creating commit...');
        this.git.commit(commitMessage);
        this.log('✓ Created commit');

        // 9. Push to remote
        this.verbose('Pushing to remote...');
        this.git.push(branchName);
        this.log(`✓ Pushed to origin/${branchName}`);

        this.log('\n✨ All done! Your changes have been committed and pushed.');
      }

    } catch (error: any) {
      this.error(error.message);
      process.exit(1);
    }
  }
}

// ============================================================================
// CLI Entry Point
// ============================================================================

async function main() {
  const program = new Command();

  program
    .name('git-ai-commit')
    .description('Automate git workflow with AI-generated branch names and commit messages')
    .version('1.0.1');

  // Main command - run the workflow
  program
    .option('--provider <name>', 'LLM provider: openai|anthropic|gemini')
    .option('--dry-run', 'Show what would be done without making changes')
    .option('--verbose', 'Show detailed logging')
    .action(async (options) => {
      // Load config file
      const config = ConfigManager.loadConfig();

      // Merge config with CLI options (CLI takes precedence)
      const provider = options.provider || config.provider || 'openai';
      const dryRun = options.dryRun !== undefined ? options.dryRun : (config.dryRun || false);
      const verbose = options.verbose !== undefined ? options.verbose : (config.verbose || false);

      // Validate provider
      if (!['openai', 'anthropic', 'gemini'].includes(provider)) {
        console.error(`Invalid provider: ${provider}`);
        console.error('Must be one of: openai, anthropic, gemini');
        process.exit(1);
      }

      const cliOptions: CLIOptions = {
        provider: provider as Provider,
        dryRun,
        verbose,
      };

      const workflow = new GitAICommit(cliOptions);
      await workflow.execute();
    });

  // Config subcommand
  program
    .command('config')
    .description('Manage configuration settings')
    .option('--show', 'Show current configuration')
    .option('--set-provider <name>', 'Set default provider (openai|anthropic|gemini)')
    .option('--set-verbose <value>', 'Set default verbose mode (true|false)')
    .option('--set-dry-run <value>', 'Set default dry-run mode (true|false)')
    .option('--global', 'Save to global config (~/.git-ai-commit.json)', false)
    .option('--local', 'Save to local config (./.git-ai-commit.json)', false)
    .action((options) => {
      // Show config
      if (options.show || (!options.setProvider && !options.setVerbose && !options.setDryRun)) {
        ConfigManager.showConfig();
        return;
      }

      // Build new config from current config
      const currentConfig = ConfigManager.loadConfig();
      const newConfig: Config = { ...currentConfig };

      // Update config based on flags
      if (options.setProvider) {
        if (!['openai', 'anthropic', 'gemini'].includes(options.setProvider)) {
          console.error(`Invalid provider: ${options.setProvider}`);
          console.error('Must be one of: openai, anthropic, gemini');
          process.exit(1);
        }
        newConfig.provider = options.setProvider as Provider;
      }

      if (options.setVerbose !== undefined) {
        newConfig.verbose = options.setVerbose === 'true';
      }

      if (options.setDryRun !== undefined) {
        newConfig.dryRun = options.setDryRun === 'true';
      }

      // Save config (default to global unless --local is specified)
      if (options.local) {
        ConfigManager.saveLocalConfig(newConfig);
      } else {
        ConfigManager.saveGlobalConfig(newConfig);
      }

      console.log('\n✨ Configuration updated!\n');
      ConfigManager.showConfig();
    });

  program.parse(process.argv);

  // If no command provided, show help
  if (!process.argv.slice(2).length) {
    program.help();
  }
}

// Run the CLI
if (require.main === module) {
  main().catch((error) => {
    console.error('[FATAL]', error.message);
    process.exit(1);
  });
}

export { GitAICommit, GitOperations, LLMProvider };
