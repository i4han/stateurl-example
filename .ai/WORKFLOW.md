# Development Workflow

## Ports
- **7000**: Development/testing (submodule)
- **8000**: Production (~stateurl-example)

## Workflow

1. **Develop & test** in `pan/stateurl-example`
   ```bash
   pnpm dev --port 7000
   pnpm test  # update playwright.config.ts baseURL to 7000
   ```

2. **Commit & push** from submodule when tests pass
   ```bash
   git add . && git commit -m "feat: description"
   git push
   ```

3. **Production pulls**
   ```bash
   cd ~/stateurl-example && git pull
   ```

## Notes
- Never copy files between repos
- Test in submodule before pushing
- Production pulls only after changes are verified
