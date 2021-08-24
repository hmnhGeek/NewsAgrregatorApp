import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const SearchBar = props => {
    const [searchValue, setSearchValue] = useState(null);

    return (
        <div className="search-bar">
            <Container>
                <Grid container spacing={1}>
                    <Grid item xs={11}>
                        <TextField
                            id="outlined-basic" 
                            label="Search news" 
                            variant="outlined"
                            value={searchValue} 
                            fullWidth
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button size="large" variant="contained" color="primary" onClick={() => props.searchMethod(searchValue)}>
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default SearchBar;