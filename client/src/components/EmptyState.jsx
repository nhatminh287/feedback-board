import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import AddCommentIcon from '@mui/icons-material/AddComment';

const EmptyState = ({ onAddClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 8,
          px: 2,
        }}
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            transition: { 
              repeat: Infinity, 
              duration: 2,
              repeatType: 'reverse'
            }
          }}
        >
          <AddCommentIcon 
            sx={{ 
              fontSize: 100, 
              color: 'primary.light', 
              opacity: 0.7, 
              mb: 3
            }} 
          />
        </motion.div>
        
        <Typography variant="h5" gutterBottom fontWeight={600}>
          No feedback yet
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
          Be the first to share your thoughts! Your feedback helps us improve.
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={onAddClick}
          startIcon={<AddCommentIcon />}
        >
          Add Feedback
        </Button>
      </Box>
    </motion.div>
  );
};

export default EmptyState;
