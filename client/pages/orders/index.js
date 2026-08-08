const OrderIndex = ({ orders }) => {
  const statusBadge = (status) => {
    if (status === 'complete') return { label: 'Complete', cls: 'badge--success' };
    if (status === 'cancelled') return { label: 'Cancelled', cls: 'badge--danger' };
    return { label: status, cls: 'badge--success' };
  };

  return (
    <div className="mt-6">
      <span className="eyebrow">Account</span>
      <h1 className="page-title" style={{ fontSize: 28, marginTop: 6, marginBottom: 20 }}>
        Your orders
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {orders.map(order => {
          const badge = statusBadge(order.status);
          return (
            <div key={order.id} className="card" style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600 }}>{order.ticket.title}</div>
                <div className="muted" style={{ fontSize: 13 }}>${order.ticket.price}</div>
              </div>
              <span className={`badge ${badge.cls}`}>{badge.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');
  return { orders: data };
};

export default OrderIndex;