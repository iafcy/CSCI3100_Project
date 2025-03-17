import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Navbar from "@/components/Navbar";
import ThreadList from '@/components/ThreadList';
import { Thread } from '@/types/types';

export async function generateStaticParams() {
  // Fetch available categories to generate paths.

  return [
    {categoryId: '1'},
    {categoryId: '2'},
    {categoryId: '3'},
    {categoryId: '4'},
    {categoryId: '5'},
  ];
}

function placeholderFetch(categoryId: number) {
  const threads: Thread[] = [
    // dummy threads
    {id: 1, username: 'User 1', title: 'Thread Title 1', categoryId: 1},
    {id: 2, username: 'User 2', title: 'Thread Title 2', categoryId: 2},
    {id: 3, username: 'User 3', title: 'Thread Title 3', categoryId: 3},
    {id: 4, username: 'User 4', title: 'Thread Title 4', categoryId: 1},
    {id: 5, username: 'User 5', title: 'Thread Title 5', categoryId: 2},
    {id: 6, username: 'User 6', title: 'Thread Title 6', categoryId: 3},
    {id: 7, username: 'User 7', title: 'Thread Title 7', categoryId: 1},
    {id: 8, username: 'User 8', title: 'Thread Title 8', categoryId: 2},
    {id: 9, username: 'User 9', title: 'Thread Title 9', categoryId: 3},
    {id: 10, username: 'User 10', title: 'Thread Title 10', categoryId: 1},
  ];

  return threads.filter(thread => thread.categoryId == categoryId);
}

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ categoryId: string }>
}>) {
  const categoryId = Number((await params).categoryId);

  // Fetch threads
  const threads = placeholderFetch(categoryId);

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
        color: '#fff'
      }}
    >
      <Navbar title={`Category ${categoryId}`} categoryId={categoryId} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#151515',
          flexGrow: 1,
          height: 'calc(100vh - 56px)',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            maxWidth: { lg: '450px' },
            backgroundColor: 'inherit',
            borderRight: '.5px solid #3b3a39',
            overflowY: 'hidden'
          }}
        >
          <ThreadList threads={threads} categoryId={categoryId} />
        </Box>
        
        <Box
          sx={{
            display: { xs: 'none', lg: 'block' },
            flexGrow: 1,
            backgroundColor: 'inherit',
            width: '100%',
            height: '100%',
            overflowY: 'hidden'
          }}
        >
          {children}
        </Box>
      </Box>
    </Container>
  );
}
