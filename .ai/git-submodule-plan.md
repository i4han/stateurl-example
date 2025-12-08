# Git Submodule Setup Plan for stateurl-example

## Overview

This document outlines the plan to convert `stateurl-example` into a git
submodule that can be shared across multiple projects or maintained as a
separate repository.

## Current State

-   `stateurl-example` is currently a directory within the main `pan` repository
-   It contains a complete example app showcasing the `stateurl` router
-   Has its own `package.json` and dependencies
-   Contains end-to-end tests with Playwright

## Goals

1. Create a separate git repository for `stateurl-example`
2. Add it as a submodule to the main `pan` repository
3. Allow independent development and versioning
4. Enable reuse across multiple projects

## Implementation Plan

### Phase 1: Preparation (Before Creating Submodule)

#### 1.1 Review Current State

-   [ ] Verify all changes are committed in the main repo
-   [ ] Review `.gitignore` in stateurl-example
-   [ ] Identify files that should NOT be in the submodule (e.g.,
        `node_modules`, build artifacts)
-   [ ] Document current directory structure

#### 1.2 Clean Up

```bash
cd /home/isaac/pan/stateurl-example
# Remove generated files
rm -rf node_modules
rm -rf dist
rm -rf .vite
rm -rf playwright-report
rm -rf test-results
```

#### 1.3 Create Repository README

-   [ ] Create a comprehensive README.md for the standalone repo
-   [ ] Include setup instructions
-   [ ] Document dependencies on parent `stateurl` package
-   [ ] Add usage examples

### Phase 2: Create Separate Repository

#### 2.1 Initialize New Repository

```bash
# Navigate to a temporary location
cd /tmp

# Create a new directory for the repo
mkdir stateurl-example-repo
cd stateurl-example-repo

# Initialize git
git init
```

#### 2.2 Copy Files

```bash
# Copy all files from current location
cp -r /home/isaac/pan/stateurl-example/* .
cp /home/isaac/pan/stateurl-example/.gitignore .

# Stage all files
git add .
git commit -m "Initial commit: stateurl-example standalone repository"
```

#### 2.3 Create Remote Repository

Options:

-   **GitHub**: Create a new repository at github.com
-   **GitLab**: Create a new project
-   **Self-hosted**: Set up on your own git server

```bash
# Add remote (replace with your actual URL)
git remote add origin git@github.com:i4han/stateurl-example.git
git branch -M main
git push -u origin main
```

### Phase 3: Remove from Main Repository

#### 3.1 Backup Current State

```bash
cd /home/isaac/pan
# Create a backup branch
git checkout -b backup-before-submodule
git add .
git commit -m "Backup before converting stateurl-example to submodule"
git checkout main
```

#### 3.2 Remove Directory

```bash
# Remove the stateurl-example directory
git rm -rf stateurl-example
git commit -m "Remove stateurl-example directory (preparing for submodule)"
```

### Phase 4: Add as Submodule

#### 4.1 Add Submodule

```bash
cd /home/isaac/pan
git submodule add git@github.com:i4han/stateurl-example.git stateurl-example
git commit -m "Add stateurl-example as git submodule"
```

#### 4.2 Initialize Submodule

```bash
git submodule update --init --recursive
```

### Phase 5: Update Build Configuration

#### 5.1 Update Parent package.json

If the parent repo has workspace configuration, update it:

```json
{
    "workspaces": ["packages/*", "stateurl-example"]
}
```

#### 5.2 Update CI/CD

Update any CI/CD pipelines to:

```bash
# Clone with submodules
git clone --recurse-submodules git@github.com:i4han/stateurl-example.git

# Or if already cloned
git submodule update --init --recursive
```

### Phase 6: Documentation

#### 6.1 Update Main Repository README

Add section:

```markdown
## Submodules

This repository uses git submodules. To clone with submodules:

\`\`\`bash git clone --recurse-submodules
git@github.com:i4han/stateurl-example.git \`\`\`

To update submodules:

\`\`\`bash git submodule update --remote --merge \`\`\`
```

#### 6.2 Create Submodule Documentation

Create `/home/isaac/pan/.ai/WORKING-WITH-SUBMODULES.md` with:

-   How to clone the repo with submodules
-   How to update submodules
-   How to make changes to the submodule
-   How to commit changes

### Phase 7: Testing

#### 7.1 Test Workflow

-   [ ] Clone the main repo with submodules on a different machine/directory
-   [ ] Verify all dependencies install correctly
-   [ ] Run tests in the submodule
-   [ ] Make a change in the submodule and commit
-   [ ] Update the main repo to use the new submodule version

## Alternative: Subtree (Consider This Instead)

If you want to keep the code in one repository but still maintain it separately,
consider using `git subtree` instead:

### Advantages of Subtree:

-   No separate `.gitmodules` file
-   Easier for contributors (no submodule commands)
-   Can pull/push to separate repo when needed

### Subtree Setup:

```bash
# Add the separate repo as a remote
git remote add stateurl-example-remote <URL>

# Add as subtree
git subtree add --prefix stateurl-example stateurl-example-remote main --squash

# Pull updates from remote
git subtree pull --prefix stateurl-example stateurl-example-remote main --squash

# Push changes to remote
git subtree push --prefix stateurl-example stateurl-example-remote main
```

## Maintenance Commands

### Working with Submodules Daily

```bash
# Clone repo with submodules
git clone --recurse-submodules git@github.com:i4han/stateurl-example.git

# Update all submodules to latest
git submodule update --remote --merge

# Enter submodule and work
cd stateurl-example
git checkout main
# Make changes
git add .
git commit -m "Update example"
git push

# Back to main repo
cd ..
git add stateurl-example
git commit -m "Update stateurl-example submodule reference"
git push
```

### Troubleshooting

```bash
# If submodule is in detached HEAD state
cd stateurl-example
git checkout main

# If submodule is not initialized
git submodule update --init --recursive

# Reset submodule to committed state
git submodule update --force
```

## Risks & Considerations

### Risks

1. **Complexity**: Team members need to understand submodules
2. **Coordination**: Changes require commits in both repos
3. **Dependencies**: Need to manage `stateurl` package dependency carefully
4. **CI/CD**: More complex build pipelines

### Mitigations

1. Provide clear documentation
2. Create helper scripts for common operations
3. Use workspace dependencies for local development
4. Add git hooks to remind about submodule updates

## Decision Checklist

Before proceeding, ask:

-   [ ] Do we need independent versioning of the example app?
-   [ ] Will multiple projects use this example?
-   [ ] Is the team comfortable with submodules?
-   [ ] Do we have proper CI/CD to handle submodules?
-   [ ] Is subtree a better option for our workflow?

## Recommended Approach

For the `stateurl` project, I recommend:

**Option 1: Keep as Monorepo (Current State)**

-   Simpler for single-project development
-   Easier for contributors
-   No submodule complexity

**Option 2: Use Git Subtree**

-   Best of both worlds
-   Can maintain separately when needed
-   No submodule complexity for day-to-day work

**Option 3: Use Git Submodule**

-   Only if you need strict separation
-   Good for showcasing examples across multiple projects
-   Requires team training

## Next Steps

1. **Decide**: Choose Option 1, 2, or 3 above
2. **Document**: Update this plan based on chosen option
3. **Test**: Try the approach in a test repository first
4. **Execute**: Follow the implementation plan
5. **Communicate**: Inform team members about the change

## References

-   [Git Submodules Documentation](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
-   [Git Subtree Documentation](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt)
-   [Submodule vs Subtree](https://www.atlassian.com/git/tutorials/git-subtree)
