export const BLOCK_TYPE = {
  // This is used to represent a normal text block (paragraph).
  UNSTYLED: 'unstyled',
  HEADER_ONE: 'header-one',
  HEADER_TWO: 'header-two',
  HEADER_THREE: 'header-three',
  HEADER_FOUR: 'header-four',
  HEADER_FIVE: 'header-five',
  HEADER_SIX: 'header-six',
  UNORDERED_LIST_ITEM: 'unordered-list-item',
  ORDERED_LIST_ITEM: 'ordered-list-item',
  BLOCKQUOTE: 'blockquote',
  PULLQUOTE: 'pullquote',
  CODE: 'code-block',
  ATOMIC: 'atomic',
};

export const ENTITY_TYPE = {
  LINK: 'LINK',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO'
};

export const INLINE_STYLE = {
  BOLD: 'BOLD',
  CODE: 'CODE',
  SPAN: 'SPAN',
  ITALIC: 'ITALIC',
  STRIKETHROUGH: 'STRIKETHROUGH',
  UNDERLINE: 'UNDERLINE',
};

export default {
  BLOCK_TYPE,
  ENTITY_TYPE,
  INLINE_STYLE,
};
