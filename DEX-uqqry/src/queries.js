import { HttpError } from 'wasp/server'

export const getTrades = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Trade.findMany({
    where: { userId: context.user.id }
  });
}

export const getTrade = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const trade = await context.entities.Trade.findUnique({
    where: { id: args.id, userId: context.user.id }
  });

  if (!trade) { throw new HttpError(400, 'Trade not found or unauthorized') };

  return trade;
}