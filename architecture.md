# Architecture

## High-Level Components

- **Frontend (Vite + React + TS)**: UI and wallet interactions live under [frontend/](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/frontend).
- **Move Package (Aptos)**: On-chain modules and tests live under [contract/](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/contract).
- **Move Workflow Scripts (Node.js)**: Compile/test/publish/upgrade helpers live under [scripts/move/](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/scripts/move).
- **Configuration**: Environment variables are defined in [.env.example](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/.env.example) and loaded by both Vite and the Node scripts.

## Data Flow (Frontend → Chain)

1. **Wallet connection**
   - Frontend uses `@aptos-labs/wallet-adapter-react` for account state and transaction signing.
2. **Transaction build**
   - Entry-function helpers (e.g. [writeMessage](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/frontend/entry-functions/writeMessage.ts)) return an `InputTransactionData` payload containing:
     - `function`: `<MODULE_ADDRESS>::<module>::<entry_fun>`
     - `functionArguments`: serialized args
3. **Sign + submit**
   - UI calls `signAndSubmitTransaction(...)` from the wallet adapter (example: [MessageBoard](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/frontend/components/MessageBoard.tsx)).
4. **Finality**
   - Frontend waits for execution via `aptos.waitForTransaction(...)` using the shared Aptos client in [aptosClient.ts](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/frontend/utils/aptosClient.ts).

## Read Flow (Frontend → Chain)

- **View functions** are implemented in [frontend/view-functions/](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/frontend/view-functions) using `aptosClient().view(...)`.
  - Example: [getMessageContent](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/frontend/view-functions/getMessageContent.ts).
- **Resource reads** are done via `aptos.getAccountResource(...)` (example: [App.tsx](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/frontend/App.tsx)).

## Configuration & Addressing

- Frontend environment access is centralized in [constants.ts](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/frontend/constants.ts) (`VITE_APP_NETWORK`, `VITE_MODULE_ADDRESS`, `VITE_APTOS_API_KEY`).
- Move scripts also read the same `.env` using `dotenv`:
  - [compile.js](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/scripts/move/compile.js)
  - [publish.js](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/scripts/move/publish.js)
  - [upgrade.js](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/scripts/move/upgrade.js)

## Move Package Publishing Model

- `move:publish` uses the Aptos TS SDK CLI wrapper to:
  1. create a new object
  2. publish the Move package to that object
- The resulting object address is written into `.env` as `VITE_MODULE_ADDRESS`, and the frontend uses that address to form function IDs (see [publish.js](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/scripts/move/publish.js) and [constants.ts](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/frontend/constants.ts)).

## Notable Implementation Gaps (Current Repo State)

- The Move module [message_board.move](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/contract/sources/message_board.move) is currently a placeholder, but the frontend calls:
  - `<MODULE_ADDRESS>::message_board::post_message` (entry) and
  - `<MODULE_ADDRESS>::message_board::get_message_content` (view)
  - See [writeMessage](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/frontend/entry-functions/writeMessage.ts) and [getMessageContent](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/frontend/view-functions/getMessageContent.ts).
- The invoice UI path in [App.tsx](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/frontend/App.tsx) currently hardcodes a `MODULE_ADDRESS` and uses function/resource identifiers that do not match the current invoice module file under [contract/sources/invoice.move](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/contract/sources/invoice.move).

