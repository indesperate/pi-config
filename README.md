# Pi Config

Personal [Pi](https://pi.dev) configuration, kept in `~/.pi/agent`.

- `AGENTS.md` — global instructions.
- `extensions/` — maintained plugins.
- `settings.shared.jsonc` — shared preferences and packages, with comments.
- `pi-starship.toml` — two-row Starship footer with Catppuccin colors.
- `themes/catppuccin.json` — Catppuccin Mocha theme.

After pulling changes, run `/config-sync` in Pi to sync shared settings and packages.

`/config-sync` also patches the permission package to recognize `ffgrep` and
`fffind` as read-only. After a manual `pi update`, run
`node ~/.pi/agent/scripts/patch-permission-fff.mjs` and `/reload`.
