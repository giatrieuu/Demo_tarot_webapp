// src/components/Loader.tsx
import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
    return (
        <div className="loader">
            <div style={{ '--i': 1 } as React.CSSProperties} className="loader_item"></div>
            <div style={{ '--i': 2 } as React.CSSProperties} className="loader_item"></div>
            <div style={{ '--i': 3 } as React.CSSProperties} className="loader_item"></div>
            <div style={{ '--i': 4 } as React.CSSProperties} className="loader_item"></div>
            <div style={{ '--i': 5 } as React.CSSProperties} className="loader_item"></div>
            <div style={{ '--i': 6 } as React.CSSProperties} className="loader_item"></div>
            <div style={{ '--i': 7 } as React.CSSProperties} className="loader_item"></div>
            <div style={{ '--i': 8 } as React.CSSProperties} className="loader_item"></div>
            <div style={{ '--i': 9 } as React.CSSProperties} className="loader_item"></div>
            <div style={{ '--i': 10 } as React.CSSProperties} className="loader_item"></div>
            <div style={{ '--i': 11 } as React.CSSProperties} className="loader_item"></div>
            <div style={{ '--i': 12 } as React.CSSProperties} className="loader_item"></div>
        </div>
    );
};

export default Loader;
