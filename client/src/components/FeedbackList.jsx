import { Box, Typography, Divider, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CommentIcon from '@mui/icons-material/Comment';
import FeedbackItem from './FeedbackItem';

function FeedbackList({ feedbackItems, onDelete, onLike }) {
  const theme = useTheme();

  if (!feedbackItems || feedbackItems.length === 0) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 8,
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
          borderRadius: 3,
        }}
      >
        <CommentIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No feedback yet. Be the first to share your thoughts!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ fontWeight: 600 }}
        >
          Recent Feedback
        </Typography>
        <Box 
          sx={{ 
            ml: 2, 
            display: 'inline-flex', 
            bgcolor: 'primary.main', 
            color: 'white',
            borderRadius: '50%', 
            width: 26, 
            height: 26, 
            justifyContent: 'center', 
            alignItems: 'center', 
            fontSize: 14,
            fontWeight: 'bold'
          }}
        >
          {feedbackItems.length}
        </Box>
      </Box>
      
      <Divider sx={{ mb: 3 }} />

      <motion.div layout>
        <AnimatePresence>
          {feedbackItems.map((item) => (
            <FeedbackItem 
              key={item.id} 
              item={item} 
              onDelete={onDelete}
              onLike={onLike}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </Box>
  );
}

export default FeedbackList;
