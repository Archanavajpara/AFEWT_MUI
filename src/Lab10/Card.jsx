import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345,padding:'10px', marginTop:'20px',border:'2px solid black',borderRadius:'10px', ":hover": { boxShadow:10} }}>
      <CardMedia
        sx={{ height: 240 }}
        image="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2dldHR5aW1hZ2VzLTEwOTAxNjgwNTguanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9fX0="
        title="Blue butterfly"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{color:'blue'}}>
          Butterfly
        </Typography>
        <Typography variant="body2" sx={{ color: 'black' }}>
            Butterflies are winged insects from the lepidopteran superfamily Papilionoidea,
            characterised by large, often brightly coloured wings that often fold together
            when at rest, and a conspicuous, fluttering flight.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
