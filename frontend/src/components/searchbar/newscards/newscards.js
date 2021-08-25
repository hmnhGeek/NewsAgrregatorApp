import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FullNewsModal from '../fullnewsmodal/fullnewsmodal';
import axios from 'axios';

const NewsCard = props => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(false);
    const [news, setNews] = useState(false);
    const [newsImage, setNewsImage] = useState(null);
    
    const handleOpen = () => {
        axios.get(`http://127.0.0.1:8080/fullnews?link=${props.newslink}`).then(response => {
            setTitle(response.data.title);
            setNews(response.data.news);
            setNewsImage(response.data.image);
            setOpen(true);
        }).catch(err => console.log(err));
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <>
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {props.newsSource}
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.headline}
                </Typography>
                <Typography color="textSecondary">
                    {props.date}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleOpen}>Read More</Button>
            </CardActions>
        </Card>
        <FullNewsModal open={open} handleClose={handleClose} title={title} news={news} newsImage={newsImage} />
        </>
    );
}

export default NewsCard;