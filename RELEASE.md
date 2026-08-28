# Release Process

## Branch Strategy

```
feature/xyz  →  develop  →  main
```

- `feature/*` — new features and bug fixes
- `develop` — integration branch, source for all releases
- `main` — always reflects the latest production release; every commit is tagged

---

## 1. Finish a Feature

```bash
# Merge feature branch into develop
git checkout develop
git pull origin develop
git merge --no-ff feature/my-feature
git push origin develop

# Clean up feature branch
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

---

## 2. Bump the Version

On the `develop` branch:

```bash
git checkout develop
git pull origin develop

# Patch: 1.0.0 → 1.0.1  (bug fix)
npm version patch

# Minor: 1.0.0 → 1.1.0  (new feature, backwards-compatible)
npm version minor

# Major: 1.0.0 → 2.0.0  (breaking change)
npm version major
```

`npm version` updates `package.json`, creates a commit (`chore: 1.2.3`) and a local tag (`v1.2.3`) automatically.

```bash
# Push commit + tag to develop
git push origin develop --follow-tags
```

---

## 3. Merge develop → main

```bash
git checkout main
git pull origin main
git merge --no-ff develop -m "release: v$(node -p "require('./package.json').version")"
git push origin main --follow-tags
```

`--follow-tags` ensures the tag created by `npm version` is pushed to main, which triggers the release workflow.

---

## 4. Release Workflow

Pushing a `v*` tag to `main` automatically triggers `.github/workflows/release.yml`:

- Builds the Docker image for `linux/arm64`
- Pushes to GHCR:

```
ghcr.io/jnkck92/monitor:1.2.3
ghcr.io/jnkck92/monitor:latest
```

---

## Quick Reference (Patch Release)

```bash
git checkout develop && git pull origin develop
npm version patch
git push origin develop --follow-tags
git checkout main && git pull origin main
git merge --no-ff develop -m "release: v$(node -p "require('./package.json').version")"
git push origin main --follow-tags
git checkout develop
```
