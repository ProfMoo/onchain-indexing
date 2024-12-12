import { ponder } from "@/generated";
import { depositor, ownerTransfer, distribution } from "../ponder.schema";
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

ponder.on(
  "PaymentSplitterContract:OwnershipTransferred",
  async ({ event, context }) => {
    console.log(`Found something!!!`);

    // JSON can't stringify bigints, so convert using a utility func here
    let eventNoBigInts = replaceBigInts(event, toHex);
    console.log("Event object:", JSON.stringify(eventNoBigInts, null, 2));

    const { oldOwner, newOwner } = event.args;

    await context.db.insert(ownerTransfer).values({
      oldOwner: oldOwner,
      newOwner: newOwner,
    });
  }
);

ponder.on(
  "PaymentSplitterContract:SplitDistributed",
  async ({ event, context }) => {
    console.log(`Found something!!!`);

    // JSON can't stringify bigints, so convert using a utility func here
    let eventNoBigInts = replaceBigInts(event, toHex);
    console.log("Event object:", JSON.stringify(eventNoBigInts, null, 2));
  }
);

ponder.on(
  "PaymentSplitterContract2:OwnershipTransferred",
  async ({ event, context }) => {
    console.log(`Found something!!!`);

    // JSON can't stringify bigints, so convert using a utility func here
    let eventNoBigInts = replaceBigInts(event, toHex);
    console.log("Event object:", JSON.stringify(eventNoBigInts, null, 2));

    const { oldOwner, newOwner } = event.args;

    await context.db.insert(ownerTransfer).values({
      oldOwner: oldOwner,
      newOwner: newOwner,
    });
  }
);

ponder.on(
  "UsedPaymentSplitterContract:SplitDistributed",
  async ({ event, context }) => {
    console.log(`Found something!!!`);

    // JSON can't stringify bigints, so convert using a utility func here
    let eventNoBigInts = replaceBigInts(event, toHex);
    console.log("Event object:", JSON.stringify(eventNoBigInts, null, 2));
  }
);

ponder.on(
  "UsedPaymentSplitterContract2:SplitDistributed",
  async ({ event, context }) => {
    console.log(`Found something!!!`);

    // JSON can't stringify bigints, so convert using a utility func here
    let eventNoBigInts = replaceBigInts(event, toHex);
    console.log("Event object:", JSON.stringify(eventNoBigInts, null, 2));

    const { token, distributor, amount } = event.args;

    await context.db.insert(distribution).values({
      token: token,
      distributor: distributor,
      amount: amount.toString(),
    });
  }
);
