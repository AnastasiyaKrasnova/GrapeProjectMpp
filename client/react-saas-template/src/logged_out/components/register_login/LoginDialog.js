import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter} from "react-router-dom";
import {
  TextField,
  Button,
  withStyles,
  InputLabel
} from "@material-ui/core";
import FormDialog from "../../../shared/components/FormDialog";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
import axios from 'axios';

const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
});

class LoginDialog extends React.Component{
  constructor(props){
      super(props)
      this.state={
        email:"",
        password:"",
        error:"",
        isLoading: false,
        isVisible: false
      }
      this.doLogin=this.doLogin.bind(this);
  }
  
  async doLogin(){
    let user={
      email: this.state.email,
      password: this.state.password
    }
    axios.post(`http://localhost:3002/users/login`,user)
    .then((res)=>{
        document.cookie = `auth-token=${res.data}; max-age=3600`;
        setTimeout(() => {
          this.props.history.push("/c/dashboard");
        }, 150);
      })
    .catch((err)=>{
        console.log(err)
        this.setState({error: "Почта или пароль не верны"})
      })   
  }
  render(){
    return (
      <Fragment>
      <FormDialog
        open={this.props.open}
        onClose={this.props.onClose}
        loading={false}
        hideBackdrop
        headline="Вход"
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.catalog_num}
              onChange={e => this.setState({ email: e.target.value })}
              label="Email"
              autoFocus
              autoComplete="off"
            />
             <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Пароль"
              autoComplete="off"
              onChange={e => this.setState({ password: e.target.value })}
              onVisibilityChange={()=>{
                if (this.state.isVisible)
                  this.setState({isVisible:false})
                else this.setState({isVisible:true})
              }}
              isVisible={this.state.isVisible}
            />
            <InputLabel id="errorLabel">{this.state.error}</InputLabel>
            <Button
              fullWidth
              color="secondary"
              disabled={this.state.isLoading}
              onClick={this.doLogin}
              size="large"
            >
              Войти
              {this.state.isLoading && <ButtonCircularProgress />}
            </Button>
            <Fragment> 
          </Fragment>
        </Fragment>
        }
      />
    </Fragment>
    )
  }  
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(LoginDialog));
