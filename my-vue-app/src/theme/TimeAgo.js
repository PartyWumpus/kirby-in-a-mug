import { html, useTimeAgo } from "@talkjs/react-components/theming";
/** @import { TimeAgoProps } from "@talkjs/react-components/theming"; */

/** @param {TimeAgoProps} props */
export function TimeAgo({ timestamp, common }) {
  const { t } = common;
  // Turns `timestamp` into a long, informative, locale specific datetime string
  const absoluteDateTimeString = new Date(timestamp).toLocaleString(t.locale, {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const time = useTimeAgo(timestamp, t);

  return html`
    <span className="t-theme-time-ago">
      <span
        role="time"
        title=${absoluteDateTimeString}
        aria-description=${time.long}
      >
        ${"like " + time.long + "ish"}
      </span>
    </span>
  `;
}
