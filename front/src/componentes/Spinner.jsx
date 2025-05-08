import React from 'react';

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-primary" style={{ width: '5rem', height: '5rem' }} role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
    </div>
  );
};

export default Spinner;
