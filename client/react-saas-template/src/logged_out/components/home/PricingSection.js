import React from "react";
import classNames from "classnames";
import {
  Grid,
  Typography,
  isWidthUp,
  withWidth,
  withStyles
} from "@material-ui/core";
import PriceCard from "./PriceCard";
import calculateSpacing from "./calculateSpacing";

const styles = theme => ({
  containerFix: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6)
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    overflow: "hidden",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  cardWrapper: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 340
    }
  },
  cardWrapperHighlighted: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 360
    }
  }
});

class PricingSection extends React.Component{

  constructor(props){
    super(props)

    this.handleonBuyClicked=this.handleonBuyClicked.bind(this);
    this.handleonDemoDownloadClicked=this.handleonDemoDownloadClicked.bind(this);
  }

  async handleonBuyClicked(key){
    console.log(key)
  }

  async handleonDemoDownloadClicked(url){
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

 render(){
  return (
    <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
      <Typography variant="h3" align="center" className="lg-mg-bottom">
        Файлы
      </Typography>
      <div className={classNames("container-fluid", this.props.classes.containerFix)}>
        <Grid
          container
          spacing={calculateSpacing(this.props.width)}
          className={this.props.classes.gridContainer}
        >
          {this.props.cards.map(element => (
          <Grid
            item
            className={this.props.classes.cardWrapper}
            xs={12}
            sm={6}
            lg={3}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp("md", this.props.width) ? "300" : "100"}
            key={element._id}
          >
            <PriceCard
              title={element.name}
              pricing={element.price+" "+element.currency_code}
              imageurl={element.image_url}
              catalognum={element.catalog_num}
              duration={element.duration}
              extension={element.extention}
              buy={this.handleonBuyClicked.bind(this,element._id)}
              download={this.handleonDemoDownloadClicked.bind(this,element.demo_url)}
            />
          </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
 }
  
}

export default withStyles(styles, { withTheme: true })(
  withWidth()(PricingSection)
);
