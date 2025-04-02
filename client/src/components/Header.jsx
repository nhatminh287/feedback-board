import { useContext } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  IconButton, 
  useTheme 
} from '@mui/material';
import { motion } from 'framer-motion';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FeedbackIcon from '@mui/icons-material/Feedback';
// Make sure this import path is correct
import { ColorModeContext } from '../theme/ThemeContext';

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(45deg, #5e35b1 30%, #3949ab 90%)' 
            : 'linear-gradient(45deg, #7e57c2 30%, #5e35b1 90%)'
        }}
      >
        <Toolbar>
          <motion.div
            initial={{ rotate: -30 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FeedbackIcon sx={{ mr: 2, fontSize: 30 }} />
          </motion.div>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}
          >
            Feedback Board
          </Typography>
          <IconButton 
            onClick={colorMode.toggleColorMode} 
            color="inherit"
            aria-label="toggle dark mode"
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
