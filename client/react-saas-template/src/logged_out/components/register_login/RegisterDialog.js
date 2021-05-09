import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
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
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
});

class RegisterDialog extends React.Component{
  constructor(props){
      super(props)
      this.state={
        first_name:"",
        last_name:"",
        login:"",
        email:"",
        password:"",
        error:"",
        isVisible: false,
        isLoading: false
      }
      this.doRegister=this.doRegister.bind(this);
  }
  
  async doRegister(){
    let user={
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      login: this.state.login,
      email: this.state.email,
      password_hash: this.state.password
    }
    axios.post(`http://localhost:3002/users/register`,user)
    .then((res)=>{
        document.cookie = `auth-token=${res.data}; max-age=3600`;
        setTimeout(() => {
          this.props.history.push("/c/dashboard");
        }, 150);
      })
    .catch((err)=>{
      console.log(err.response.data)
      if (err.response.data=="User data is not full")
        this.setState({error: "Заполните все поля"})
      if (err.response.data=="User already exists")
        this.setState({error: "Данный пользователь уже существует"})
      })   
  }

  render(){
    return (
      <Fragment>
      <FormDialog
        open={this.props.open}
        onClose={this.props.onClose}
        loading={this.state.isLoading}
        hideBackdrop
        headline="Регистрация"
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.first_name}
              onChange={e => this.setState({ first_name: e.target.value })}
              label="Имя"
              autoFocus
              autoComplete="off"
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.last_name}
              onChange={e => this.setState({ last_name: e.target.value })}
              label="Фамилия"
              autoComplete="off"
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.login}
              onChange={e => this.setState({ login: e.target.value })}
              label="Логин"
              autoComplete="off"
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              label="Email"
              autoComplete="off"
            />
             <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Пароль"
              autoComplete="off"
              value={this.state.password}
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
              onClick={this.doRegister}
              size="large"
            >
              Зарегистрироваться
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

RegisterDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(RegisterDialog));
