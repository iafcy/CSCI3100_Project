import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentEditorDialog from './CommentEditorDialog';

function renderDialog(open = true, onClose = () => {}) {
  return render(
    <CommentEditorDialog
      open={open}
      onClose={onClose}
      treadTitle="Test Thread"
      threadId={1}
    />,
  );
}

describe('CommentEditorDialog', () => {
  it('renders the dialog with thread title', () => {
    renderDialog();
    expect(screen.getByText(/Comment on "Test Thread"/)).toBeInTheDocument();
  });

  it('disables create button if title or content is empty', async () => {
    renderDialog();

    const createButton = screen.getByRole('button', { name: /create/i });
    expect(createButton).toBeDisabled();
  });

  it('closes immediately if no unsaved changes', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    renderDialog(true, onClose);

    const closeButton = screen.getByLabelText(/close/i);
    await user.click(closeButton);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
