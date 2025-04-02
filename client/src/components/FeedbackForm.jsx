import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Box,
  LinearProgress,
  Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';

function FeedbackForm({ onAdd }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const MAX_LENGTH = 300;
  const messageProgress = (message.length / MAX_LENGTH) * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors and states
    setNameError('');
    setMessageError('');
    setSubmitSuccess(false);
    
    // Validation
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    }
    
    if (!message.trim()) {
      setMessageError('Message is required');
      isValid = false;
    } else if (message.length > MAX_LENGTH) {
      setMessageError(`Message must be less than ${MAX_LENGTH} characters`);
      isValid = false;
    }
    
    if (isValid) {
      setIsSubmitting(true);
      
      try {
        await onAdd({ name, message });
        setSubmitSuccess(true);
        
        // Reset form
        setName('');
        setMessage('');
      } catch (error) {
        console.error('Error adding feedback:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ mb: 4, overflow: 'visible' }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            Share Your Thoughts
          </Typography>
          
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Alert 
                severity="success" 
                sx={{ mb: 2 }}
                onClose={() => setSubmitSuccess(false)}
              >
                Thank you for your feedback!
              </Alert>
            </motion.div>
          )}
          
          <Box 
            component="form" 
            noValidate 
            onSubmit={handleSubmit}
            autoComplete="off"
            sx={{ '& .MuiTextField-root': { my: 1.5 } }}
          >
            <TextField
              id="name"
              label="Your Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!nameError}
              helperText={nameError}
              disabled={isSubmitting}
              placeholder="John Doe"
              InputProps={{
                sx: {
                  borderRadius: 2,
                }
              }}
            />
            
            <TextField
              id="message"
              label="Your Message"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              error={!!messageError}
              helperText={messageError || `${message.length}/${MAX_LENGTH} characters`}
              disabled={isSubmitting}
              placeholder="Share your feedback, suggestions, or thoughts..."
              InputProps={{
                sx: {
                  borderRadius: 2,
                }
              }}
            />
            
            <Box sx={{ my: 1 }}>
              <LinearProgress
                variant="determinate"
                value={messageProgress}
                sx={{
                  height: 4,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: messageProgress > 90 ? 'error.main' : 'primary.main',
                  }
                }}
              />
            </Box>
            
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                endIcon={<SendIcon />}
                sx={{ 
                  borderRadius: 2, 
                  px: 3,
                  boxShadow: 2
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Feedback'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default FeedbackForm;
