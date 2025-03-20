import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>
}) {
  const categoryId = (await params).categoryId;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography variant='h4' component='h1' color='textPrimary'>CUHKG - Category {categoryId}</Typography>
    </Box>
  );
}