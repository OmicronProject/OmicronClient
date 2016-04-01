/**
 * Created by Michal on 2016-03-03.
 */
import React from 'react';
import Header from './header';
import ProjectList from '../components/projects';
import {ProjectControlPanel} from '../components/projects';
import {Panel} from 'react-bootstrap';

import '../../static/css/containers/projects.css';

const ProjectPage = () => (
    <div className="container-fluid">
        <Header />
        <div className="row">
            <Panel bsClass="project-panel">
                <ProjectControlPanel />
                <ProjectList />
            </Panel>
        </div>
    </div>
);

export default ProjectPage;