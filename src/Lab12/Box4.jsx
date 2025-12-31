import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

export default function Box4() {
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#007FFF',
            dark: '#0066CC',
          },
        },
      }}
      
    >
     <Box sx={{display:'flex', flexDirection:'row', marginTop:'20px'}}>
       <Box
        sx={{
          display:'flex',
          direction:'row',
          width: 200,
          height: 200,
          borderRadius: 1,
          bgcolor: 'pink',
          marginLeft:0,
        }}
      >Box1</Box>
        <Box
        sx={{
          width: 200,
          height: 200,
          borderRadius: 1,
          bgcolor: 'violet',
          marginLeft:'1100px',
          marginTop:0
        }}
      >Box2</Box>
      </Box>
      <Box sx={{display:'flex', flexDirection:'row', marginTop:'320px'}}>
        <Box
        sx={{
          display:'flex',
          direction:'row',
          width: 200,
          height: 200,
          borderRadius: 1,
          bgcolor: 'yellow',
          marginLeft:0
        }}
      >Box3</Box>
        <Box
        sx={{
          width: 200,
          height: 200,
          borderRadius: 1,
          bgcolor: 'cyan',
          marginLeft:'1100px',
          marginTop:0 
        }}
      >Box4</Box>
      </Box>
    </ThemeProvider>
  );
}
