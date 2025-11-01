import { html } from "@talkjs/react-components/theming";
/** @import { ChatHeaderProps } from "@talkjs/react-components/theming" */

/** @param {ChatHeaderProps} props */
export function ChatHeader(props) {
  const { conversation, participants, theme } = props.common;
  const { ConversationImage } = theme;

  return html`
    <div className="t-theme-chat-header">
      <div className="t-inner">
        <div className="t-content">
          <div className="t-image">
            <${ConversationImage}
              conversation=${conversation}
              participants=${participants}
              common=${props.common}
            />
          </div>

          <div className="t-info">
            <${Title} ...${props} />
          </div>
        </div>
      </div>
    </div>
  `;
}

/** @param {ChatHeaderProps} props */
function Title(props) {
  const { common } = props;

  if (common.conversation.subject) {
    return html`
      <div className="t-title">${common.conversation.subject}</div>
      <div className="t-subtitle">
        <${Participants} ...${props} />
      </div>
    `;
  } else {
    return html`<div className="t-title">
      <${Participants} ...${props} />
    </div>`;
  }
}

/** @param {ChatHeaderProps} props */
function Participants({ common, isUserConnected, permissions }) {
  const { participants } = common;
  const otherParticipants = participants.filter(
    ({ user }) => user.id !== common.currentUser.id,
  );
  const shownParticipants =
    otherParticipants.length === 0 ? participants : otherParticipants;

  if (permissions.showOnlineStatus) {
    return html`
      <span className="t-participants">
        ${shownParticipants.map(
          ({ user }) => html`
            <span className="t-participant" key=${user.id}>
              <span>${user.name}</span>
              <span
                className="t-online-indicator"
                t-status=${isUserConnected[user.id] ? "online" : "offline"}
              ></span>
            </span>
          `,
        )}
      </span>
    `;
  }

  const participantsList = shownParticipants
    .map(({ user }) => user.name)
    .join(", ");

  return html`<span className="t-participants">${participantsList}</span>`;
}
