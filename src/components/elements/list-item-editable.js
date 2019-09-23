import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import {
  Typography,
  Button,
  ListItemSecondaryAction,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

import { PageContent } from '../../layouts/PageContent';
import { SelectSimple } from './select-simple';
import { TextFieldSimple } from './textfield-simple';

const styles = {
  label: {
    fontWeight: 700,
  },
  input: {
    padding: '10px',
  },
};

const Container = styled.div`
  margin-top: 15px;
`;

const ListItemEditableBase = ({
  classes,
  value,
  label,
  options,
  type,
  onSave,
  inputType,
}) => {
  const [variant, setVariant] = useState(value);
  const [modeEdit, setModeEdit] = useState(false);

  const handleOnChange = newValue => {
    let valueToSave;
    switch (type) {
      case 'select': {
        valueToSave = options.find((item) => item.value === newValue);
        break;
      }
      case 'textfield': {
        if (newValue === '') {
          return;
        }
        valueToSave = newValue;
        break;
      }
      default: {
        valueToSave = newValue;
        break;
      }
    }
    setVariant(valueToSave);
  };

  const handleOnSave = () => {
    onSave(variant);
    setModeEdit(false);
  };

  const handleOnClose = () => {
    setVariant(value);
    setModeEdit(false);
  };

  const handleOnOpen = () => {
    setModeEdit(true);
  };

  return (
    modeEdit
      ? (
        <Container>
          <PageContent>
            <Typography variant="subtitle1" className={classes.label}>
              {label}
            </Typography>
            { type === 'select'
              && (
                <SelectSimple
                  value={variant.value}
                  onChange={(e) => handleOnChange(e.target.value)}
                  options={options}
                />
              )}
            { type === 'textfield'
              && (
                <TextFieldSimple
                  type={inputType}
                  value={variant}
                  onChange={(e) => handleOnChange(e.target.value)}
                />
              )}
          </PageContent>
          <ListItem>
            <Button color="primary" onClick={handleOnSave}>
              сохранить
            </Button>
            <Button color="primary" onClick={handleOnClose}>
              закрыть
            </Button>
          </ListItem>
          <Divider />
        </Container>
      )
      : (
        <>
          <ListItem>
            { type === 'select'
              && <ListItemText primary={label} secondary={variant.label} />}
            { type === 'textfield'
              && <ListItemText primary={label} secondary={variant} />}
            <ListItemSecondaryAction>
              <Button size="small" onClick={handleOnOpen}>
                изменить
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </>
      )
  );
};

ListItemEditableBase.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  inputType: PropTypes.string,
};

ListItemEditableBase.defaultProps = {
  label: '',
  type: '',
  options: null,
  inputType: 'text',
};

export const ListItemEditable = withStyles(styles)(ListItemEditableBase);
