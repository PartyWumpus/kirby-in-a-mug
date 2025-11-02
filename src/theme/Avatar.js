import { html } from "@talkjs/react-components/theming";
/** @import { AvatarProps } from "@talkjs/react-components/theming"; */

/** @param {AvatarProps} props */
export function Avatar({ photoUrl }) {
  return html`
    <div
      className="t-theme-avatar"
      style=${{ backgroundImage: `url(${photoUrl})` }}
    />
  `;
}
