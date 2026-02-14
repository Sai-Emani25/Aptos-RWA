# Contracts

## Location

- Move package root: [contract/](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/contract)
- Manifest: [Move.toml](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/contract/Move.toml)
- Modules:
  - [invoice.move](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/contract/sources/invoice.move)
  - [message_board.move](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/contract/sources/message_board.move)

## Named Addresses

[Move.toml](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/contract/Move.toml) defines two named addresses:

- `invoice_rwa`
- `message_board_addr`

When compiling/publishing, these placeholders must be bound to concrete addresses. The Node scripts currently bind `message_board_addr` (see [compile.js](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/scripts/move/compile.js) and [publish.js](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/scripts/move/publish.js)).

## Module: `invoice_rwa::invoice_engine_v2`

Defined in [invoice.move](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/contract/sources/invoice.move).

### Resources

- `Invoice`
  - `id: String`
  - `amount: u64`
  - `issuer: address`
- `InvoiceStore has key`
  - `invoices: vector<Invoice>`

### Entry Functions

- `init_store(account: &signer)`
  - Publishes an empty `InvoiceStore` under the signer’s address.
- `create_invoice(account: &signer, id: String, amount: u64) acquires InvoiceStore`
  - Ensures an `InvoiceStore` exists (calls `init_store` if missing).
  - Appends a new `Invoice` to `InvoiceStore.invoices`.

### On-Chain Identifiers

If your published package address is `VITE_MODULE_ADDRESS`, the fully-qualified identifiers are:

- `VITE_MODULE_ADDRESS::invoice_engine_v2::init_store`
- `VITE_MODULE_ADDRESS::invoice_engine_v2::create_invoice`
- Resource type: `VITE_MODULE_ADDRESS::invoice_engine_v2::InvoiceStore`

## Module: `invoice_rwa::message_board`

Defined in [message_board.move](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/contract/sources/message_board.move).

- Current state: placeholder module with no functions/resources.
- Frontend expectations: the UI currently calls:
  - entry: `<MODULE_ADDRESS>::message_board::post_message` ([writeMessage.ts](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/frontend/entry-functions/writeMessage.ts))
  - view: `<MODULE_ADDRESS>::message_board::get_message_content` ([getMessageContent.ts](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/frontend/view-functions/getMessageContent.ts))

## Tests

- Move tests live under [contract/tests/](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/contract/tests).
- [test_end_to_end.move](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/contract/tests/test_end_to_end.move) is a scaffold and may need updating to match the current module/function names in [invoice.move](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/contract/sources/invoice.move).

## Publish / Upgrade Workflow

- Publish command: `npm run move:publish`
  - Creates an object and publishes the package into it.
  - Writes the created object address into `.env` as `VITE_MODULE_ADDRESS`.
  - Implementation: [publish.js](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/scripts/move/publish.js)
- Upgrade command: `npm run move:upgrade`
  - Upgrades the package at `VITE_MODULE_ADDRESS`.
  - Implementation: [upgrade.js](file:///d:/Programming%20Playground/Open%20Source%20Connect%20Global/Aptos-RWA/scripts/move/upgrade.js)

