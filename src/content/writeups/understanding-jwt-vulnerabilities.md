---
title: "Understanding Common JWT Vulnerabilities"
description: "A quick tour of the classic ways JSON Web Token implementations go wrong."
pubDate: 2026-02-02
tags: ["appsec", "jwt", "notes"]
---

> This is a sample writeup. Replace it with real notes, or delete it — new posts are just markdown files dropped into `src/content/writeups/`.

## Algorithm confusion (`alg: none`)

Some libraries trust the `alg` field from the token header itself. If the server accepts
`none` as a valid algorithm, an attacker can strip the signature entirely and the server
may still accept the token as valid.

**Mitigation**: pin the expected algorithm server-side; never derive it from the token.

## Key confusion (RS256 → HS256)

If a server verifies RS256 tokens using the public key, and also accepts HS256 tokens,
an attacker who knows the public key can sign a forged token with HS256 using that public
key as the HMAC secret.

**Mitigation**: use separate verification paths per algorithm; don't let the token pick.

## Weak secrets

HS256 tokens signed with short, guessable secrets are crackable offline via tools like
`hashcat` or `jwt_tool`. Treat the signing secret like any other high-value credential.
