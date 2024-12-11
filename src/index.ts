import { ponder } from "ponder:registry";
import { depositorList } from "../ponder.schema";
import { replaceBigInts } from "@ponder/utils";
import { toHex } from "viem";

// Function to convert hex to bigint
const hexToBigInt = (hex: string) => BigInt(hex);

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

  await context.db.insert(depositorList).values({
    pool: pool,
    factory: factory,
    withdrawalRecipient: withdrawalRecipient,
    execLayerRecipient: execLayerRecipient,
    coverageRecipient: coverageRecipient,
    oracleAggregator: oracleAggregator,
    exitQueue: exitQueue,
    blockNumber2: hexToBigInt(eventNoBigInts?.block?.number),
  });

  console.log(`Pool ${pool} spawned`);
});
