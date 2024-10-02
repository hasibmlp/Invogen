import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const id = util.autoId();
  const { input } = ctx.args;

  const values = {
    ...input,
    id,
    status: "DRAFT",
    totalAmount: calculateTotalAmount(input.items),
  };
  
  return { payload: { key: { id }, values: values } };
}

export function response(ctx) {
  return ctx.result;
}

/**
 * A helper function to calculate the total amount of the invoice from its items
 */
function calculateTotalAmount(items) {
  return items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
}
