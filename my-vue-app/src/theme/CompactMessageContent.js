import { formatDuration, html, Text } from "@talkjs/react-components/theming";
/** @import { CompactMessageContentProps } from "@talkjs/react-components/theming"; */

/** @param {CompactMessageContentProps} props */
export function CompactMessageContent(props) {
  return html`
    <span className="t-theme-compact-message-content">
      <${Content} ...${props} />
    </span>
  `;
}

/** @param {CompactMessageContentProps} props */
function Content({ message, common }) {
  const firstContent = message.content[0];
  const { theme, t } = common;
  const { Icon } = theme;

  if (firstContent.type === "text") {
    return html`<${Text} block=${firstContent} nonInteractive />`;
  }

  if (firstContent.type === "location") {
    return html`<${Icon} type="location" common=${common} /> ${t.LOCATION}`;
  }

  if (firstContent.type === "file") {
    if (firstContent.subtype === "image") {
      return html`
        <${Icon} type="image" common=${common} />
        ${firstContent.filename}
      `;
    }

    if (firstContent.subtype === "video") {
      return html`
        <${Icon} type="movie" common=${common} />
        ${firstContent.filename}
      `;
    }

    if (firstContent.subtype === "audio") {
      return html`
        <${Icon} type="attachment" common=${common} />
        ${firstContent.filename}
      `;
    }

    if (firstContent.subtype === "voice") {
      return html`
        <${Icon} type="microphone" common=${common} />
        ${t.VOICE_MESSAGE} (${formatDuration(firstContent.duration ?? 0)})
      `;
    }

    if (firstContent.subtype === undefined) {
      return html`
        <${Icon} type="attachment" common=${common} />
        ${firstContent.filename}
      `;
    }
  }

  return null;
}
