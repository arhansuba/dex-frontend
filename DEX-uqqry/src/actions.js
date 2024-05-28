import { HttpError } from 'wasp/server'

export const executeTrade = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newTrade = await context.entities.Trade.create({
    data: {
      user: { connect: { id: context.user.id } },
      tokenPair: args.tokenPair,
      tradeVolume: args.tradeVolume,
      exchangeName: args.exchangeName
    }
  });

  return newTrade;
}

export const updateTrade = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const trade = await context.entities.Trade.findUnique({
    where: { id: args.id }
  });
  if (!trade || trade.userId !== context.user.id) { throw new HttpError(400) };

  return context.entities.Trade.update({
    where: { id: args.id },
    data: { tokenPair: args.tokenPair, tradeVolume: args.tradeVolume, exchangeName: args.exchangeName }
  });
}