import React from 'react';

export default function Modal(props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 444,
      }}
    >
      <div
        style={{
          minHeight: '150px',
          backgroundColor: '#fff',
          minWidth: '400px',
          maxWidth: '500px',
          borderRadius: 10,
          position: 'relative',
        }}
      >
        <div
          style={{
            backgroundColor: 'crimson',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <h3 style={{ color: '#fff', fontWeight: 600 }}>{props.header}</h3>
        </div>
        <div style={{ padding: '.5rem 1rem', marginBottom: 60 }}>
          {props.children}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '.5rem 1rem',
            borderTop: '1px solid #ddd',
          }}
        >
          <button
            onClick={(e) => props.close(e)}
            style={{
              backgroundColor: '#f6f6f6',
              borderRadius: 3,
              borderColor: '#f6f6f6',
              color: '#000',
              fontSize: 16,
              padding: '.5rem 2rem',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={(e) => props.submit(e)}
            style={{
              backgroundColor: 'crimson',
              borderRadius: 3,
              borderColor: 'crimson',
              color: '#fff',
              fontSize: 16,
              cursor: 'pointer',
              padding: '.5rem 2rem',
              margin: '0 .5rem',
            }}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}
