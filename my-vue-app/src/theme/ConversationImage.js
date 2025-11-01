import { html, getPhotoUrlWithFallback } from "@talkjs/react-components/theming";
/** @import { ConversationImageProps } from "@talkjs/react-components/theming"; */

/** @param {ConversationImageProps} props */
export function ConversationImage({ common, conversation, participants }) {
  const { currentUser, theme } = common;
  const { Avatar, GroupChatImage } = theme;

  if (conversation.photoUrl) {
    return html`<${Avatar}
      photoUrl=${conversation.photoUrl}
      common=${common}
    />`;
  }
  if (participants.length === 0) {
    return null;
  }
  if (participants.length === 1) {
    return html`<${Avatar}
      photoUrl=${getPhotoUrlWithFallback(currentUser)}
      common=${common}
    />`;
  }
  if (participants.length === 2) {
    const otherUser =
      participants[0].user.id === currentUser.id
        ? participants[1].user
        : participants[0].user;
    return html`<${Avatar}
      photoUrl=${getPhotoUrlWithFallback(otherUser)}
      common=${common}
    />`;
  }

  return html`
    <${GroupChatImage} participants=${participants} common=${common} />
  `;
}
