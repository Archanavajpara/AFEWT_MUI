import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ maxWidth: 600 ,backgroundColor:'cyan', marginTop:'20px',marginLeft:'600px',border:'2px solid black',borderRadius:'10px'}}>
      <CardContent>
        
        <Typography  variant="h5" component="div" sx={{ mb: 1.5,justifyContent:'center', display:'flex' }}>
          <img src="https://miro.medium.com/1*fEyeESs-HxVR7Zlr-fdlvw.png"
          alt="Mui" style={{height:'200px', width:'500px', borderRadius:'5px'}}/>
          
        </Typography>
        <Typography variant="h5" component="div">
          Hello from MUI!
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
        <Typography variant="body2">
          We are using Material-UI components
          <br />
          {'"keep smileing and coding :)"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
