import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Card,
  CardActions,
  TextField,
  CircularProgress,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

function SidebarChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, user: true }];
      setMessages(newMessages);
      setInput('');

      try {
        setLoading(true);
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAyXlJz_rNoQeXTz9xygbc_jHLB8f6qutw',
          {
            contents: [
              {
                parts: [
                  {
                    text: input,
                  },
                ],
              },
            ],
          }
        );
        const botResponse = response.data.candidates[0].content.parts[0].text;
        setMessages([...newMessages, { text: botResponse, user: false }]);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setMessages([
          ...newMessages,
          { text: 'Error: Could not fetch response.', user: false },
        ]);
        setLoading(false);
      }
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <IconButton
        onClick={toggleChat}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: '#797c69',
          color: '#fff',
          zIndex: 1000,
          '&:hover': {
            backgroundColor: '#c9c7b8',
          },
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </IconButton>

      {/* Chat Widget */}
      {isOpen && (
        <Card
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 20,
            width: 350,
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 3,
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              backgroundColor: '#797c69',
              color: '#fff',
              p: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">AI ChatBot</Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: 'auto',
              backgroundColor: '#f9f9f9',
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: msg.user ? 'flex-end' : 'flex-start',
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    maxWidth: '80%',
                    backgroundColor: msg.user ? 'primary.light' : 'grey.200',
                    color: msg.user ? 'white' : 'black',
                  }}
                >
                  {msg.text}
                </Box>
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress size={20} />
              </Box>
            )}
          </Box>

          <CardActions sx={{ p: 2, borderTop: '1px solid #ddd' }}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              sx={{ mr: 1 }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#797c69',
                color: '-moz-initial',
                '&:hover': {
                  backgroundColor: '#c9c7b8',
                },
              }}
              endIcon={<SendIcon />}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
}

export default SidebarChatbot;
