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

## Comparison/Feedback

### [Ponder](https://github.com/ponder-sh/ponder)

* Feedback loop is excellent. I can change my table or indexing, then the local server automatically senses that and re-indexes. Extremely rapid development.
* Loads data into another DB (i.e. opinionated on where the indexed data ends up)
  * Is nice because the "database is a detail", but can be painful if you're trying to run this in a real, high-scale production environment.
* Documentation is OK. 5/10
* [Quickstart](https://ponder.sh/docs/getting-started/new-project) is really nice. Super quick and integrates well with

### [CDP ABI Upload](https://docs.cdp.coinbase.com/onchain-data/docs/smart-contract-events/overview)

Overall, I don't think the CDP ABI Upload product offers enough to be part of an onchain app's indexing solution. So it begs the question: what is it for? What's the real use-case here?

* Once a user uploads the ABI, they get an endpoint that exposes events & calls. Then, what is the user to do at that point? What if they want to perform additional transforms on top of that data (i.e. just like is very common in TheGraph, Ponder, and others).
  * Essentially, to do this, the user must implement another data ingestion pipeline system on top of a bespoke CDP API themselves. This includes backfilling, incremental batching, etc, etc. To me, seems highly unlikely any builders will do this. They'd simply opt to use TheGraph, Ponder, etc.
* Provided a very low-level event/contract call endpoint.
* Documentation is very scant. 2/10. As a result: feels like an opaque solution on top of an open system (i.e. the blockchain)

### Overall

CDP ABI Upload feels very "now what?" as an indexing solution - it lacks the necessary features to get across the finish line. It is excellent at the first part, but lacks the second half needed to really be used in production by small OR large teams. Some potential suggestions.

* Once a user uploads an ABI, offer a way for a user to load this data into a real data processing system. Could be a high-memory DB such as SingleStore, ClickHouse, etc. or a warehouse like Snowflake.
* Instead of the above, CDP ABI Upload could attempt to integrate more cleanly with TheGraph or Ponder, passing off the "transform and store" to those open source alternatives.
  * Would need some intelligent way to "drop in" CDP ABI Upload as a "source" to these open source indexing solutions.
