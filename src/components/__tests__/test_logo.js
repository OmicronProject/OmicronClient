/**
 * Created by Michal on 2016-01-11.
 */
'use strict';

import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import Logo from '../logo';
import React from 'react';

describe('Test Logo renderer', () => {
    it('Should accept props into its constructor', () => {
        let props = {source: "https://avatars3.githubusercontent.com/u/8391612?v=3&s=460"}
        let logo = new Logo(props);
        expect(logo.props).toEqual(props);
    });

    it('Should render into the DOM', () => {
        let props = {source: "https://avatars3.githubusercontent.com/u/8391612?v=3&s=460"}
        let logo = new Logo(props);

        let root = TestUtils.renderIntoDocument(<logo />);
        expect(root).toExist();
    })
});