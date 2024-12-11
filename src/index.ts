import { ponder } from "@/generated";
import { depositorList } from "../ponder.schema";

ponder.on("OperatorContract:SpawnedPool", async ({ event, context }) => {
  const {
    factory,
    pool,
    withdrawalRecipient,
    execLayerRecipient,
    coverageRecipient,
    oracleAggregator,
    exitQueue,
  } = event.args;

  await context.db.insert(depositorList).values({
    pool: pool,
    factory: factory,
    withdrawalRecipient: withdrawalRecipient,
    execLayerRecipient: execLayerRecipient,
    coverageRecipient: coverageRecipient,
    oracleAggregator: oracleAggregator,
    exitQueue: exitQueue,
  });

  console.log(`Pool ${pool} spawned`);
});
