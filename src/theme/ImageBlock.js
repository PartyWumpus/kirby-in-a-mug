import { html, formatFilesize } from "@talkjs/react-components/theming";
/** @import { ImageBlockProps } from "@talkjs/react-components/theming"; */

/** @param {ImageBlockProps} props */
export function ImageBlock({ block, downloadUrl, common }) {
  const { Icon } = common.theme;

  const width = block.width || 1;
  const height = block.height || 1;
  const style = { "--img-w": width, "--img-h": height };

  return html`
    <div className="t-theme-image-block">
      <a
        href=${block.url}
        className="t-image-wrapper"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="t-root" style=${style}>
          <img src=${block.url} className="t-image" />
        </div>
      </a>

      <a href=${downloadUrl} className="t-body-text">
        <${Icon} className="download-icon" type="download" common=${common} />
        <span>${block.filename}</span>
        <span className="t-filesize"> (${formatFilesize(block.size)})</span>
      </a>
    </div>
  `;
}
