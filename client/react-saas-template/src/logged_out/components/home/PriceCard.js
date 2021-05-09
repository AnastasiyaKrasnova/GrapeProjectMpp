import React from "react";
import PropTypes from "prop-types";
import { Button, Typography, Box, withStyles } from "@material-ui/core";

const styles = theme => ({
  card: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(2),
    border: `3px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius * 2
  },
  cardHightlighted: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    border: `3px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2)
    }
  },
  title: {
    color: theme.palette.primary.main
  }
});

function PriceCard(props) {
  const { classes,title,imageurl,catalognum,duration,extension, pricing,highlighted, download, buy } = props;
  return (
    <div className={highlighted ? classes.cardHightlighted : classes.card}>
       <Box mb={2}>
       <Typography
          variant={highlighted ? "h3" : "h4"}
          className={highlighted ? "text-white" : classes.title}
        >
          {title}
        </Typography>
        <img 
        src={imageurl}
        width="200" height="100"
        alt="new"
        />
         <Typography
          variant={highlighted ? "h5" : "h6"}
          className={highlighted ? "text-white" : null}
        >
          {"Catalog num: "+catalognum}
        </Typography>
        <Typography
          variant={highlighted ? "h5" : "h6"}
          className={highlighted ? "text-white" : null}
        >
          {"Price: "+pricing}
        </Typography>
        <Typography
          variant={highlighted ? "h5" : "h6"}
          className={highlighted ? "text-white" : null}
        >
          {"File size: "+duration} MB
        </Typography>
        <Typography
          variant={highlighted ? "h5" : "h6"}
          className={highlighted ? "text-white" : null}
        >
          {"Extention: "+extension} MB
        </Typography>
        <Button
              onClick={download}
              variant="contained"
              color="secondary"
            >
             Download Demo
        </Button>
        <Button
              onClick={buy}
              variant="contained"
              color="secondary"
            >
              Buy Full
        </Button>
      </Box>
    </div>
  );
}

PriceCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  pricing: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  highlighted: PropTypes.bool
};

export default withStyles(styles, { withTheme: true })(PriceCard);
