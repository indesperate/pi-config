Prefer `ffgrep`/`fffind` over `rg`/`fd` via `bash`. Fall back to `rg`/`fd` for ignored
files (`rg -uu`), lookaround or backreference regex (`rg -P`), or exhaustive searches
beyond FFF's result limits. Missing FFF results may be pagination, a limit, or the
ignore rules — check those before concluding nothing exists.
