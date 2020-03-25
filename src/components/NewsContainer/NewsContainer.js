import React from 'react';

//News Card
import NewsCard from '../NewsCard/NewsCard.js';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
// Custom styles
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
    cardGrid: {
        paddingTop: 8,
        paddingBototm: 8
    }
}));

function NewsContainer(props) {

    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline>
                <main>

                    <Container maxWidth="lg" className={classes.cardGrid}>

                        <Grid container spacing={4}>
                            {props.newsResults.map(newsCard => (
                                <Grid item xs={12} sm={6} md={4}>
                                    <NewsCard 
                                        newsCard={ newsCard }
                                        isLoading={ props.isLoading } 
                                        //contentReady={ props.contentReady }
                                    />
                                </Grid>
                            ))}
                        </Grid>

                    </Container>

                </main>
            </CssBaseline>
        </React.Fragment>
    );
}

export default NewsContainer;