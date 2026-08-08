import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
     <div className="state mt-6" style={{ maxWidth: 420, margin: "40px auto 0" }}>
      <span className="state__icon">{failed ? "⚠️" : "👋"}</span>
      {failed ? (
        <>
          <p style={{ fontWeight: 600, color: "var(--ink)" }}>
            Couldn&apos;t sign you out
          </p>
          <p>Please try again in a moment.</p>
        </>
      ) : (
        <>
          <p style={{ fontWeight: 600, color: "var(--ink)" }}>
            Signing you out…
          </p>
          <p>You&apos;ll be redirected home in a moment.</p>
        </>
      )}
    </div>
  )
};
