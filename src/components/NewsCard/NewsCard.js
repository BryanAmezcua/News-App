import React, { useState } from 'react';

// Material UI Components
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

//Animation
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';

// Make Custom Styles
import { makeStyles } from '@material-ui/core/styles';

// Icons
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShareIcon from '@material-ui/icons/Share';

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
        flexGrow: 1
    },
    newsTitle: {
        padding: theme.spacing(2,0),
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
        marginLeft: 'auto'
    },
    shareIcon: {
        "&:hover, &.Mui-focusVisible": {color: 'red'}
    },
    collapse: {
        marginLeft: 'auto',
        "&:hover, &.Mui-focusVisible": {color: 'blue'},
        "&:selected, &.Mui-selected": {transform: 'rotate(180deg)'}
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

function NewsCard(props) {
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();

    const handleShare = (event) => {
        event.target.style.color = '#ff006e';
    };

    const expand = (id) => {
        setExpanded(!expanded);
        console.log(props.index);
    }

    if (props.isLoading) {

        return (
            <Grow in={true} timeout={650}>
                <div>
                    <Skeleton animation="wave" variant="rect" height={260} width={340} />
                    <Skeleton animation="wave" variant="text" height={40} width={340} />
                    <Skeleton animation="wave" variant="text" height={30} width={340} />
                    <Skeleton animation="wave" variant="text" height={20} width={340} />
                </div>
            </Grow>
        );
    } else {
        
        return (
            <Grow in={true} timeout={650}>

                <Card className={classes.card} raised={true}>

                    <CardMedia
                        alt={props.newsCard.title}
                        image={props.newsCard.urlToImage}
                        title={props.newsCard.title}
                        className={classes.cardMedia}
                    />
        
                    <CardContent className={classes.cardContent}>
        
                        <Zoom in={true} timeout={500}>
                            <Typography variant="h6" className={classes.newsTitle}>
                                {props.newsCard.title}
                            </Typography>
                        </Zoom>

                        <Zoom in={true} timeout={700}>
                            <Typography className={classes.timeStamp}>
                                <TodayOutlinedIcon color='secondary' className={classes.timeIcon} />
                                {props.newsCard.publishedAt.split(/[A-Z]/)[0]}
                            </Typography>
                        </Zoom>
                        
                        <Zoom in={true} timeout={850}>
                            <Typography className={classes.source}>
                                <FaceRoundedIcon color='secondary' className={classes.faceIcon}/>
                                {props.newsCard.source.name}
                            </Typography>
                        </Zoom>
        
                    </CardContent>

                    <Divider variant="middle" />

                    <CardActions disableSpacing>
                        <IconButton className={classes.ShareIcon} onClick={ handleShare }>
                            <ShareIcon/>
                        </IconButton>
                        <IconButton onClick={ expand } className={clsx(classes.collapse, {[classes.expandOpen]: expanded})}>
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                                {props.newsCard.description}
                                <Button size="small" color="primary" className={classes.viewMoreButton} target="_blank" href={props.newsCard.url}>
                                    Read More
                                </Button>
                            </Typography>
                        </CardContent>
                    </Collapse>

                </Card>

            </Grow>
        );
    }
}

export default NewsCard;