import React, { useState, Fragment } from 'react';
import { useAsyncDebounce } from 'react-table';

export const GlobalFilter = ({ filter, setFilter, metadata }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 750);
  return (
    <div className="row">
      <div
        className="form-group"
        style={{
          display: 'flex',
          marginLeft: '65%',
        }}
      >
        <label
          style={{
            marginTop: '2px',
            //float: "right",
          }}
          for="tableSearch"
        >
          Search
        </label>
        <input
          type="text"
          class="form-control"
          id="tableSearch"
          aria-describedby="tableSearch"
          placeholder={`Search ${metadata}`}
          style={{
            display: 'inline-block',
            width: '200px',
            height: '30px',
            marginLeft: '10px',
            float: 'right',
          }}
          autocomplete="off"
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
