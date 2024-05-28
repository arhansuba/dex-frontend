import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getTrades, updateTrade } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: trades, isLoading, error } = useQuery(getTrades);
  const updateTradeFn = useAction(updateTrade);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {trades.map((trade) => (
        <div key={trade.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{trade.tokenPair}</div>
          <div>{trade.tradeVolume}</div>
          <div>{trade.exchangeName}</div>
          <button
            onClick={() => updateTradeFn({ id: trade.id })}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Update Trade
          </button>
          <Link
            to={`/trade/${trade.id}`}
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
          >
            Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;