/**
 * Created by Michal on 2016-02-17.
 */
import React from 'react';

export const URLEntryForm = ({url_value, on_url_change, on_button_click}) => (
    <form>
        <div className="form-group">
            <label>JSON API URL</label>
            <input type="text" className="form-control"
                   placeholder="URL to Contact"
                   value={url_value} onChange={on_url_change}
                   />
        </div>
        <div className="form-group">
            <button className="btn btn-default" onClick={on_button_click}
                    type="button">
                Run Request
            </button>
        </div>
    </form>
);

export const ResultsBox = ({url_value, test_result}) => (
    <div className="container">
        <div className="row">
            <div className="col-md-8">
                <h4>URL:</h4> {url_value}
            </div>
            <div className="col-md-8">
                <p>Result of test:</p>
                <p>{JSON.stringify(test_result)}</p>
            </div>
        </div>
    </div>
);