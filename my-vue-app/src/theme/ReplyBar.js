import { html } from "@talkjs/react-components/theming";
/** @import { ReplyBarProps } from "@talkjs/react-components/theming"; */

/** @param {ReplyBarProps} props */
export function ReplyBar(props) {
  const { common, referencedMessage } = props;
  const { chatbox, t, theme } = common;
  const { Icon, CompactMessageContent } = theme;

  return html`
    <div className="t-theme-reply-bar">
      <${Icon} className="t-reply-icon" type="reply" common=${common} />

      <div className="t-body">
        <div className="t-sender-name">${referencedMessage.sender.name}</div>
        <div className="t-content">
          <${CompactMessageContent}
            message=${referencedMessage}
            common=${common}
          />
        </div>
      </div>

      <button
        className="t-close-button"
        title=${t.REPLY_MODE_LEAVE_ARIA_LABEL}
        aria-label=${t.REPLY_MODE_LEAVE_ARIA_LABEL}
        onClick=${() => chatbox.setReferencedMessage(null)}
      >
        <${Icon} className="t-close-icon" type="close" common=${common} />
      </button>
    </div>
  `;
}
