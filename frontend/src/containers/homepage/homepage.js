import React, {useState} from 'react';
import SearchBar from '../../components/searchbar/searchbar';
import NewsCard from '../../components/searchbar/newscards/newscards';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const Homepage = props => {
    const [searchResults, setSearchResults] = useState(null);

    const searchNews = (keyword) => {
        axios.get(`http://127.0.0.1:8080/getheadlinesfor?keyword=${keyword}&page=1`).then(response => {
            setSearchResults(response.data);
        }).catch(err => console.log(err));
    }

    const renderGrid = data => {
        if (data !== null) {
            const columns = 4;
            const rows = Math.ceil(data.length / columns);
            let grids = [];

            for(var i=0; i<rows; i++) {
                for(var j=0; j<columns; j++) {
                    try {
                        let d = data[columns*i + j];
                        grids.push(
                            <Grid item xs={12/columns}>
                                <NewsCard 
                                    newsSource={d.news_source}
                                    headline={d.headline}
                                    date={d.date}
                                    description={d.description}
                                    newslink={d.link}
                                />
                            </Grid>
                        );
                    }
                    catch {
                        break
                    }
                }
            }

            return <Container><Grid container spacing={rows}>{grids}</Grid></Container>;
        }
    }

    return (
        <div style={{textAlign: "center", marginTop: "5%"}}>
            <SearchBar searchMethod={searchNews} />
            <br />
            {renderGrid(searchResults)}
        </div>
    );
}

export default Homepage;