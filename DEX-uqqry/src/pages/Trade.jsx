import React, { useState } from 'react';
import { useQuery, useAction, getTrade, updateTrade } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const TradePage = () => {
  const { data: trade, isLoading, error } = useQuery(getTrade);
  const updateTradeFn = useAction(updateTrade);
  const [newTradeData, setNewTradeData] = useState({ tokenPair: '', tradeVolume: 0, exchangeName: '' });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateTrade = (id, newData) => {
    updateTradeFn({ id, ...newData });
  };

  return (
    <div className='p-4'>
      {trade && (
        <div className='bg-white shadow rounded p-4'>
          <p><strong>Trade Details:</strong></p>
          <p>Token Pair: {trade.tokenPair}</p>
          <p>Trade Volume: {trade.tradeVolume}</p>
          <p>Exchange Name: {trade.exchangeName}</p>
          <button onClick={() => handleUpdateTrade(trade.id, { tokenPair: 'New Token Pair' })} className='btn'>Update Token Pair</button>
        </div>
      )}
      <div className='mt-4 p-4 bg-gray-100 rounded'>
        <input type='text' placeholder='Token Pair' value={newTradeData.tokenPair} onChange={(e) => setNewTradeData({ ...newTradeData, tokenPair: e.target.value })} className='input' />
        <input type='number' placeholder='Trade Volume' value={newTradeData.tradeVolume} onChange={(e) => setNewTradeData({ ...newTradeData, tradeVolume: parseFloat(e.target.value) })} className='input' />
        <input type='text' placeholder='Exchange Name' value={newTradeData.exchangeName} onChange={(e) => setNewTradeData({ ...newTradeData, exchangeName: e.target.value })} className='input' />
        <button onClick={() => handleUpdateTrade(trade.id, newTradeData)} className='btn'>Update Trade</button>
      </div>
    </div>
  );
}

export default TradePage;