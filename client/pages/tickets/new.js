import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: { title, price },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = (event) => {
    event.preventDefault();
    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) return;
    setPrice(value.toFixed(2));
  };

  return (
    <div className="card form-card mt-6">
      <div className="card__body">
        <span className="eyebrow">New listing</span>
        <h1 className="page-title" style={{ fontSize: 26, marginTop: 6 }}>
          Create a ticket
        </h1>
        <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>
          Give it a clear title and a fair price.
        </p>

        <form onSubmit={onSubmit} className="mt-4">
          <div className="field">
            <label className="field__label">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="e.g. Front row — Coldplay"
            />
          </div>
          <div className="field">
            <label className="field__label">Price (USD)</label>
            <input
              value={price}
              onBlur={onBlur}
              onChange={(e) => setPrice(e.target.value)}
              className="input"
              placeholder="0.00"
            />
          </div>
          {errors}
          <button type="submit" className="btn btn--primary btn--block mt-2">
            Publish ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTicket;