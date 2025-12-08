# .ai Directory - Planning & Migration Resources

This directory contains planning and helper resources for:

-   Git submodule management
-   Bun package manager migration
-   Workspace configuration

## 📁 Files in this Directory

### Migration Scripts

#### [`bun-workspace-migration.sh`](./bun-workspace-migration.sh) ⭐ **Recommended**

Automated Bun migration script that handles workspace dependencies correctly.

**Features**:

-   Runs from workspace root to resolve `workspace:*` dependencies
-   Cleans cache and old files
-   Tries multiple installation strategies
-   Verifies workspace dependency resolution

**Usage**:

```bash
/home/isaac/pan/stateurl-example/.ai/bun-workspace-migration.sh
```

#### [`bun-migration-steps.md`](./bun-migration-steps.md)

Complete manual guide for migrating stateurl-example to Bun.

**Includes**:

-   Workspace context explanation
-   Step-by-step instructions
-   Troubleshooting guide
-   Post-migration checklist

#### [`migrate-to-bun.sh`](./migrate-to-bun.sh) ⚠️ **Deprecated**

Original migration script (doesn't handle workspace dependencies). Use
`bun-workspace-migration.sh` instead.

### Git Submodule Resources

### [`decision-guide.md`](./decision-guide.md)

**Start here!** A comprehensive guide to help you decide whether to use git
submodules, subtrees, or keep the current monorepo structure.

**Includes**:

-   Decision tree flowchart
-   Comparison matrix
-   Use case scenarios
-   Recommendations specific to stateurl-example

### [`git-submodule-plan.md`](./git-submodule-plan.md)

Detailed step-by-step implementation plan for converting stateurl-example into a
git submodule.

**Includes**:

-   7-phase implementation plan
-   Backup and safety procedures
-   Alternative approaches (subtree)
-   Maintenance commands
-   Risk assessment
-   Troubleshooting guide

### [`submodule-helper.sh`](./submodule-helper.sh)

Executable bash script with common submodule operations.

**Usage**:

```bash
./submodule-helper.sh [command]

Commands:
  init      - Initialize the submodule
  update    - Update to latest version
  status    - Show submodule status
  commit    - Commit changes in submodule
  push      - Push submodule changes
  sync      - Sync changes and update main repo
  reset     - Reset to committed state
  enter     - Enter submodule directory
  help      - Show help message
```

## 🚀 quick start

### converting to git submodule ⭐

**Ready to execute the submodule plan?**

1. **Pre-flight checklist**:
   [submodule-conversion-checklist.md](./submodule-conversion-checklist.md)
2. **Execute conversion**:
    ```bash
    /home/isaac/pan/stateurl-example/.ai/execute-submodule-conversion.sh
    ```
3. **Post-conversion**: Verify installation and push changes

**Important**: Review the checklist first! You need to:

-   Create a remote repository (GitHub/GitLab)
-   Update the `REMOTE_URL` in the script
-   Commit all changes in pan repo

### migrating to bun

**For stateurl-example specifically** (which has workspace dependencies):

1. Run the workspace-aware migration:

    ```bash
    /home/isaac/pan/stateurl-example/.ai/bun-workspace-migration.sh
    ```

2. Test the installation:

    ```bash
    cd /home/isaac/pan/stateurl-example
    bun dev
    ```

3. See [`bun-migration-steps.md`](./bun-migration-steps.md) for manual steps and
   troubleshooting

### Exploring Git Submodules

1. Read [`decision-guide.md`](./decision-guide.md) first
2. Decide if submodules are right for your use case
3. If yes, proceed to the implementation plan

### If You've Decided to Use Submodules

1. Read [`git-submodule-plan.md`](./git-submodule-plan.md) thoroughly
2. Follow Phase 1 (Preparation)
3. Test in a separate branch first
4. Use `submodule-helper.sh` for daily operations

### If You're Maintaining an Existing Submodule

-   Use `./submodule-helper.sh status` to check current state
-   Use `./submodule-helper.sh sync` to pull and update
-   Read the "Maintenance Commands" section in the plan

## ⚠️ Important Notes

1. **This is planning documentation** - stateurl-example is NOT currently a
   submodule
2. **Backup first** - Always create a backup branch before major changes
3. **Test first** - Try the approach in a test repository
4. **Team communication** - Discuss with team before proceeding

## 🎯 Recommended Approach

For most cases with stateurl-example, we recommend **keeping it in the
monorepo** because:

-   ✅ Simpler for contributors
-   ✅ Examples stay in sync with package
-   ✅ Single clone/install workflow
-   ✅ Easier CI/CD

Only use submodules if you have a specific need for:

-   Independent versioning
-   Multi-repository distribution
-   Separate team ownership

## 📚 Additional Resources

-   [Git Submodules Official Docs](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
-   [GitHub Submodules Guide](https://github.blog/2016-02-01-working-with-submodules/)
-   [Atlassian Submodule Tutorial](https://www.atlassian.com/git/tutorials/git-submodule)

## 🆘 Getting Help

If you're stuck or have questions:

1. Check the troubleshooting section in `git-submodule-plan.md`
2. Run `./submodule-helper.sh help`
3. Review the decision guide for your use case
4. Consult git documentation

## 📝 Contributing to This Documentation

If you find issues or improvements:

-   Update the relevant markdown file
-   Test any script changes
-   Keep examples clear and concise
-   Add real-world scenarios when helpful
