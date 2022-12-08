import React        from 'react';
import FlatButton   from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const STYLES = {
  prev: {
    marginRight: 12,
  },
}

export const ClearButton = props => (
  <RaisedButton
    label="Clear form"
    labelPosition="before"
    backgroundColor="#AD1F65"
    onClick={props.clearAndReturn}
  />
)

export const PrevButton = props => (
  <FlatButton
    label="Previous"
    type="button"
    backgroundColor="#BAA892"
    style={STYLES.prev}
    onClick={props.onClick}
  />
)

export const NextButton = () => (
  <RaisedButton
    label="Next"
    type="submit"
    backgroundColor="#FFD100"
  />
)
