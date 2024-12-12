# Onchain Indexing

Playing around with [ponder](https://github.com/ponder-sh/ponder) by trying to index some Kiln staking events on Ethereum mainnet.

![It Works!](./docs/working.png)

## QuickStart

1. Put ETH archival node in `.env.local`:

    ```ini
    PONDER_RPC_URL_1="<url>"
    # (Optional) Postgres database URL. If not provided, local pglite will be used
    DATABASE_URL=
    ```

2. Run:

    ```bash
    npm run dev
    ```

## Comparison/Feedback

Below I compare [ponder](https://github.com/ponder-sh/ponder) to [CDP ABI Upload](https://docs.cdp.coinbase.com/onchain-data/docs/smart-contract-events/overview). Ponder was selected as it's a faster/newer alternative to TheGraph. TheGraph is the most popular indexing solution in the space, so I wanted to use something that was similar in the types of data sources (i.e. tx logs, events), data storage solutions (opinionated DB selection), and overall development speed. Ponder seemed to be lighter weight and required running way fewer processes/containers, so I wanted to give it a shot :).

Plus, ponder has some really great open source examples to pull from, such as [this one from Uniswap](https://github.com/Uniswap/the-compact-indexer).

### [Ponder](https://github.com/ponder-sh/ponder)

* Feedback loop is excellent. I can change my table or indexing, then the local server automatically senses that and re-indexes. Extremely rapid development.
* Loads data into another DB (i.e. opinionated on where the indexed data ends up)
  * Is nice because the "database is a detail"
  * Can be painful if you're trying to run this in a real, high-scale production environment. You'd be locked into the DBs that Ponder supports.
* Documentation is OK. 5/10.
* Not very scalable. Can probably scale to midsize usage (i.e. ~3 digit QPS), but above that might struggle.
  * I'd be interested to see QPS of ponder indexes in production.
* [Quickstart](https://ponder.sh/docs/getting-started/new-project) is really nice. Super quick and integrates well with

### [CDP ABI Upload](https://docs.cdp.coinbase.com/onchain-data/docs/smart-contract-events/overview)

Overall, I don't think the CDP ABI Upload product offers enough to be part of an onchain app's indexing solution. So it begs the question: what is it for? What's the real use-case here?

* Once a user uploads the ABI, they get an endpoint that exposes events & calls. Then, what is the user to do at that point? What if they want to perform additional transforms on top of that data (i.e. just like is very common in TheGraph, Ponder, and others).
  * Essentially, to do this, the user must implement another data ingestion pipeline system on top of a bespoke CDP API themselves. This includes backfilling, incremental batching, etc, etc. To me, seems highly unlikely any builders will do this. They'd simply opt to use TheGraph, Ponder, etc.
* Provided a very low-level event/contract call endpoint.
* Documentation is very scant. 2/10. As a result: feels like an opaque solution on top of an open system (i.e. the blockchain)

### Overall

I'll preface this part with: this is just my personal opinion. Others may find CDP ABI Upload to be useful on its own.

CDP ABI Upload feels very "now what?" as an indexing solution - it lacks the necessary features to get across the finish line. It is solid at the first part of indexing (i.e. upload ABI, get back typed tx events/logs), but lacks the second part (i.e. transform and make accessible to an application) needed to really be used in production by small OR large teams. For a team to use this application, they'd need to do any transform on the hot path of a user request.

### Recommendations

* Once a user uploads an ABI, offer a way for a user to load this data into a real data processing system. Could be a high-memory DB such as SingleStore, ClickHouse, etc. or a warehouse like Snowflake.
  * User could perform additional transforms from there.
* CDP ABI Upload could attempt to integrate more cleanly with TheGraph or Ponder, passing off the "transform and store" to those open source alternatives.
  * Would need some intelligent way to "drop in" CDP ABI Upload as a "source" to these open source indexing solutions. Probably would involve significant contribution to these open source projects.

Definitely an opportunity here for CDP to help with some of the "hard" parts of indexing. Ponder still requires a full archival node to work, which CDP ABI Upload obviates.

### Feature Comparison

| Feature | Ponder | CDP ABI Upload |
|---------|---------|----------------|
| Development Speed | Fast | Medium |
| Documentation | 5/10 | 2/10 |
| Scalability | Medium | Depends on if transform is needed |
| Transform Support | Yes | No |
| Intuitive Backfill | Yes | No |
| Infrastructure Needs | Archival Node | None |
