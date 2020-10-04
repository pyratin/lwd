'use strict';

import React from 'react';

const Loading = () => {

  const iconRender = () => {

    return (
      <div
        className = 'mx-auto'
      >
        <i
          className = 'fa fa-spinner fa-spin'
        ></i>
      </div>
    );
  };

  return (
    <div
      className = 'Loading d-flex'
    >
      {
        iconRender()
      }
    </div>
  );
};

export default Loading;
