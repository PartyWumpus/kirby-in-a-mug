import { html, formatFilesize } from "@talkjs/react-components/theming";
/** @import { VideoBlockProps } from "@talkjs/react-components/theming"; */

/** @param {VideoBlockProps} props */
export function VideoBlock({ block, downloadUrl, common }) {
  const { Icon } = common.theme;
  const width = block.width || 1;
  const height = block.height || 1;
  const style = { "--video-w": width, "--video-h": height };

  return html`
    <div className="t-theme-video-block">
      <div className="t-video-wrapper">
        <div className="t-root" style=${style}>
          <!-- We are using media fragments in the src as a workaround to iOS Safari -->
          <!-- not showing the video preview properly. See: https://muffinman.io/blog/hack-for-ios-safari-to-display-html-video-thumbnail/ -->
          <video
            className="t-video"
            controls
            preload="metadata"
            src=${`${block.url}#t=0.1`}
            playsInline
          ></video>
        </div>
      </div>

      <a href=${downloadUrl} className="t-body-text">
        <${Icon} className="download-icon" type="download" common=${common} />
        <span>${block.filename}</span>
        <span className="t-filesize"> (${formatFilesize(block.size)})</span>
      </a>
    </div>
  `;
}
