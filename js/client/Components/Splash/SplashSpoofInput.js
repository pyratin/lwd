'use strict';

import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import {
  css
} from '@emotion/core';

const SplashSpoofInput = () => {

  const renderFn = () => {

    return (
      <form
        className = 'w-50'
      >
        <div 
          className = 'formGroupHolder'
        >
          <div
            className = 'formGroup input-group d-flex mb-0'
          >
            <input
              className = {
                `
                  formControl 
                  form-control form-control-lg
                  rounded-left
                ` 
              }
              css = {
                css(
                  {
                    backgroundImage: 'none !important'
                  }
                )
              }
              placeholder = 'YOU !!'
            />

            <div
              className = 'btnGroup input-group-append'
            >
              <button
                className = 'btn btn-secondary'
              >
                <i
                  className = 'fa fa-check'
                ></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div
      className = 
        'SplashSpoofInput d-flex justify-content-center'
    >
      {
        renderFn()
      }
    </div>
  );
};

export default createFragmentContainer(
  SplashSpoofInput,
  {
    viewer: graphql`
      fragment SplashSpoofInput_viewer on Viewer {
        id
      }
    `
  }
);
