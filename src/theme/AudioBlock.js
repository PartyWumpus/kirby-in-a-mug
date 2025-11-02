import { AudioPlayer, formatFilesize, html } from "@talkjs/react-components/theming";
/** @import { AudioBlockProps } from "@talkjs/react-components/theming"; */

/** @param {AudioBlockProps} props */
export function AudioBlock({ block, downloadUrl, common }) {
  const { Icon } = common.theme;

  return html`
    <div className="t-theme-audio-block">
      <${AudioPlayer} src=${block.url} filename=${block.filename} />

      <a className="t-body-text" href=${downloadUrl}>
        <${Icon}
          type="attachment"
          className="t-attachment-icon"
          common=${common}
        />
        <span className="t-filename">${block.filename}</span>
        <span className="t-filesize"> (${formatFilesize(block.size)})</span>
      </a>
    </div>
  `;
}
