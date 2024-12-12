import { onchainTable } from "@ponder/core";
import { randomUUID } from "crypto";

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

export const ownerTransfer = onchainTable("ownerTransfer", (t) => ({
  id: t.uuid().primaryKey().default(randomUUID()),
  oldOwner: t.hex(),
  newOwner: t.hex(),
}));

export const distribution = onchainTable("distribution", (t) => ({
  id: t.uuid().primaryKey().default(randomUUID()),
  token: t.hex(),
  amount: t.text(),
  distributor: t.hex(),
}));
