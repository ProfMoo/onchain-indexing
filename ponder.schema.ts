import { onchainTable } from "ponder";

export const depositors = onchainTable("depositors", (t) => ({
  pool: t.hex().primaryKey(),
  factory: t.hex(),
  withdrawalRecipient: t.hex(),
  execLayerRecipient: t.hex(),
  coverageRecipient: t.hex(),
  oracleAggregator: t.hex(),
  exitQueue: t.hex(),
  test: t.numeric(),
}));
