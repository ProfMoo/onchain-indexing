import { onchainTable } from "ponder";

export const depositorList = onchainTable("depositors", (t) => ({
  pool: t.hex().primaryKey(),
  factory: t.hex(),
  withdrawalRecipient: t.hex(),
  execLayerRecipient: t.hex(),
  coverageRecipient: t.hex(),
  oracleAggregator: t.hex(),
  exitQueue: t.hex(),
  blockNumber: t.bigint(),
  blockNumber2: t.bigint(),
}));
