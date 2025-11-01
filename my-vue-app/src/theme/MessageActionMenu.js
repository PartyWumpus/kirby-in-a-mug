import { html, MenuItem } from "@talkjs/react-components/theming";
/** @import { MessageActionMenuProps } from "@talkjs/react-components/theming"; */

/** @param {MessageActionMenuProps} props */
export function MessageActionMenu(props) {
  const { message, permissions, common } = props;
  const { chatbox, t } = common;

  const doReply = () => chatbox.setReferencedMessage(message.id);
  const doEdit = () => chatbox.setEditing(message.id);
  const doDelete = () => chatbox.deleteMessage(message.id);

  return html` <div className="t-theme-message-action-menu">
    ${permissions.canReplyToMessage &&
    html`
        <${MenuItem} className="t-menu-item" onSelect=${doReply}>
          ${t.REPLY_TO_MESSAGE}
        </${MenuItem}>
      `}
    ${permissions.canEditMessage &&
    html`
        <${MenuItem} className="t-menu-item" onSelect=${doEdit}>
          ${t.EDIT_MESSAGE}
        </${MenuItem}>
      `}
    ${permissions.canDeleteMessage &&
    html`
        <${MenuItem} className="t-menu-item t-danger" onSelect=${doDelete}>
          ${t.DELETE_MESSAGE}
        </${MenuItem}>
      `}
  </div>`;
}
