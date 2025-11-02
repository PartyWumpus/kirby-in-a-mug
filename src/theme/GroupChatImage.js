import { html, getPhotoUrlWithFallback } from "@talkjs/react-components/theming";
/** @import { GroupChatImageProps } from "@talkjs/react-components/theming"; */

/** @param {GroupChatImageProps} props */
export function GroupChatImage({ participants }) {
  const counterSize = 22;

  return html`
    <div className="t-theme-group-chat-image">
      <div
        className="t-mini-avatar"
        style=${{
          backgroundImage: `url("${getPhotoUrlWithFallback(
            participants[0].user,
          )}")`,
        }}
      ></div>
      <div
        className="t-mini-avatar"
        style=${{
          backgroundImage: `url("${getPhotoUrlWithFallback(
            participants[1].user,
          )}")`,
        }}
      ></div>
      ${participants.length > 2 &&
      html`<svg
        className="t-counter"
        viewBox="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Using an svg as a counter as then we can use clip-path -->
        <g className="t-group">
          <!--
                  Note: fill="currentColor" inherits text 'color'
                        from its parent, in this case '.t-group'.
                  -->
          <rect
            x="0"
            y="0"
            width=${counterSize}
            height=${counterSize}
            fill="currentColor"
          />
        </g>
        <!--
                Note: fill="currentColor" inherits text 'color'
                      from its parent, in this case '.t-counter'. this means
                      we can get 2 different colours without fiddling with
                      fills in css (which dont seem to work in these cases)
                -->
        <text
          textAnchor="middle"
          x=${counterSize / 2}
          y=${Math.round(counterSize * 0.666)}
          width=${counterSize}
          height=${counterSize}
          fontSize=${participants.length > 99 ? 10 : 12}
          fill="currentColor"
        >
          ${participants.length > 99 ? "99+" : participants.length}
        </text>
      </svg>`}
    </div>
  `;
}
