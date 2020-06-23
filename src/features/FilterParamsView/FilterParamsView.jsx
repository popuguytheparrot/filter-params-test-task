import React from 'react';

export const FilterParamsView = ({ params }) => {
  return <pre>{JSON.stringify(params, null, 2)}</pre>;
};
