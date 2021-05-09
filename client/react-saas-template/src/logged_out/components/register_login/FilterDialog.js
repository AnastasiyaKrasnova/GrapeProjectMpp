import React, {Fragment} from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Button,
  NativeSelect,
  withStyles,
  InputLabel
} from "@material-ui/core";
import FormDialog from "../../../shared/components/FormDialog";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import axios from 'axios';

const styles = (theme) => ({
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
});

class FilterDialog extends React.Component{
    constructor(props){
        super(props)
        this.state={
          catalog_num: "",
          name: "",
          authors:[],
          author: null,
          categorys: [],
          category: null,
          size_from: "",
          size_to: "",
          price_from: "",
          price_to: "",
          extension: "",
          isLoading: true
        }
        this.soundFiltering=this.soundFiltering.bind(this);
    }
    async componentWillMount(){
      var authors=await axios.get(`http://localhost:3002/users/list?role=user`)
      var categorys=await axios.get(`http://localhost:3002/categorys/list`)
      this.setState({isLoading: false, categorys: categorys.data, authors: authors.data})
    }

    soundFiltering(){
      let filters={
        catalog_num: this.state.catalog_num===""?null:this.state.catalog_num,
        name: this.state.name===""?null:this.state.name,
        author_id: this.state.author,
        category_id: this.state.category,
        duration_to: this.state.size_to===""?null:this.state.size_to,
        duration_from: this.state.size_from===""?null:this.state.size_from,
        price_to: this.state.price_to===""?null:this.state.price_to,
        price_from: this.state.price_from===""?null:this.state.price_from,
        extension: this.state.extension===""?null:this.state.extension,
      }
      this.props.doFilter(filters)
    }

    render(){
    return (
    <Fragment>
      <FormDialog
        open={this.props.open}
        onClose={this.props.onClose}
        loading={this.state.isLoading}
        hideBackdrop
        headline="Фильтры"
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.catalog_num}
              onChange={e => {
                const re = /^[0-9a-fA-F]+$/;
                if (e.target.value ==='' || re.test(e.target.value)) {
                    this.setState({ catalog_num: e.target.value })
                  }
                }
              }
              label="Номер в каталоге"
              autoFocus
              autoComplete="off"
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Имя файла"
              autoComplete="off"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <InputLabel id="authorLabel">Автор</InputLabel>
            <NativeSelect inputProps={{id: 'authorLabel'}} fullWidth
                onChange={e => this.setState({ author: e.target.value })}>
                <option value={null}>Все</option>
                 {this.state.authors.map(element => (
                    <option key={element._id} value={element._id}>{element.login}</option>
                 ))}
            </NativeSelect>
            <InputLabel id="categoryLabel">Категория</InputLabel>
            <NativeSelect inputProps={{id: 'categoryLabel'}} fullWidth
                onChange={e => this.setState({ category: e.target.value })}>
                <option value={null}>Все</option>
                 {this.state.categorys.map(element => (
                    <option key={element._id} value={element._id}>{element.name}</option>
                 ))}
            </NativeSelect>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.size_from}
              onChange={e => {
                const re = /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
                if (e.target.value ==='' || re.test(e.target.value)) {
                    this.setState({ size_from: e.target.value })
                  }
                }
              }
              label="Размер от(MB):"
              autoComplete="off"
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.size_to}
              onChange={e => {
                const re = /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
                if (e.target.value ==='' || re.test(e.target.value)) {
                    this.setState({ size_to: e.target.value })
                  }
                }
              }
              label="Размер до(MB):"
              autoComplete="off"
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.price_from}
              onChange={e => {
                const re = /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
                if (e.target.value ==='' || re.test(e.target.value)) {
                    this.setState({ price_from: e.target.value })
                  }
                }
              }
              label="Цена от:"
              autoComplete="off"
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.price_to}
              onChange={e => {
                const re = /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
                if (e.target.value ==='' || re.test(e.target.value)) {
                    this.setState({ price_to: e.target.value })
                  }
                }
              }
              label="Цена до:"
              autoComplete="off"
            />
               <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.extension}
              onChange={e => this.setState({ extension: e.target.value })}
              label="Расширение"
              autoComplete="off"
            />
            <Button
              fullWidth
              color="secondary"
              disabled={this.state.isLoading}
              size="large"
              onClick={this.soundFiltering}
            >
              Отфильтровать
              {this.state.isLoading && <ButtonCircularProgress />}
            </Button>
            <Fragment>
            
          </Fragment>
        </Fragment>
        }
      />
    </Fragment>
  );
}
}

FilterDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.string,
};

export default withRouter(withStyles(styles)(FilterDialog));