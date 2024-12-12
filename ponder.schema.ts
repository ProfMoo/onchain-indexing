import { onchainTable } from "@ponder/core";

export const depositor = onchainTable("depositor", (t) => ({
  pool: t.hex().primaryKey(),
  factory: t.hex(),
  withdrawalRecipient: t.hex(),
  execLayerRecipient: t.hex(),
  coverageRecipient: t.hex(),
  oracleAggregator: t.hex(),
  exitQueue: t.hex(),
  test: t.numeric(),
}));
