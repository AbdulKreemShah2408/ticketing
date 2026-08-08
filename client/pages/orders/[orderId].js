import { useEffect, useState } from "react";
import StripeCheckout from 'react-stripe-checkout';
import useRequest from "../../hooks/use-request";
import Router from 'next/router';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: { orderId: order.id },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => clearInterval(timerId);
  }, [order]);

  if (timeLeft < 0) {
    return (
      <div className="card form-card mt-6">
        <div className="card__body">
          <span className="eyebrow">Checkout</span>
          <h1 className="page-title" style={{ fontSize: 22, marginTop: 6 }}>
            Complete your order
          </h1>
          <div className="mt-4" style={{ background: "#fee2e2", color: "var(--danger)", padding: 14, borderRadius: 10, fontSize: 14 }}>
            This order has expired. Please reserve the ticket again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card form-card mt-6">
      <div className="card__body">
        <span className="eyebrow">Checkout</span>
        <h1 className="page-title" style={{ fontSize: 22, marginTop: 6 }}>
          Complete your order
        </h1>

        <div className="mt-4" style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
          <span className="muted">Ticket</span>
          <strong>{order.ticket.title}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginTop: 8, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
          <span className="muted">Price</span>
          <strong>${order.ticket.price}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 10 }}>
          <span className="muted">Order ID</span>
          <span className="muted">{order.id}</span>
        </div>

        <div className="mt-4" style={{ background: "#fef3c7", color: "#92400e", padding: 12, borderRadius: 10, fontSize: 14 }}>
          <strong>{timeLeft}</strong> seconds left to pay
        </div>

        <div className="mt-4">
          <StripeCheckout
            token={({ id }) => doRequest({ token: id })}
            stripeKey="pk_test_51SbB2b0RNd7xQCjRL5Up2Vj14gAsodAfxP69HB9d7fKbbQZjHgBgYqHPRhTGycdeos0S9jgEvKZdVkNW9pgmZLM300l6Ou85Su"
            amount={order.ticket.price * 100}
            email={currentUser.email}
          />
        </div>
        {errors}
      </div>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default OrderShow;