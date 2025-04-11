
import React from 'react';
import TicketsList from '@/components/tickets/TicketsList';

const TicketsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Manage Tickets</h1>
      <TicketsList />
    </div>
  );
};

export default TicketsPage;
