import React from "react";
import { Button,Grid, Typography, isWidthUp, withWidth } from "@material-ui/core";
import calculateSpacing from "./calculateSpacing";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FeatureCard from "./FeatureCard";
//import axios from 'axios';


class FeatureSection extends React.Component{

  render(){
    console.log(this.props.features)
    return (
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container-fluid lg-p-top">
          <Typography variant="h3" align="center" className="lg-mg-bottom">
            Категории
          </Typography>
          <div className="container-fluid">
            <Grid container spacing={calculateSpacing(this.props.width)}>
              {this.props.features.map(element => (
                <Grid
                  item
                  xs={6}
                  md={4}
                  data-aos="zoom-in-up"
                  data-aos-delay={
                    isWidthUp("md", this.props.width) ? 200: 200
                  }
                  key={element._id}
                >
                  <FeatureCard
                    Icon={<LockOpenIcon className="text-white" />}
                    color={"#6200EA"}
                    headline={element.name}
                    text={element.name}
                    onClick={this.props.onCategoryClick.bind(this,element)}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
          <Grid container spacing={calculateSpacing(this.props.width)}>
            <Grid
                  item
                  xs={6}
                  md={4}
                  data-aos="zoom-in-up"
                  data-aos-delay={
                    isWidthUp("md", this.props.width) ? 200: 200
                  }
                >
              <Button
                  onClick={this.props.onCategoryBackClick.bind(this)}
                  variant="contained"
                  color="secondary"
              >
              Назад
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withWidth()(FeatureSection);
