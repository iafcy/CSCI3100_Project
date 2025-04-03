import './styles.css'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import HiddenMark from './HiddenMark'
import { EditorContent, useEditor } from '@tiptap/react';
import { Box, useTheme } from '@mui/material';
import TipTapEditorMenuBar from './TipTapEditorMenuBar'

export default ({
  content, onContentUpdate
} : {
  content: string;
  onContentUpdate: (s: string) => void;
}) => {
  const theme = useTheme();

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading,
      BulletList,
      OrderedList,
      ListItem,
      HiddenMark
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onContentUpdate(editor.getHTML());
      console.log(editor.getHTML())
    },
  })

  if (!editor) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        overflowX: 'hidden'
      }}
    >
      <TipTapEditorMenuBar editor={editor} />

      <EditorContent
        editor={editor}
        style={{
          backgroundColor: theme.palette.background.default,
          flex: 1,
          overflow: 'hidden',
        }}
      />
    </Box>
  )
}