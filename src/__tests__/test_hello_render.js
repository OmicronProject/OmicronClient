/**
 * Created by Michal on 2015-11-18.
 */
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import render_app from '../hello_render';

describe('Render Hello', () => {
    it('Should render the HelloForm element into the target', () => {
        render_app(document.body);
        }
    )
});
