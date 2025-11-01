import { html, formatFilesize } from "@talkjs/react-components/theming";
/** @import { FileBlockProps } from "@talkjs/react-components/theming"; */

/** @param {FileBlockProps} props */
export function FileBlock({ block, downloadUrl, common }) {
  const { Icon } = common.theme;

  return html`
    <div className="t-theme-file-block">
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
