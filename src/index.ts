import { ponder } from "@/generated";
import { depositor } from "../ponder.schema";
import { replaceBigInts } from "@ponder/utils";
import { toHex } from "viem";

ponder.on("OperatorContract:SpawnedPool", async ({ event, context }) => {
  console.log(`Found something!!!`);

  // JSON can't stringify bigints, so convert using a utility func here
  let eventNoBigInts = replaceBigInts(event, toHex);
  console.log("Event object:", JSON.stringify(eventNoBigInts, null, 2));

  const {
    factory,
    pool,
    withdrawalRecipient,
    execLayerRecipient,
    coverageRecipient,
    oracleAggregator,
    exitQueue,
  } = event.args;

  await context.db.insert(depositor).values({
    pool: pool,
    factory: factory,
    withdrawalRecipient: withdrawalRecipient,
    execLayerRecipient: execLayerRecipient,
    coverageRecipient: coverageRecipient,
    oracleAggregator: oracleAggregator,
    exitQueue: exitQueue,
    test: "123",
  });

  console.log(`Pool ${pool} spawned`);
});
