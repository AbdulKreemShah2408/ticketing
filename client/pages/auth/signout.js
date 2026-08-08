import { useEffect, useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const signout = () => {
  const [failed, setFailed] = useState(false);
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    doRequest().catch(() => setFailed(true));
  }, []);

  return (
    <div className="card mt-6" style={{ maxWidth: 420, margin: "40px auto 0", textAlign: "center", padding: 32 }}>
      <span style={{ fontSize: 32 }}>{failed ? "⚠️" : "👋"}</span>
      {failed ? (
        <>
          <p style={{ fontWeight: 600, color: "var(--ink)", marginTop: 12 }}>
            Couldn&apos;t sign you out
          </p>
          <p className="muted">Please try again in a moment.</p>
        </>
      ) : (
        <>
          <p style={{ fontWeight: 600, color: "var(--ink)", marginTop: 12 }}>
            Signing you out…
          </p>
          <p className="muted">You&apos;ll be redirected home in a moment.</p>
        </>
      )}
    </div>
  );
};

export default signout;