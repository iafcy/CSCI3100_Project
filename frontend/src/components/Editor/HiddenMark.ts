import { Mark, mergeAttributes, RawCommands, Command } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    hiddenMark: {
      toggleHidden: () => ReturnType
    }
  }
}

const HiddenMark = Mark.create({
  name: 'hidden',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      class: {
        default: 'hidden-content',
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          return { class: attributes.class };
        },
      },
    };
  },

  parseHTML() {
    return [
      { tag: 'span.hidden-content' },
      { tag: 'div.hidden-content' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands(): Partial<RawCommands> {
    return {
      toggleHidden:
        (): Command =>
        ({ chain }) =>
          chain().toggleMark(this.name).run(),
    };
  }
});

export default HiddenMark;
