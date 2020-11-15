import React, { useEffect, useRef } from 'react'

const SUPPORTED_CURRENCIES = ['HRK', 'USD']

const CurrencyInput = props => {
  const inputRef = useRef(null);

  useEffect(() => {
    props.focus && inputRef.current.focus();
  }, []);

  return (
    <div className="currency-input">
      <input ref={inputRef} type="number" onChange={e => props.onChange(e.target.value * 100)} placeholder="0.00 kn"
             defaultValue={props.initialValue ? (props.initialValue / 100).toFixed(2) : ''}
             className={props.className}
      />
      <select value={props.currency || 'USD'} onChange={props.onCurrencyChange}
              readOnly={!props.onCurrencyChange}
              className={props.className}>
        {SUPPORTED_CURRENCIES.map(currency => <option key={currency} value={currency}>{currency}</option>)}
      </select>
    </div>
  )
}

export default CurrencyInput;
