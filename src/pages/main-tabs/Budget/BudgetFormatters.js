import React from 'react';
import './Budget.css';

//todo: remove this js file and move the formatter to a higher hierarchy in src
export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

});


