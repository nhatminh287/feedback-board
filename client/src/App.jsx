import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Box, CircularProgress, Fab } from '@mui/material';
import { motion } from 'framer-motion';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Header from './components/Header';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import EmptyState from './components/EmptyState';
import { ThemeProviderWrapper } from './theme/ThemeContext';
import { SnackbarProvider, useSnackbar } from './components/SnackbarManager';

function AppContent() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef(null);
  const showSnackbar = useSnackbar();

  useEffect(() => {
    fetchFeedback();
  //eslint-disable-next-line
  }, []);

  const fetchFeedback = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/feedback');
      setFeedbackItems(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      showSnackbar('Failed to load feedback', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
    try {
      const response = await axios.post('/api/feedback', newFeedback);
      setFeedbackItems([response.data, ...feedbackItems]);
      showSnackbar('Thank you for your feedback!', 'success');
      return response.data;
    } catch (error) {
      console.error('Error adding feedback:', error);
      showSnackbar('Failed to submit feedback', 'error');
      throw error;
    }
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`/api/feedback/${id}`);
      setFeedbackItems(feedbackItems.filter((item) => item.id !== id));
      showSnackbar('Feedback deleted successfully', 'info');
    } catch (error) {
      console.error("Error deleting feedback:", error);
      showSnackbar('Failed to delete feedback', 'error');
    }
  };

  // Like feedback
  const likeFeedback = async (id) => {
    try {
      const response = await axios.put(`/api/feedback/${id}/like`);
      setFeedbackItems(
        feedbackItems.map(item => 
          item.id === id ? response.data : item
        )
      );
    } catch (error) {
      console.error('Error liking feedback:', error);
      showSnackbar('Failed to like feedback', 'error');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Box ref={formRef} sx={{ mb: 6 }}>
          <FeedbackForm onAdd={addFeedback} />
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : feedbackItems.length === 0 ? (
          <EmptyState onAddClick={scrollToForm} />
        ) : (
          <FeedbackList 
            feedbackItems={feedbackItems}
            onDelete={deleteFeedback}
            onLike={likeFeedback}
          />
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
          }}
        >
          <Fab 
            color="primary" 
            aria-label="scroll to top"
            onClick={scrollToTop}
            sx={{ boxShadow: 3 }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </motion.div>
      </Container>
    </>
  );
}

function App() {
  return (
    <ThemeProviderWrapper>
      <SnackbarProvider>
        <AppContent />
      </SnackbarProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
