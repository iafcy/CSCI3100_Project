import './styles.css'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react';
import { useTheme } from '@mui/material';

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
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onContentUpdate(editor.getHTML());
    },
  })

  return (
    <EditorContent
      editor={editor}
      style={{
        backgroundColor: theme.palette.background.default
      }}
    />
  )
}