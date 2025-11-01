import { html, userFriendlyDate } from "@talkjs/react-components/theming";
/** @import { MessageDividerProps } from "@talkjs/react-components/theming"; */

/** @param {MessageDividerProps} */
export function MessageDivider(props) {
  const { timestamp, isReadMarker, isDayMarker, common } = props;
  const { t } = common;

  return html`
    <div className="t-message-divider">
      <div className="t-line" t-side="left">
        <div className="t-line-segment" />
      </div>
      ${isDayMarker &&
      html`
        <span className="t-day-marker">${userFriendlyDate(timestamp, t)}</span>
      `}
      <div className="t-line" t-side="right">
        <div className="t-line-segment" />
        ${isReadMarker &&
        html`
          <span className="t-unread-marker">${t.MESSAGELIST_NEW_MARKER}</span>
        `}
      </div>
    </div>
  `;
}
