/**
 * Created by Michal on 2015-11-18.
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import render_app from '../hello_render';

describe('Render Hello', () => {
    it('Should render the HelloForm element into the target', () => {
        var targets = [];

        ReactDOM.render = (item, target) => {targets.push([item, target]);};
        render_app(document.body);

        expect(targets).toNotEqual([]);
    }
    )
});
