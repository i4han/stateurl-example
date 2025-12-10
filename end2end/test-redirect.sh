#!/bin/bash
# Quick test runner for redirectToBase feature

cd "$(dirname "$0")/.."

echo "🧪 Testing redirectToBase feature..."
echo ""

# Run only the redirect tests
pnpm test end2end/06-redirect-to-base.spec.ts "$@"


