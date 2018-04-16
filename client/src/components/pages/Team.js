import React from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import LogbookTextField from '../helpers/LogbookTextField';
// material-ui elements
import { CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton                           from 'material-ui/FlatButton';
import IconButton                           from 'material-ui/IconButton';
import Paper                                from 'material-ui/Paper';
import RaisedButton                         from 'material-ui/RaisedButton';
// material-ui icons
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';
import HelpIcon          from 'material-ui/svg-icons/action/help';
import PersonAddIcon     from 'material-ui/svg-icons/social/person-add';
// material-ui colors
import {red500} from 'material-ui/styles/colors';

import validate from '../helpers/validate';

const PAGE_NAME = 'team_';

const STYLES = {
  longField: {
    top: 25,
  },
};

class RemotePICHelpText extends React.Component {
  render() {
    const style = {
      width: 250,
      margin: 20,
      padding: 5,
      textAlign: 'left',
      display: 'inline-block',
    };

    return (
      <Paper
        name={`${PAGE_NAME}RemotePICHelp`}
        style={style}
        zDepth={1}
      >
        <p>remote PIC - A person who holds a remote pilot certificate with
        an sUAS rating and has the final authority and responsibility for
        the operation and safety of an sUAS operation conducted under part
        107.</p>
      </Paper>
    )
  }
}

class AddRemotePICButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelp: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
  }

  handleClick() {
    this.props.addNewRemotePIC();
  }

  toggleHelp() {
    this.setState({showHelp: !this.state.showHelp});
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Add Remote PIC"
          labelPosition="before"
          tooltip="Add remote Pilot in Command (PIC)"
          backgroundColor="#B46012"
          icon={<PersonAddIcon />}
          onClick={this.handleClick}
          style={{verticalAlign: "middle"}}
        />
        <IconButton
          tooltip="Define remote PIC"
          onClick={this.toggleHelp}
          style={{verticalAlign: "middle"}}
        >
          <HelpIcon />
        </IconButton>
        {this.state.showHelp &&
          <div><RemotePICHelpText /></div>
        }
      </div>
    )
  }
}

const renderRemotePICs = ({ fields, change, meta: { touched, error, submitFailed } }) => (
  <div>
    <ul style={{listStyleType: "none", padding: 0}}>
      {fields.map((remotePIC, index) =>
        <li key={index}>
          <strong>Remote PIC #{index + 1}</strong>
          <IconButton
            tooltip="Remove remote PIC"
            onClick={() => fields.remove(index)}
            style={{verticalAlign: "middle"}}
          >
            <DeleteForeverIcon color={red500} />
          </IconButton>
          <LogbookTextField fieldName={`${remotePIC}.Name`} fieldLabel="Name" required={true} />
          <LogbookTextField
            fieldName={`${remotePIC}.License`}
            fieldLabel="Certificate # or equivalent as per local law"
            floatingLabelShrinkStyle={STYLES.longField}
          />
        </li>
      )}
    </ul>
    <AddRemotePICButton addNewRemotePIC={() => fields.push({})} />
    {(touched || submitFailed) && error && <p><span className="error-msg">{error}</span></p>}
  </div>
);

class PICHelpText extends React.Component {
  render() {
    const style = {
      width: 250,
      margin: 20,
      padding: 5,
      textAlign: 'left',
      display: 'inline-block'
    };

    return (
      <Paper
        name={`${PAGE_NAME}PICHelp`}
        style={style}
        zDepth={1}
      >
        <p>PIC - A person other than the remote pilot in command (PIC)
          who is controlling the flight of an sUAS under the supervision
          of the remote PIC.</p>
      </Paper>
    )
  }
}

class AddPICButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelp: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
  }

  handleClick() {
    this.props.addNewPIC();
  }

  toggleHelp() {
    this.setState({showHelp: !this.state.showHelp});
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Add PIC"
          labelPosition="before"
          backgroundColor="#B46012"
          icon={<PersonAddIcon />}
          onClick={this.handleClick}
          style={{verticalAlign: "middle"}}
        />
        <IconButton
          tooltip="Define PIC"
          onClick={this.toggleHelp}
          style={{verticalAlign: "middle"}}
        >
          <HelpIcon />
        </IconButton>
        {this.state.showHelp &&
          <div><PICHelpText /></div>
        }
      </div>
    )
  }
}

const renderPICs = ({ fields, change }) => (
  <div>
    <ul style={{listStyleType: "none", padding: 0}}>
      {fields.map((pic, index) =>
        <li key={index}>
          <strong>Pilot #{index + 1}</strong>
          <IconButton
            tooltip="Remove PIC"
            onClick={() => fields.remove(index)}
            style={{verticalAlign: "middle"}}
          >
            <DeleteForeverIcon color={red500} />
          </IconButton>
          <LogbookTextField fieldName={`${pic}.Name`} fieldLabel="Name" required={true} />
        </li>
      )}
    </ul>
    <AddPICButton addNewPIC={() => fields.push({})} />
  </div>
);

class VOHelpText extends React.Component {
  render() {
    const style = {
      width: 250,
      margin: 20,
      padding: 5,
      textAlign: 'left',
      display: 'inline-block'
    };

    return (
      <Paper
        name={`${PAGE_NAME}VOHelp`}
        style={style}
        zDepth={1}
      >
        <p>VO - A person acting as a flightcrew member who assists the small
          UA remote PIC and the person manipulating the controls to see and
          avoid other air traffic or objects aloft or on the ground.</p>
      </Paper>
    )
  }
}

class AddVOButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelp: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
  }

  handleClick() {
    this.props.addNewVO();
  }

  toggleHelp() {
    this.setState({showHelp: !this.state.showHelp});
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Add VO"
          labelPosition="before"
          backgroundColor="#B46012"
          icon={<PersonAddIcon />}
          onClick={this.handleClick}
          style={{verticalAlign: "middle"}}
        />
        <IconButton
          tooltip="Define VO"
          onClick={this.toggleHelp}
          style={{verticalAlign: "middle"}}
        >
          <HelpIcon />
        </IconButton>
        {this.state.showHelp &&
          <div><VOHelpText /></div>
        }
      </div>
    )
  }
}

const renderVOs = ({ fields, change }) => (
  <div>
    <ul style={{listStyleType: "none", padding: 0}}>
      {fields.map((vo, index) =>
        <li key={index}>
          <strong>VO #{index + 1}</strong>
          <IconButton
            tooltip="Remove VO"
            onClick={() => fields.remove(index)}
            style={{verticalAlign: "middle"}}
          >
            <DeleteForeverIcon color={red500} />
          </IconButton>
          <LogbookTextField fieldName={`${vo}.Name`} fieldLabel="Name" required={true} />
        </li>
      )}
    </ul>
    <AddVOButton addNewVO={() => fields.push({})} />
  </div>
);

class Team extends React.Component {
  componentDidMount() {
    this.props.trackPage('Team');
  }

  render() {
    const { handleSubmit, previousPage } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CardTitle title="Team Information" />
        <CardText>
          <FieldArray name={`${PAGE_NAME}RemotePICs`} component={renderRemotePICs} />
          <FieldArray name={`${PAGE_NAME}PICs`} component={renderPICs} />
          <FieldArray name={`${PAGE_NAME}VOs`} component={renderVOs} />
        </CardText>
        <CardActions>
          <FlatButton
            className="previous"
            label="Previous"
            onClick={previousPage}
            backgroundColor="#BAA892"
          />
          <RaisedButton
            className="next"
            label="Next"
            type="submit"
            backgroundColor="#FFD100"
          />
        </CardActions>
      </form>
    )
  }
}

export default reduxForm({
  form: 'logbook',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(Team);
