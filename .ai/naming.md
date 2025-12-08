# Intention-Based Naming

## Principle

Names should reveal **why** something exists or what problem it solves, not just describe what it does.

## Problem

Names that describe actions or states without context lead to questions:

- `needsNormalization` → "Why does it need normalization? What's wrong?"
- `shouldUpdate` → "Why should it update? What condition triggers this?"
- `isValid` → "Valid for what? What makes it invalid?"

## Solution

Names that reveal the underlying condition or intention:

- `hasPartialBasePath` → Clearly indicates the base path is incomplete (missing feature segments)
- `hasMissingFeatures` → Explicitly states what's missing
- `isIncomplete` → Describes the actual state

## Guidelines

1. **Prefer state descriptions over action descriptions**
    - ❌ `needsCanonicalization`
    - ✅ `hasPartialBasePath`

2. **Use "has/is" prefixes to describe conditions**
    - `hasMissingSegments`
    - `isIncomplete`
    - `hasTrailingSlash`

3. **Be specific about what's partial/incomplete/missing**
    - ❌ `needsPadding` (what needs padding?)
    - ✅ `hasMissingFeatureSegments` (explicit about what's missing)

## Example from Router

**Before:**

```ts
const needsNormalization = inBaseScope && missingSegments > 0
```

**After:**

```ts
const hasPartialBasePath = inBaseScope && missingSegments > 0
```

The new name immediately tells you: "The base path is incomplete, so we need to pad it with placeholders."

# Plain English

Use clear, straightforward language that accurately reflects the system's state.

## Function Naming

- Use verbs for functions that perform actions (e.g., `fetchUser`, `updateSettings`).
- Use nouns for functions that return values, representing what they provide (e.g., `userProfile`, `routePath`).
- Prefer simple, descriptive names over abbreviations.

# Prefix Usage

- Avoid adding the `get` prefix to names just because a value is returned.
  Instead, let the function name describe what it returns or represents.
- Use may use `get` to differentiate between retrieving, vs computing or identifying.
