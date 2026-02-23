import { Box, CircularProgress, Container, Typography } from '@mui/material';
import React from 'react';
import '../../sass/Dashboard.scss';

const DonutChartLoading = (props) => (
  <Container className="dashboard-stats">
    <Box className="dashboard-stat-container">
      <Box className="stat-header">
        <Typography className="stat-header-text"></Typography>
      </Box>
      <Box className="stat-number"></Box>
    </Box>
    <Box className="dashboard-chart-container">
      <CircularProgress />
    </Box>
  </Container>
);

export default DonutChartLoading;
