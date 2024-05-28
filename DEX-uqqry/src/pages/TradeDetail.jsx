import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, getTrade } from 'wasp/client/operations';

const TradeDetailPage = () => {
  const { tradeId } = useParams();
  const { data: trade, isLoading, error } = useQuery(getTrade, { id: parseInt(tradeId) });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Trade Details</h1>
      <p><strong>Token Pair:</strong> {trade.tokenPair}</p>
      <p><strong>Trade Volume:</strong> {trade.tradeVolume}</p>
      <p><strong>Exchange Name:</strong> {trade.exchangeName}</p>
    </div>
  );
}

export default TradeDetailPage;