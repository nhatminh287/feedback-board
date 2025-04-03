import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Box,
  Avatar,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function FeedbackItem({ item, onDelete, onLike }) {

  const [liked, setLiked] = useState(false);
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLike = () => {
    setLiked(!liked);
    onLike(item.id);
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Generate a color based on name (for avatar background)
  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      layout
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <Card sx={{ mb: 2, position: 'relative', overflow: 'visible' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              sx={{ 
                bgcolor: stringToColor(item.name), 
                width: 42, 
                height: 42,
                mr: 2,
              }}
            >
              {getInitials(item.name)}
            </Avatar>
            <Box>
              <Typography 
                variant="h6" 
                component="h3" 
                gutterBottom
                sx={{ mb: 0, lineHeight: 1.2 }}
              >
                {item.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatDate(item.timestamp)}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 2, 
              px: 0.5,
              whiteSpace: 'pre-wrap'
            }}
          >
            {item.message}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                onClick={handleLike}
                color="error"
                size="small"
                aria-label="like"
              >
                {item.likes > 0 ? (
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <FavoriteIcon />
                  </motion.div>
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Typography 
                variant="body2"
                color="text.secondary"
                sx={{ mr: 1 }}
              >
                {item.likes}
              </Typography>
            </Box>
            
            <Tooltip title="Delete feedback">
              <IconButton 
                onClick={() => onDelete(item.id)}
                color="default" 
                aria-label="delete"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default FeedbackItem;
