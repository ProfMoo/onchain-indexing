# Onchain Indexing

Playing around with [ponder](https://github.com/ponder-sh/ponder) by trying to index some Kiln staking events on Ethereum mainnet.

## QuickStart

1. Put ETH archival node in `.env.local`:

    ```ini
    PONDER_RPC_URL_1="<url>"
    # (Optional) Postgres database URL. If not provided, SQLite will be used
    DATABASE_URL=
    ```

2. Run:

    ```bash
    npm run dev
    ```
