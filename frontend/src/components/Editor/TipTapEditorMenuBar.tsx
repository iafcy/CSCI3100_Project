import { Editor } from '@tiptap/react'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import TitleIcon from '@mui/icons-material/Title';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import { useTheme } from '@mui/material';

export default function TipTapEditorMenuBar ({
  editor
} : {
  editor: Editor
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mb: 1,
        display: 'flex',
        width: '100%',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          width: '4px',
          height: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.divider,
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <IconButton
        size='small'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        sx={{
          bgcolor: editor.isActive('heading', { level: 2 }) ? theme.palette.divider : ''
        }}
      >
        <TitleIcon />
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      <IconButton
        size='small'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        sx={{
          bgcolor: editor.isActive('bold') ? theme.palette.divider : ''
        }}
      >
        <FormatBoldIcon />
      </IconButton>
      <IconButton
        size='small'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        sx={{
          bgcolor: editor.isActive('italic') ? theme.palette.divider : ''
        }}
      >
        <FormatItalicIcon />
      </IconButton>
      <IconButton
        size='small'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        sx={{
          bgcolor: editor.isActive('underline') ? theme.palette.divider : ''
        }}
      >
        <FormatUnderlinedIcon />
      </IconButton>
      <IconButton
        size='small'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        sx={{
          bgcolor: editor.isActive('strike') ? theme.palette.divider : ''
        }}
      >
        <FormatStrikethroughIcon />
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      <IconButton
        size='small'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        sx={{
          bgcolor: editor.isActive('bulletList') ? theme.palette.divider : ''
        }}
      >
        <FormatListBulletedIcon />
      </IconButton>
      <IconButton
        size='small'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        sx={{
          bgcolor: editor.isActive('orderedList') ? theme.palette.divider : ''
        }}
      >
        <FormatListNumberedIcon />
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      <IconButton
        size='small'
        onClick={() => editor.chain().focus().toggleHidden().run()}
        sx={{
          bgcolor: editor.isActive('hidden') ? theme.palette.divider : ''
        }}
      >
        <LockOutlineIcon />
      </IconButton>
    </Box>
  )
}