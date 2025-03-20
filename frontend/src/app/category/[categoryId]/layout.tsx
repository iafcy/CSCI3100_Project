import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Navbar from "@/components/Navbar";
import ThreadList from '@/components/ThreadList';

export async function generateStaticParams() {
  // Fetch available categories to generate paths
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/category/list`);
  const data = await response.json();
  return data.data.category.map((c: any) => ({ categoryId: `${c.id}` }));
}

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ threadId: string, categoryId: string }>
}>) {
  const { categoryId, threadId } = await params;

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
      }}
    >
      <Navbar title={`Category ${categoryId}`} categoryId={Number(categoryId)} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          height: 'calc(100vh - 56px)',
        }}
      >
        <ThreadList categoryId={Number(categoryId)} />
        <Box
          sx={{
            display: { xs: 'none', lg: 'block' },
            flexGrow: 1,
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
