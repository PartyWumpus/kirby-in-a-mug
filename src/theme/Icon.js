import { html } from "@talkjs/react-components/theming";
/** @import { IconProps } from "@talkjs/react-components/theming"; */

/** @param {IconProps} props */
export function Icon({ className = "", type }) {
  const SelectedIcon = icons[type];
  return html`<${SelectedIcon} className=${`t-theme-icon ${className}`} />`;
}

const icons = {
  attach: AttachIcon,
  chevronLeft: ChevronLeftIcon,
  left: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  right: ChevronRightIcon,
  chevronUp: ChevronUpIcon,
  up: ChevronUpIcon,
  chevronDown: ChevronDownIcon,
  down: ChevronDownIcon,
  close: CloseIcon,
  emoji: EmojiIcon,
  locationPin: LocationPinIcon,
  more: MoreIcon,
  plus: PlusIcon,
  search: SearchIcon,
  send: SendIcon,
  spinner: SpinnerIcon,
  play: PlayIcon,
  pause: PauseIcon,
  updown: UpdownIcon,
  addEmoji: AddEmojiIcon,
  microphone: MicrophoneIcon,
  mic: MicIcon,
  stop: StopIcon,
  download: DownloadIcon,
  location: LocationIcon,
  email: EmailIcon,
  movie: MovieIcon,
  image: ImageIcon,
  attachment: AttachmentIcon,
  horizontalDots: HorizontalDotsIcon,
  verticalDots: VerticalDotsIcon,
  reply: ReplyIcon,
  back: BackIcon,
};

function AttachIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <path
        fill="none"
        d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
      ></path>
    </svg>
  `;
}

function ChevronLeftIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
    >
      <polyline fill="none" points="15 6 9 12 15 18"></polyline>
    </svg>
  `;
}

function ChevronRightIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
    >
      <polyline fill="none" points="9 6 15 12 9 18"></polyline>
    </svg>
  `;
}

function ChevronUpIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <polyline fill="none" points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
}

function ChevronDownIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <polyline fill="none" points="6 9 12 15 18 9"></polyline>
    </svg>
  `;
}

function CloseIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <line x1="18" y1="6" x2="6" y2="18" fill="none"></line>
      <line fill="none" x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `;
}

function EmojiIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <circle fill="none" cx="12" cy="12" r="10"></circle>
      <path fill="none" d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"></path>
    </svg>
  `;
}

function LocationPinIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <path
        fill="none"
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
      ></path>
      <circle fill="none" cx="12" cy="10" r="3"></circle>
    </svg>
  `;
}

function MoreIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <path
        d="M32 20C30.9391 20 29.9217 19.5786 29.1716 18.8284C28.4214 18.0783 28 17.0609 28 16C28 14.9391 28.4214 13.9217 29.1716 13.1716C29.9217 12.4214 30.9391 12 32 12C33.0609 12 34.0783 12.4214 34.8284 13.1716C35.5786 13.9217 36 14.9391 36 16C36 17.0609 35.5786 18.0783 34.8284 18.8284C34.0783 19.5786 33.0609 20 32 20ZM32 36C30.9391 36 29.9217 35.5786 29.1716 34.8284C28.4214 34.0783 28 33.0609 28 32C28 30.9391 28.4214 29.9217 29.1716 29.1716C29.9217 28.4214 30.9391 28 32 28C33.0609 28 34.0783 28.4214 34.8284 29.1716C35.5786 29.9217 36 30.9391 36 32C36 33.0609 35.5786 34.0783 34.8284 34.8284C34.0783 35.5786 33.0609 36 32 36ZM28 48C28 49.0609 28.4214 50.0783 29.1716 50.8284C29.9217 51.5786 30.9391 52 32 52C33.0609 52 34.0783 51.5786 34.8284 50.8284C35.5786 50.0783 36 49.0609 36 48C36 46.9391 35.5786 45.9217 34.8284 45.1716C34.0783 44.4214 33.0609 44 32 44C30.9391 44 29.9217 44.4214 29.1716 45.1716C28.4214 45.9217 28 46.9391 28 48Z"
        fill="currentColor"
      ></path>
    </svg>
  `;
}

function PlusIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <line x1="12" y1="5" x2="12" y2="19" fill="none"></line>
      <line fill="none" x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  `;
}

function SearchIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <path
        fill="none"
        d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21.35 21.35 17 17"
      ></path>
    </svg>
  `;
}

function SendIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 64 64"
      height="24px"
      width="24px"
    >
      <path
        d="M14.4812 8.18108C14.1942 8.03755 13.8727 7.97744 13.5533 8.00758C13.2338 8.03773 12.9292 8.15693 12.6742 8.35162C12.4191 8.54631 12.2238 8.80867 12.1105 9.10886C11.9972 9.40906 11.9704 9.73503 12.0331 10.0497L16.8435 26.6787C16.9332 26.9886 17.1086 27.2669 17.3493 27.4816C17.5901 27.6963 17.8866 27.8387 18.2047 27.8925L37.7138 31.16C38.6327 31.3417 38.6327 32.6583 37.7138 32.84L18.2047 36.1075C17.8866 36.1613 17.5901 36.3037 17.3493 36.5184C17.1086 36.7331 16.9332 37.0114 16.8435 37.3213L12.0331 53.9503C11.9704 54.265 11.9972 54.5909 12.1105 54.8911C12.2238 55.1913 12.4191 55.4537 12.6742 55.6484C12.9292 55.8431 13.2338 55.9623 13.5533 55.9924C13.8727 56.0226 14.1942 55.9625 14.4812 55.8189L59.0538 33.5326C59.3382 33.3901 59.5773 33.1712 59.7444 32.9006C59.9115 32.6299 60 32.3181 60 32C60 31.6819 59.9115 31.3701 59.7444 31.0994C59.5773 30.8288 59.3382 30.6099 59.0538 30.4674L14.4812 8.18108Z"
        fill="currentColor"
      ></path>
    </svg>
  `;
}

function SpinnerIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 64 64"
      height="24px"
      width="24px"
    >
      <path
        d="M31.9999 11.1999C26.4834 11.1999 21.1928 13.3913 17.2921 17.2921C13.3913 21.1928 11.1999 26.4834 11.1999 31.9999C11.1999 32.6364 10.947 33.2469 10.497 33.697C10.0469 34.1471 9.43642 34.3999 8.7999 34.3999C8.16338 34.3999 7.55293 34.1471 7.10285 33.697C6.65276 33.2469 6.3999 32.6364 6.3999 31.9999C6.3999 26.9367 7.90132 21.9872 10.7143 17.7773C13.5272 13.5674 17.5254 10.2862 22.2032 8.3486C26.881 6.41099 32.0283 5.90403 36.9942 6.89181C41.9601 7.87959 46.5216 10.3178 50.1018 13.898C53.6821 17.4782 56.1202 22.0397 57.108 27.0056C58.0958 31.9715 57.5888 37.1188 55.6512 41.7966C53.7136 46.4744 50.4324 50.4726 46.2225 53.2855C42.0126 56.0985 37.0631 57.5999 31.9999 57.5999C31.3634 57.5999 30.7529 57.3471 30.3028 56.897C29.8528 56.4469 29.5999 55.8364 29.5999 55.1999C29.5999 54.5634 29.8528 53.9529 30.3028 53.5029C30.7529 53.0528 31.3634 52.7999 31.9999 52.7999C37.5164 52.7999 42.807 50.6085 46.7077 46.7077C50.6085 42.807 52.7999 37.5164 52.7999 31.9999C52.7999 26.4834 50.6085 21.1928 46.7077 17.2921C42.807 13.3913 37.5164 11.1999 31.9999 11.1999V11.1999Z"
        fill="currentColor"
      ></path>
    </svg>
  `;
}

function PlayIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  `;
}

function PauseIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  `;
}

function UpdownIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 64 64"
      height="24px"
      width="24px"
    >
      <path
        d="M 16 25.75 L 19.769531 29.523438 L 31.085938 18.210938 L 42.398438 29.523438 L 46.167969 25.75 L 31.085938 10.667969 Z M 16 25.75 "
        fill="currentColor"
      ></path>
      <path
        d="M 16 38.515625 L 19.769531 34.746094 L 31.085938 46.058594 L 42.398438 34.746094 L 46.167969 38.515625 L 31.085938 53.601562 Z M 16 38.515625 "
        fill="currentColor"
      ></path>
    </svg>
  `;
}

function AddEmojiIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="-2 -2 28 28"
      height="26"
      width="26"
      style=${{ overflow: "visible" }}
    >
      <circle fill="none" cx="12" cy="12" r="10"></circle>
      <path fill="none" d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"></path>
      <line
        x1="25"
        y1="-1"
        x2="25"
        y2="5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      ></line>
      <line
        x1="28"
        y1="2"
        x2="22"
        y2="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      ></line>
    </svg>
  `;
}

function MicrophoneIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 64 64"
      height="24px"
      width="24px"
    >
      <path
        fillRule="nonzero"
        fill="currentColor"
        fillOpacity="1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        strokeOpacity="1"
        strokeMiterlimit="4"
        d="M 15 1.25061 C 14.005737 1.25061 13.051758 1.644287 12.348633 2.349243 C 11.645508 3.052368 11.25 4.006348 11.25 5.00061 L 11.25 15 C 11.25 15.994263 11.645508 16.948242 12.348633 17.651367 C 13.051758 18.354492 14.005737 18.75 15 18.75 C 15.994263 18.75 16.948242 18.354492 17.651367 17.651367 C 18.354492 16.948242 18.75 15.994263 18.75 15 L 18.75 5.00061 C 18.75 4.006348 18.354492 3.052368 17.651367 2.349243 C 16.948242 1.644287 15.994263 1.25061 15 1.25061 Z M 15 1.25061 "
        transform="matrix(2.133333, 0, 0, 2.133333, 0, 0)"
      ></path>
      <path
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        strokeOpacity="1"
        strokeMiterlimit="4"
        d="M 23.75061 12.50061 L 23.75061 15 C 23.75061 17.319946 22.827759 19.546509 21.187134 21.187134 C 19.546509 22.827759 17.319946 23.75061 15 23.75061 C 12.680054 23.75061 10.453491 22.827759 8.812866 21.187134 C 7.172241 19.546509 6.24939 17.319946 6.24939 15 L 6.24939 12.50061 "
        transform="matrix(2.133333, 0, 0, 2.133333, 0, 0)"
      ></path>
      <path
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        strokeOpacity="1"
        strokeMiterlimit="4"
        d="M 15 23.75061 L 15 28.74939 "
        transform="matrix(2.133333, 0, 0, 2.133333, 0, 0)"
      ></path>
      <path
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        strokeOpacity="1"
        strokeMiterlimit="4"
        d="M 9.99939 28.74939 L 20.00061 28.74939 "
        transform="matrix(2.133333, 0, 0, 2.133333, 0, 0)"
      ></path>
    </svg>
  `;
}

function MicIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 64 64"
      height="24px"
      width="24px"
    >
      <path
        fillRule="nonzero"
        fill="currentColor"
        fillOpacity="1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        strokeOpacity="1"
        strokeMiterlimit="4"
        d="M 15 1.25061 C 14.005737 1.25061 13.051758 1.644287 12.348633 2.349243 C 11.645508 3.052368 11.25 4.006348 11.25 5.00061 L 11.25 15 C 11.25 15.994263 11.645508 16.948242 12.348633 17.651367 C 13.051758 18.354492 14.005737 18.75 15 18.75 C 15.994263 18.75 16.948242 18.354492 17.651367 17.651367 C 18.354492 16.948242 18.75 15.994263 18.75 15 L 18.75 5.00061 C 18.75 4.006348 18.354492 3.052368 17.651367 2.349243 C 16.948242 1.644287 15.994263 1.25061 15 1.25061 Z M 15 1.25061 "
        transform="matrix(2.133333, 0, 0, 2.133333, 0, 0)"
      ></path>
      <path
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        strokeOpacity="1"
        strokeMiterlimit="4"
        d="M 23.75061 12.50061 L 23.75061 15 C 23.75061 17.319946 22.827759 19.546509 21.187134 21.187134 C 19.546509 22.827759 17.319946 23.75061 15 23.75061 C 12.680054 23.75061 10.453491 22.827759 8.812866 21.187134 C 7.172241 19.546509 6.24939 17.319946 6.24939 15 L 6.24939 12.50061 "
        transform="matrix(2.133333, 0, 0, 2.133333, 0, 0)"
      ></path>
      <path
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        strokeOpacity="1"
        strokeMiterlimit="4"
        d="M 15 23.75061 L 15 28.74939 "
        transform="matrix(2.133333, 0, 0, 2.133333, 0, 0)"
      ></path>
      <path
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        strokeOpacity="1"
        strokeMiterlimit="4"
        d="M 9.99939 28.74939 L 20.00061 28.74939 "
        transform="matrix(2.133333, 0, 0, 2.133333, 0, 0)"
      ></path>
    </svg>
  `;
}

function StopIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 64 64"
      height="24px"
      width="24px"
    >
      <path
        d="M 54.628906 9.371094 C 48.582031 3.328125 40.546875 0 32 0 C 23.453125 0 15.417969 3.328125 9.371094 9.371094 C 3.328125 15.417969 0 23.453125 0 32 C 0 40.546875 3.328125 48.582031 9.371094 54.628906 C 15.417969 60.671875 23.453125 64 32 64 C 40.546875 64 48.582031 60.671875 54.628906 54.628906 C 60.671875 48.582031 64 40.546875 64 32 C 64 23.453125 60.671875 15.417969 54.628906 9.371094 Z M 32 60.042969 C 16.539062 60.042969 3.957031 47.460938 3.957031 32 C 3.957031 16.539062 16.539062 3.957031 32 3.957031 C 47.460938 3.957031 60.042969 16.539062 60.042969 32 C 60.042969 47.460938 47.460938 60.042969 32 60.042969 Z M 32 60.042969 "
        fill="currentColor"
      ></path>
      <path
        d="M 18.472656 18.472656 L 45.527344 18.472656 L 45.527344 45.527344 L 18.472656 45.527344 Z M 18.472656 18.472656 "
        fill="currentColor"
      ></path>
    </svg>
  `;
}

function DownloadIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 34 34"
      height="24px"
      width="24px"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 9C17.6443 9 18.1667 9.52672 18.1667 10.1765V19.9988L22.0116 16.1516C22.469 15.694 23.2077 15.6969 23.6615 16.1581C24.1153 16.6193 24.1125 17.3642 23.6551 17.8219L17.8217 23.6586C17.3669 24.1138 16.6331 24.1138 16.1783 23.6586L10.3449 17.8219C9.88754 17.3642 9.88467 16.6193 10.3385 16.1581C10.7923 15.6969 11.531 15.694 11.9884 16.1516L15.8333 19.9988V10.1765C15.8333 9.52672 16.3557 9 17 9Z"
        fill="currentColor"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 16C2 7.71852 8.71852 1 17 1C25.2815 1 32 7.71852 32 16C32 24.2815 25.2815 31 17 31C8.71852 31 2 24.2815 2 16ZM17 3.30769C9.99302 3.30769 4.30769 8.99302 4.30769 16C4.30769 23.007 9.99302 28.6923 17 28.6923C24.007 28.6923 29.6923 23.007 29.6923 16C29.6923 8.99302 24.007 3.30769 17 3.30769Z"
        fill="currentColor"
      ></path>
    </svg>
  `;
}

function LocationIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <path
        fill="none"
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
      ></path>
      <circle fill="none" cx="12" cy="10" r="3"></circle>
    </svg>
  `;
}

function EmailIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      height="24px"
      width="24px"
    >
      <path
        d="M4 3C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V5.201L8 8.432L14 5.202V5C14 4.46957 13.7893 3.96086 13.4142 3.58579C13.0391 3.21071 12.5304 3 12 3H4Z"
        fill="currentColor"
      ></path>
      <path
        d="M14 6.33704L8.237 9.44004C8.16416 9.47925 8.08273 9.49977 8 9.49977C7.91727 9.49977 7.83584 9.47925 7.763 9.44004L2 6.33704V11C2 11.5305 2.21071 12.0392 2.58579 12.4142C2.96086 12.7893 3.46957 13 4 13H12C12.5304 13 13.0391 12.7893 13.4142 12.4142C13.7893 12.0392 14 11.5305 14 11V6.33704Z"
        fill="currentColor"
      ></path>
    </svg>
  `;
}

function MovieIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <polygon points="23 7 16 12 23 17 23 7" fill="none"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="none"></rect>
    </svg>
  `;
}

function ImageIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <rect x="3" y="3" fill="none" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21" fill="none"></polyline>
    </svg>
  `;
}

function AttachmentIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <path
        fill="none"
        d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
      ></path>
    </svg>
  `;
}

function VerticalDotsIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      height="24px"
      width="24px"
    >
      <circle fill="currentColor" cx="8" cy="4" r="1"></circle>
      <circle fill="currentColor" cx="8" cy="8" r="1"></circle>
      <circle fill="currentColor" cx="8" cy="12" r="1"></circle>
    </svg>
  `;
}

function HorizontalDotsIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      height="24px"
      width="24px"
    >
      <circle fill="currentColor" cx="2" cy="8" r="1"></circle>
      <circle fill="currentColor" cx="8" cy="8" r="1"></circle>
      <circle fill="currentColor" cx="14" cy="8" r="1"></circle>
    </svg>
  `;
}

function ReplyIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 365.61 285.686"
      height="24px"
      width="24px"
    >
      <path
        opacity="1"
        fill="currentColor"
        fillOpacity="1"
        stroke="currentColor"
        strokeWidth="20.00000191"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeDasharray="none"
        strokeOpacity="1"
        d="M38.6 202.285v-30.656c-41.89-4.634-128.643-3.207-207.204 76.436C-137.337 132.47-100.573 84.491 38.6 43.487v-61.112l69.262 62.334c38.094 34.283 69.342 62.556 69.44 62.829.098.272-30.47 28.059-67.927 61.748l-69.44 62.453-1.335 1.201z"
        transform="translate(178.603 27.624) scale(-1,1)"
      ></path>
    </svg>
  `;
}

function BackIcon({ className }) {
  return html`
    <svg
      className=${className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
    >
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  `;
}
