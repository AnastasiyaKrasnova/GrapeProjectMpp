import React, { Fragment} from "react";
import PropTypes from "prop-types";
import {
  Button, Typography
} from "@material-ui/core";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";
import axios from 'axios';
import NavBar from "../navigation/NavBar";

class Home extends React.Component{

  constructor(props){
    super(props)
    this.state={
      cards:[],
      features:[],
      prev: null,
      filter: false,
      login: false,
      register: false
    }

    this.handleonCategoryClicked=this.handleonCategoryClicked.bind(this); 
    this.handleonCategoryBackClicked=this.handleonCategoryBackClicked.bind(this);
    this.openFiltering=this.openFiltering.bind(this);
    this.closeFiltering=this.closeFiltering.bind(this);
    this.openLogin=this.openLogin.bind(this);
    this.closeLogin=this.closeLogin.bind(this);
    this.openRegister=this.openRegister.bind(this);
    this.closeRegister=this.closeRegister.bind(this);
    this.doFiltering=this.doFiltering.bind(this);
  }

  async componentWillMount(){
    var features=await axios.get(`http://localhost:3002/categorys/list?parent_id=all`) 
    var sounds=[]
    for (var i=0;i<features.data.length; i++){
      var cards=await axios.post(`http://localhost:3002/sounds/filter`,{category_id: features.data[i]._id})
      sounds.push(cards.data)
    };
    this.setState({ cards: sounds.flat(), features: features.data});
  }


  async handleonCategoryClicked(item){
    console.log("Prev",item)
    var features=await axios.get(`http://localhost:3002/categorys/list?parent_id=${item._id}`)
    var sounds=[]
    for (var i=0;i<features.data.length; i++){
      var cards=await axios.post(`http://localhost:3002/sounds/filter`,{category_id: features.data[i]._id})
      sounds.push(cards.data)
    };
    this.setState({ cards: sounds.flat(), features: features.data, prev: item});
  }

  async handleonCategoryBackClicked(){
    var parent_id="";
    if (this.state.prev==null || this.state.prev.parent_category_id==null) parent_id="all"
    else parent_id=this.state.prev.parent_category_id
    var features=await axios.get(`http://localhost:3002/categorys/list?parent_id=${parent_id}`)
    var sounds=[]
    for (var i=0;i<features.data.length; i++){
      var cards=await axios.post(`http://localhost:3002/sounds/filter`,{category_id: features.data[i]._id})
      sounds.push(cards.data)
    };
    var prev=null
    if (features.data[0].parent_category_id!=null){
      prev=(await axios.get(`http://localhost:3002/categorys/list?id=${features.data[0].parent_category_id}`)).data
    }
    else{
      prev=null
    }
    this.setState({ cards: sounds.flat(), features: features.data, prev: prev});
  }

  openFiltering(){
      this.setState({filter: true})
  }

  closeFiltering(){
    this.setState({filter: false})
  }

  openLogin(){
    this.setState({login: true})
  }

  closeLogin(){
    this.setState({login: false})
  }

  openRegister(){
    this.setState({register: true})
  }
  closeRegister(){
  this.setState({register: false})
  }
  async doFiltering(filters){
    console.log(filters)
    var cards=await axios.post(`http://localhost:3002/sounds/filter`,filters)
    console.log(cards);
    this.setState({filter: false, cards: cards.data})
  }

  render(){
      return (
        <Fragment>
          <HeadSection />
          <NavBar
              openLoginDialog={this.openLogin}
              loginOpen={this.state.login}
              loginClose={this.closeLogin}
              openRegisterDialog={this.openRegister}
              registerOpen={this.state.register}
              registerClose={this.closeRegister}
              openFilterDialog={this.openFiltering}
              doFiltering={this.doFiltering}
              filterOpen={this.state.filter}
              filterClose={this.closeFiltering}
          />
          <Typography align='center'>
           <Button
              color='primary'
              size='large'
              variant='contained'
              onClick={this.openFiltering}
            >
            Отфильтровать
          </Button>
          </Typography>
          <FeatureSection features={this.state.features} previos_feature={this.state.prev} onCategoryClick={this.handleonCategoryClicked} onCategoryBackClick={this.handleonCategoryBackClicked} />
          <PricingSection cards={this.state.cards}/>
        </Fragment>
      );
  }
}

Home.propTypes = {
  selectHome: PropTypes.func.isRequired
};

export default Home;
