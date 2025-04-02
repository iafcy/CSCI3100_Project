import { Editor } from '@tiptap/react'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
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
    <ButtonGroup variant="text" aria-label="text formatting" sx={{ mb: 1 }}>
      <IconButton
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
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        sx={{
          bgcolor: editor.isActive('bold') ? theme.palette.divider : ''
        }}
      >
        <FormatBoldIcon />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        sx={{
          bgcolor: editor.isActive('italic') ? theme.palette.divider : ''
        }}
      >
        <FormatItalicIcon />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        sx={{
          bgcolor: editor.isActive('underline') ? theme.palette.divider : ''
        }}
      >
        <FormatUnderlinedIcon />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        sx={{
          bgcolor: editor.isActive('strike') ? theme.palette.divider : ''
        }}
      >
        <FormatStrikethroughIcon />
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      <IconButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        sx={{
          bgcolor: editor.isActive('bulletList') ? theme.palette.divider : ''
        }}
      >
        <FormatListBulletedIcon />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        sx={{
          bgcolor: editor.isActive('orderedList') ? theme.palette.divider : ''
        }}
      >
        <FormatListNumberedIcon />
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      <IconButton
        onClick={() => editor.chain().focus().toggleHidden().run()}
        sx={{
          bgcolor: editor.isActive('hidden') ? theme.palette.divider : ''
        }}
      >
        <LockOutlineIcon />
      </IconButton>
    </ButtonGroup>
  )
}