import useRequest from "../../hooks/use-request";
import Router from 'next/router';

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: { ticketId: ticket.id },
    onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
  });

  return (
    <div className="mt-6" style={{ maxWidth: 420, margin: "40px auto 0" }}>
      <div className="ticket-card">
        <div className="ticket-card__header">
          <span className="ticket-card__label">Admit One</span>
          <div className="ticket-card__title">{ticket.title}</div>
        </div>
        <div className="ticket-card__footer">
          <div>
            <div className="muted" style={{ fontSize: 12 }}>Price</div>
            <div className="ticket-card__price">${ticket.price}</div>
          </div>
        </div>
        <div style={{ padding: "0 20px 20px" }}>
          {errors}
          <button onClick={() => doRequest()} className="btn btn--primary btn--block">
            Purchase ticket
          </button>
        </div>
      </div>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  return { ticket: data };
};

export default TicketShow;