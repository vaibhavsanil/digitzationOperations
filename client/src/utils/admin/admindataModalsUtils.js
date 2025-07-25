import React from 'react';

export const getAdminStatusBadge = (status) => {
  if (status) {
    return <span className="badge badge-success">Admin</span>;
  } else {
    return <span className="badge badge-danger">Metadata</span>;
  }
};

export const getStatusBadge = (status) => {
  if (status) {
    return <span className="badge badge-success">Live</span>;
  } else {
    return <span className="badge badge-danger">Not Live</span>;
  }
};

export const getIPBadge = (ip) => {
  return <span className="badge badge-danger">{ip}</span>;
};
