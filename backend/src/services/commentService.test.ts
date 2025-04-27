import { describe, it, expect } from '@jest/globals';
import commentService from './commentService';

describe('commentService.filterHiddenContent', () => {
  it('removes elements with hidden-content class', () => {
    const input = '<p>Hello</p><div class="hidden-content">Secret</div>';
    const result = commentService.filterHiddenContent(input);

    expect(result).toBe('<p>Hello</p>');
  });

  it('removes multiple hidden-content elements', () => {
    const input = `<p>Visible 1</p> <div class="hidden-content">Hidden 1</div> <div class="hidden-content">Hidden 2</div> <p>Visible 2</p>`;
    const result = commentService.filterHiddenContent(input);

    expect(result).toContain('<p>Visible 1</p>');
    expect(result).toContain('<p>Visible 2</p>');
    expect(result).not.toContain('Hidden 1');
    expect(result).not.toContain('Hidden 2');
  });

  it('removes nested hidden-content elements', () => {
    const input = `<div> <div class="hidden-content"> <p>Hidden inside</p> </div> <p>Visible</p> </div>`;
    const result = commentService.filterHiddenContent(input);

    expect(result).toContain('<p>Visible</p>');
    expect(result).not.toContain('Hidden inside');
  });

  it('removes hidden-content inside list items', () => {
    const input = `<ul> <li>Item 1</li> <li><div class="hidden-content">Secret Item</div></li> <li>Item 3</li> </ul>
    `;
    const result = commentService.filterHiddenContent(input);

    expect(result).toContain('<li>Item 1</li>');
    expect(result).toContain('<li>Item 3</li>');
    expect(result).not.toContain('Secret Item');
  });

  it('removes hidden-content inside paragraph', () => {
    const input =
      '<p>Text before <span class="hidden-content">hidden</span> text after</p>';
    const result = commentService.filterHiddenContent(input);

    expect(result).toContain('<p>Text before  text after</p>');
  });

  it('cleans complex mixed content', () => {
    const input = `<div class="hidden-content">Top secret</div> <p> </p> <ul> <li>Valid Item</li> <li><div class="hidden-content">Secret Item</div></li> <li> </li> </ul> <p>Valid paragraph</p>`;
    const result = commentService.filterHiddenContent(input);

    expect(result).toContain('<li>Valid Item</li>');
    expect(result).toContain('<p>Valid paragraph</p>');
    expect(result).not.toContain('Top secret');
    expect(result).not.toContain('Secret Item');
    expect(result).not.toContain('<li></li>');
  });

  it('returns empty string if only hidden-content was in input', () => {
    const input = `<div class="hidden-content">Hidden 1</div><div class="hidden-content">Hidden 2</div>`;
    const result = commentService.filterHiddenContent(input);

    expect(result).toBe('');
  });

  it('handles already clean HTML correctly', () => {
    const input = '<p>Good content</p><ul><li>Item</li></ul>';
    const result = commentService.filterHiddenContent(input);

    expect(result).toBe('<p>Good content</p><ul><li>Item</li></ul>');
  });
});
