/**
 * Created by Michal on 2016-03-02.
 */
import React, { PropTypes } from 'react';
import {Panel, Table, PanelGroup} from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Reducer from '../reducer';
import {AUTH_SUCCESS} from '../auth/actions';

export const ProjectEntry = ({project_name, description, owner,
    last_updated_message, is_expanded
    }) => (
    <Panel header={<Link to="#">{project_name}</Link>} defaultExpanded={is_expanded}
           eventKey={project_name} collapsible={false}
           bsClass="panel project-view"
    >
        <Table fill>
            <tbody>
                <tr>
                    <td>{description}</td>
                    <td>{owner}</td>
                    <td>{last_updated_message}</td>
                </tr>
            </tbody>
        </Table>
    </Panel>
);

ProjectEntry.propTypes = {
    project_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    last_updated_message: PropTypes.string.isRequired,
    is_expanded: PropTypes.bool.isRequired
};


export const ProjectList = ({projects}) => (
    <PanelGroup accordion>
        {projects}
    </PanelGroup>
);

export function project_entry_factory(project){
    let hours_since_update = Math.floor((Math.random() * 10) + 1);
    let last_updated_message;

    if (hours_since_update == 1){
        last_updated_message = 'Updated 1 hour ago';
    } else {
        last_updated_message = 'Updated ' + hours_since_update + ' hours ago';
    }
    return(
        <ProjectEntry project_name={project.name}
                      description={project.description}
                      owner={project.owner}
                      last_updated_message={last_updated_message}
                      is_expanded={true}
                      key={project.name+project.owner}
                      eventKey={project.name+project.owner}
        />
    );
}

export function map_project_list_state_to_props(state){
    return ({
        projects: state.projects.frontend.projects.map(project_entry_factory)
    })
}

const Projects = connect(map_project_list_state_to_props
)(ProjectList);

export default Projects;


export const ProjectControlPanel = ({}) => (
    <div className="project-control-panel">
        <button className="btn btn-default">
            <Glyphicon glyph="refresh"/>
        </button>
        <button className="btn btn-success">
            <Glyphicon glyph="plus"/>
        </button>
    </div>
);

function add_project_button_reducer(state, action) {
    if (action.type === AUTH_SUCCESS){
        let new_state = Object.assign(state);
        new_state.main_menu.buttons.push({
            name: "Projects", link: "/projects",
            key: "projects_main_menu_button",
            type: "internal"
        });

        return new_state
    } else {
        return state
    }
}

Reducer.register(add_project_button_reducer);