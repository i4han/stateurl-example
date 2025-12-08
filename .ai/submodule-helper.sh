#!/bin/bash

# Git Submodule Helper Script for stateurl-example
# This script provides common operations for working with git submodules

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
SUBMODULE_PATH="stateurl-example"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

function print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

function print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

function print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

function show_help() {
    cat << EOF
Git Submodule Helper for stateurl-example

Usage: ./submodule-helper.sh [command]

Commands:
    init        Initialize and clone the submodule
    update      Update submodule to latest remote version
    status      Show current status of the submodule
    commit      Commit changes within the submodule
    push        Push submodule changes to remote
    sync        Sync: pull submodule changes, update main repo
    reset       Reset submodule to committed state
    enter       Enter the submodule directory
    help        Show this help message

Examples:
    ./submodule-helper.sh init
    ./submodule-helper.sh update
    ./submodule-helper.sh commit "Fix example bug"
    ./submodule-helper.sh sync

EOF
}

function init_submodule() {
    print_info "Initializing submodule..."
    cd "$PROJECT_ROOT"
    git submodule update --init --recursive
    print_info "Submodule initialized successfully!"
}

function update_submodule() {
    print_info "Updating submodule to latest version..."
    cd "$PROJECT_ROOT"
    git submodule update --remote --merge "$SUBMODULE_PATH"
    print_info "Submodule updated!"
    print_warn "Don't forget to commit the submodule reference update in the main repo"
}

function status_submodule() {
    print_info "Submodule status:"
    cd "$PROJECT_ROOT/$SUBMODULE_PATH"
    
    echo ""
    echo "Current branch:"
    git branch --show-current
    
    echo ""
    echo "Git status:"
    git status -s
    
    echo ""
    echo "Commit info:"
    git log --oneline -1
}

function commit_submodule() {
    if [ -z "$1" ]; then
        print_error "Commit message required!"
        echo "Usage: ./submodule-helper.sh commit \"Your commit message\""
        exit 1
    fi
    
    print_info "Committing changes in submodule..."
    cd "$PROJECT_ROOT/$SUBMODULE_PATH"
    
    # Make sure we're on a branch
    current_branch=$(git branch --show-current)
    if [ -z "$current_branch" ]; then
        print_warn "Submodule is in detached HEAD state. Checking out main..."
        git checkout main
    fi
    
    git add .
    git commit -m "$1"
    print_info "Committed successfully!"
    print_warn "Run './submodule-helper.sh push' to push to remote"
}

function push_submodule() {
    print_info "Pushing submodule changes..."
    cd "$PROJECT_ROOT/$SUBMODULE_PATH"
    
    current_branch=$(git branch --show-current)
    if [ -z "$current_branch" ]; then
        print_error "Cannot push from detached HEAD state!"
        exit 1
    fi
    
    git push origin "$current_branch"
    print_info "Pushed successfully!"
    print_warn "Don't forget to update the submodule reference in the main repo"
}

function sync_submodule() {
    print_info "Syncing submodule..."
    
    # Update submodule
    update_submodule
    
    # Update main repo reference
    cd "$PROJECT_ROOT"
    git add "$SUBMODULE_PATH"
    
    if git diff --cached --quiet; then
        print_info "No submodule reference changes to commit"
    else
        git commit -m "Update $SUBMODULE_PATH submodule reference"
        print_info "Main repo updated with new submodule reference"
    fi
}

function reset_submodule() {
    print_warn "This will reset the submodule to the committed state!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Resetting submodule..."
        cd "$PROJECT_ROOT"
        git submodule update --force "$SUBMODULE_PATH"
        print_info "Submodule reset successfully!"
    else
        print_info "Reset cancelled"
    fi
}

function enter_submodule() {
    print_info "Entering submodule directory..."
    cd "$PROJECT_ROOT/$SUBMODULE_PATH"
    exec $SHELL
}

# Main command handler
case "${1:-help}" in
    init)
        init_submodule
        ;;
    update)
        update_submodule
        ;;
    status)
        status_submodule
        ;;
    commit)
        commit_submodule "$2"
        ;;
    push)
        push_submodule
        ;;
    sync)
        sync_submodule
        ;;
    reset)
        reset_submodule
        ;;
    enter)
        enter_submodule
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
