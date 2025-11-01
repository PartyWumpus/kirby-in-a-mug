import { html, getGoogleMapsUrls } from "@talkjs/react-components/theming";
/** @import { LocationBlockProps } from "@talkjs/react-components/theming"; */

/** @param {LocationBlockProps} props */
export function LocationBlock({ block }) {
  const { imageUrl, linkUrl } = getGoogleMapsUrls(block);
  const cssImageUrl = `url(${JSON.stringify(imageUrl)})`;

  return html`
    <div className="t-theme-location-block">
      <a
        href=${linkUrl}
        target="_blank"
        className="t-root"
        style=${{
          background: `${cssImageUrl} center center / cover no-repeat`,
        }}
      ></a>

      <span className="t-body-text">
        <a href=${linkUrl} target="_blank" rel="noopener noreferrer"
          >${linkUrl}</a
        >
      </span>
    </div>
  `;
}
