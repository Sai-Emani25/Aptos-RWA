# Setup

## Prerequisites

- Node.js + npm (this repo runs a Vite + React frontend and Node scripts)
- An Aptos account to publish the Move package (testnet/devnet/local)
- Optional: Aptos CLI (only needed if you want to run a local node)

## Environment Variables

Create a `.env` in the repo root (Vite reads `VITE_*` vars, and the Move scripts also load this file via `dotenv`).

You can start from:

```bash
cp .env.example .env
```

Required/used keys (from [.env.example](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/.env.example)):

| Variable | Required for | Notes |
| --- | --- | --- |
| `VITE_APP_NETWORK` | Frontend client network + Move publish/upgrade URL | Typical values: `testnet`, `devnet`, `mainnet`, `local` (must be supported by `@aptos-labs/ts-sdk`). |
| `VITE_MODULE_ADDRESS` | Frontend module function IDs + `move:upgrade` | `move:publish` auto-writes this into `.env` after publishing. |
| `VITE_APTOS_API_KEY` | Frontend RPC calls | Optional; only needed if your RPC provider requires an API key. |
| `VITE_MODULE_PUBLISHER_ACCOUNT_ADDRESS` | `move:compile`, `move:publish` | Aptos account address used as the publisher. |
| `VITE_MODULE_PUBLISHER_ACCOUNT_PRIVATE_KEY` | `move:publish`, `move:upgrade` | Keep secret; do not commit. Must be in a format accepted by the Aptos CLI `--private-key` flag (commonly `0x...`). |

## Run Frontend Locally

From the repo root:

```bash
npm install
npm run dev
```

Vite opens the app in your browser (see `server.open` in [vite.config.ts](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/vite.config.ts)).

## Compile/Test/Publish Move Package

All commands run from the repo root and operate on the Move package in [contract/](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/contract).

- Run Move unit tests:

```bash
npm run move:test
```

- Compile locally (requires `VITE_MODULE_PUBLISHER_ACCOUNT_ADDRESS`):

```bash
npm run move:compile
```

- Publish on-chain (requires `VITE_APP_NETWORK`, publisher address + private key):

```bash
npm run move:publish
```

Publishing creates an object and publishes the Move package into it, then writes `VITE_MODULE_ADDRESS=<objectAddress>` into your `.env` (see [publish.js](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/scripts/move/publish.js)).

- Upgrade an already-published package (requires `VITE_APP_NETWORK`, `VITE_MODULE_ADDRESS`, and publisher private key):

```bash
npm run move:upgrade
```

## Run a Local Aptos Node (Optional)

If you want to run against a local chain instead of testnet/devnet:

1. Install Aptos CLI.
2. Start local testnet (includes a local faucet):

```bash
aptos node run-local-testnet --with-faucet
```

3. Set `VITE_APP_NETWORK=local` in `.env`.
4. Publish the Move package to your local network:

```bash
npm run move:publish
```

If your `@aptos-labs/ts-sdk` version does not support `local` in its network mapping, update the Move scripts to accept a full node URL directly instead of deriving it from `VITE_APP_NETWORK`.

