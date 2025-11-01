import {
  getPhotoUrlWithFallback,
  getRandomColor,
  html,
  MessageContent,
  PopoverButton,
  ReactionPicker,
} from "@talkjs/react-components/theming";
/** @import { MessageProps } from "@talkjs/react-components/theming"; */

/** @param {MessageProps} props */
export function Message(props) {
  const { message, messageStatus, permissions, common } = props;
  const { currentUser, theme, participants, chatbox, t } = common;
  const { Avatar, Icon, ReferencedMessage, TimeAgo, MessageActionMenu } = theme;

  const isGroupChat = true;
  const sender = message.sender;

  const isMe = sender?.id === currentUser.id;
  const showAuthor = !isMe && isGroupChat;
  const referencedMessage = message.referencedMessage;
  const showActionMenu = false;

  let senderType;
  if (!sender) {
    senderType = "system";
  } else if (sender.id === currentUser.id) {
    senderType = "currentUser";
  } else {
    senderType = "other";
  }

  return html`
    <div
      className="t-theme-message"
      t-sender=${senderType}
      t-message-id=${message.id}
    >
      <div className="t-message-row">
        ${sender &&
        html`<${Avatar}
          photoUrl=${getPhotoUrlWithFallback(sender)}
          common=${common}
        />`}

        <div className="t-message-body">
          <!-- in group chats, show the message sender name in a random color -->
          ${sender &&
          showAuthor &&
          html`<div
            className="t-message-sender-name"
            style=${{ color: getRandomColor(sender.id) }}
          >
            ${sender.name}
          </div>`}
          ${referencedMessage &&
          html`<${ReferencedMessage}
            referencedMessage=${referencedMessage}
            common=${common}
          />`}

          <${MessageContent}
            common=${common}
            message=${message}
            messageStatus=${messageStatus}
          />

          <div className="t-message-status">
            <${TimeAgo} timestamp=${message.createdAt} common=${common} />
            ${senderType == "currentUser" &&
            html`<${StatusTick} ...${props} />`}
          </div>
        </div>

        ${showActionMenu &&
        html`
            <${PopoverButton}
              type="menu"
              popoverComponent=${MessageActionMenu}
              popoverProps=${{ message, permissions, common }}
              className="t-message-action-menu-button"
              aria-label="Message actions"
            >
              <${Icon} className="t-action-menu-icon" type="horizontalDots" />
            </${PopoverButton}>
          `}
        ${false &&
        html`
          <${PopoverButton}
            className="t-add-reaction-button"
            popoverComponent=${ReactionPicker}
            popoverProps=${{
              messageId: message.id,
              colorScheme: "light",
              className: "t-reaction-picker",
            }}
            aria-label="Add reaction"
          >
            <${Icon} type="addEmoji" />
          </${PopoverButton}>
        `}
      </div>

      ${message.reactions.length > 0 &&
      html`
        <div className="t-emoji-reactions">
          ${message.reactions.map((reaction) => {
            const actionLabel = reaction.currentUserReacted
              ? "remove your reaction"
              : "add reaction";
            const peoplePlural = reaction.count === 1 ? "person" : "people";

            return html`
              <button
                className="t-reaction-button"
                t-active=${(reaction.currentUserReacted && "true") || undefined}
                onClick=${() => chatbox.toggleReaction(message.id, reaction)}
                disabled=${!permissions.canAddReaction}
                aria-label="${reaction.count} ${peoplePlural} reacted with ${reaction.emoji}. Press to ${actionLabel}"
                aria-pressed=${reaction.currentUserReacted}
                key=${reaction.emoji}
              >
                <span className="t-emoji">${reaction.emoji}</span>
                <span className="t-num-reactions">${reaction.count}</span>
              </button>
            `;
          })}
        </div>
      `}
    </div>
  `;
}

/** @param {MessageProps} props */
function StatusTick({ messageStatus, common }) {
  const { Icon } = common.theme;

  if (messageStatus === "sending") {
    return html`
      <span className="t-status-icon">
        <${Icon}
          type="spinner"
          className="t-message-loading-spinner"
          common=${common}
        />
      </span>
    `;
  }

  if (messageStatus === "sent") {
    return html`<span className="t-status-icon">✓</span>`;
  }

  if (messageStatus === "everyoneRead") {
    return html`<span className="t-status-icon">✓✓</span>`;
  }

  return null;
}
