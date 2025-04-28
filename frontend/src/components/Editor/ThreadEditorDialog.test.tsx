import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadEditorDialog from './ThreadEditorDialog';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../hooks/useThreads', () => ({
  default: () => ({ threads: [], setThreads: vi.fn() }),
}));
vi.mock('../../hooks/useNav', () => ({
  default: () => ({ activeCategory: { id: 'mock-category-id' } }),
}));

vi.mock('../../utils/axios');

function renderDialog(open = true, onClose = vi.fn()) {
  return render(
    <BrowserRouter>
      <ThreadEditorDialog open={open} onClose={onClose} />
    </BrowserRouter>,
  );
}

describe('EditorDialog', () => {
  it('renders the dialog content when open', () => {
    renderDialog();

    expect(screen.getByText(/create thread/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  it('disables create button if title or content is empty', async () => {
    renderDialog();

    const createButton = screen.getByRole('button', { name: /create/i });
    expect(createButton).toBeDisabled();
  });

  it('allows user to type title', async () => {
    const user = userEvent.setup();
    renderDialog();

    const titleInput = screen.getByLabelText(/title/i);
    await user.type(titleInput, 'Test Thread Title');

    const editor = screen
      .getAllByRole('textbox')
      .find((e) => e.classList.contains('ProseMirror'));

    expect(editor).toBeInTheDocument();
    expect(titleInput).toHaveValue('Test Thread Title');
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
