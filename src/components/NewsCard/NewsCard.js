import React from 'react';

// Material UI Components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//Animation
import Grow from '@material-ui/core/Grow';

// Make Custom Styles
import { makeStyles } from '@material-ui/core/styles';

// Icons
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';

// pre-load Skeleton
import Skeleton from '@material-ui/lab/Skeleton';



const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        padding: '30% 0%',
    },
    cardContent: {
        flexGrow: 1,
    },
    newsTitle: {
        padding: theme.spacing(3, 0),
        textAlign: 'center'
    },
    timeStamp: {
        fontSize: '1em'
    },
    timeIcon:{
        position: 'relative',
        top: '.2em',
        marginRight: '2%',
        fontSize: '1.2em',
    },
    source: {
        fontSize: '1.1em',
        padding: theme.spacing(2, 0),
    },
    faceIcon: {
        position: 'relative',
        top: '.1em',
        fontSize: '1.1em',
        marginRight: '2%',
    },
    viewMoreButton: {
        margin: "0 auto"
    }
}));

function NewsCard(props) {

    const classes = useStyles();

    if (props.isLoading) {

        return (
            <div>
                <Skeleton animation="wave" variant="rect" height={260} width={340} />
                <Skeleton animation="wave" variant="text" height={40} width={340} />
                <Skeleton animation="wave" variant="text" height={30} width={340} />
                <Skeleton animation="wave" variant="text" height={20} width={340} />
            </div>
        );
    } else {
        
        return (
            <Grow in={true}>

                <Card className={classes.card} variant="outlined">
                
                    <CardMedia
                        alt={props.newsCard.title}
                        image={props.newsCard.urlToImage}
                        title={props.newsCard.title}
                        className={classes.cardMedia}
                    />
        
                    <CardContent className={classes.cardContent}>
        
                        <Typography variant="h5" className={classes.newsTitle}>
                            {props.newsCard.title}
                        </Typography>
        
                        <Typography className={classes.timeStamp}>
                            <TodayOutlinedIcon color='secondary' className={classes.timeIcon} />
                            {props.newsCard.publishedAt.split(/[A-Z]/)[0]}
                        </Typography>
        
                        <Typography className={classes.source}>
                            <FaceRoundedIcon color='secondary' className={classes.faceIcon}/>
                            {props.newsCard.source.name}
                        </Typography>
        
                    </CardContent>
        
                    <CardActions>
                        <Button size="large" color="primary" className={classes.viewMoreButton} target="_blank" href={props.newsCard.url}>Read More</Button>
                    </CardActions>
                </Card>

            </Grow>
        );
    }
}

export default NewsCard;