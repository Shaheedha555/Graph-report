import React from 'react';
import { ReactComponent as PrinterIcon } from '../icons/printer.svg';

function Button({ handlePrint }) {



    return (
        <div >
            <button onClick={handlePrint} style={{ cursor: 'pointer', padding: '1rem 1.5rem', borderRadius: '16px', border: 'none', color: 'white', backgroundColor: 'rgba(9, 14, 36, 1)', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }} >
                <PrinterIcon />
                <span style={{ fontWeight: '600' }}>Print</span>
            </button>
        </div>
    );
}

export default Button;
