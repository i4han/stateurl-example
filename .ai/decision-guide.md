# Git Submodule Decision Guide

## Quick Decision Tree

```
Do you need stateurl-example in multiple repositories?
├─ YES → Consider Submodule or Subtree
│  │
│  ├─ Need independent version control?
│  │  ├─ YES → Use Submodule
│  │  └─ NO → Use Subtree (easier)
│  │
│  └─ Team comfortable with git submodules?
│     ├─ YES → Use Submodule
│     └─ NO → Use Subtree or keep in monorepo
│
└─ NO → Keep in Monorepo (current setup)
```

## Comparison Matrix

| Feature                    | Monorepo   | Submodule | Subtree  |
| -------------------------- | ---------- | --------- | -------- |
| **Simplicity**             | ⭐⭐⭐⭐⭐ | ⭐⭐      | ⭐⭐⭐⭐ |
| **Independent Versioning** | ❌         | ✅        | ✅       |
| **Reusability**            | ❌         | ✅        | ✅       |
| **Team Learning Curve**    | None       | Moderate  | Low      |
| **CI/CD Complexity**       | Low        | High      | Medium   |
| **Contribution Friction**  | Low        | High      | Low      |

## Use Cases

### ✅ Use Submodule When:

-   Example app needs to be shared across multiple projects
-   You want to release example updates independently
-   Different projects need different versions of the example
-   You have a team experienced with git submodules

### ✅ Use Subtree When:

-   You want independence but with simpler workflow
-   Team is not familiar with submodules
-   You occasionally sync with a separate repo
-   You want the best of both worlds

### ✅ Keep as Monorepo When:

-   Example is tightly coupled to the main package
-   Single project development
-   Team prioritizes simplicity
-   Example updates always match package updates

## Real-World Scenarios

### Scenario 1: Open Source Library

**Situation**: `stateurl` is an open-source router, example helps users
understand it

**Recommendation**: **Monorepo**

-   Users clone one repo and see everything
-   Documentation and examples stay in sync
-   Lower barrier for contributors

### Scenario 2: Multiple Client Projects

**Situation**: You build multiple apps using `stateurl`, want to share the
example template

**Recommendation**: **Submodule or Subtree**

-   Each client project can include the example
-   Update examples once, all projects benefit
-   Can customize per project if needed

### Scenario 3: Separate Teams

**Situation**: One team maintains `stateurl`, another team maintains
examples/docs

**Recommendation**: **Submodule**

-   Clear ownership boundaries
-   Independent release cycles
-   Separate issue tracking

## Migration Effort Estimate

### Monorepo → Submodule

-   **Time**: 2-4 hours
-   **Risk**: Medium
-   **Reversibility**: Easy (git history preserved)
-   **Team Impact**: High (requires training)

### Monorepo → Subtree

-   **Time**: 1-2 hours
-   **Risk**: Low
-   **Reversibility**: Medium
-   **Team Impact**: Low

### Submodule → Monorepo

-   **Time**: 1 hour
-   **Risk**: Low
-   **Reversibility**: Easy
-   **Team Impact**: Low (simplifies workflow)

## Recommendation for stateurl-example

Based on the current project structure, I recommend:

### 🎯 **Keep as Monorepo** (Current Setup)

**Reasons**:

1. ✅ Single package project (no need for multi-repo complexity)
2. ✅ Example tightly coupled to package features
3. ✅ Easier for open-source contributors
4. ✅ Simpler CI/CD and testing
5. ✅ Documentation and examples stay in sync

**When to Reconsider**:

-   If you create multiple example apps (React, Vue, Svelte)
-   If examples grow into full-featured applications
-   If you need examples for multiple versions of stateurl
-   If a separate team takes ownership of examples

## If You Still Want to Proceed with Submodule

### Pre-Flight Checklist

-   [ ] Confirmed need for independent versioning
-   [ ] Team trained on git submodules
-   [ ] CI/CD pipeline can handle submodules
-   [ ] Documentation updated for contributors
-   [ ] Backup created before migration
-   [ ] Tested in a separate branch first

### Post-Migration Checklist

-   [ ] All team members can clone with submodules
-   [ ] CI/CD builds successfully
-   [ ] Development workflow documented
-   [ ] Helper scripts working
-   [ ] Tests passing in both repos
-   [ ] README updated with submodule instructions

## Getting Started

If you decide to proceed:

1. **Read**: [`git-submodule-plan.md`](./git-submodule-plan.md)
2. **Test**: Try in a test repository first
3. **Prepare**: Update team documentation
4. **Execute**: Follow the implementation plan
5. **Support**: Use [`submodule-helper.sh`](./submodule-helper.sh) for common
   tasks

## Questions to Ask

Before making the decision, discuss with your team:

1. **Why** do we need to separate stateurl-example?
2. **Who** will benefit from this separation?
3. **How often** will we update the example independently?
4. **What** is the learning cost for the team?
5. **When** do we need this separation (now or future)?

## Support Resources

-   Git Submodules Cheat Sheet: `man git-submodule`
-   Helper Script: `./submodule-helper.sh help`
-   Implementation Plan: See `git-submodule-plan.md`

---

**Final Advice**: Unless you have a specific need for independent versioning or
multi-repo distribution, keeping stateurl-example in the monorepo is the
simplest and most maintainable approach for a single-package project. 🎯
