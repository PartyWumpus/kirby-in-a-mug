import { getTalkSession } from "@talkjs/core";
import { Chatbox, type ChatboxRef } from "@talkjs/react-components";
import "@talkjs/react-components/base.css";
import { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";
import * as myTheme from "./theme";
import "./theme/index.css";
import Draggable from "react-draggable";

type Letter = {
  symbol: string;
  position: [number, number];
  globallyPositioned: boolean;
};

const appId = "tYrKVjrQ";
const conversationId = "the_convo";

function App() {
  const [username, setUsername] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const chatboxRef = useRef<ChatboxRef | null>(null);

  const [keyboard, setKeyboard] = useState<Record<string, Letter>>({
    q: { symbol: "q", position: [3, 5], globallyPositioned: false },
    w: { symbol: "w", position: [13, 5], globallyPositioned: false },
    e: { symbol: "e", position: [23, 5], globallyPositioned: false },
    r: { symbol: "r", position: [33, 5], globallyPositioned: false },
    t: { symbol: "t", position: [43, 5], globallyPositioned: false },
    y: { symbol: "y", position: [53, 5], globallyPositioned: false },
    u: { symbol: "u", position: [63, 5], globallyPositioned: false },
    i: { symbol: "i", position: [73, 5], globallyPositioned: false },
    o: { symbol: "o", position: [83, 5], globallyPositioned: false },
    p: { symbol: "p", position: [93, 5], globallyPositioned: false },

    a: { symbol: "a", position: [5, 37.5], globallyPositioned: false },
    s: { symbol: "s", position: [15, 37.5], globallyPositioned: false },
    d: { symbol: "d", position: [25, 37.5], globallyPositioned: false },
    f: { symbol: "f", position: [35, 37.5], globallyPositioned: false },
    g: { symbol: "g", position: [45, 37.5], globallyPositioned: false },
    h: { symbol: "h", position: [55, 37.5], globallyPositioned: false },
    j: { symbol: "j", position: [65, 37.5], globallyPositioned: false },
    k: { symbol: "k", position: [75, 37.5], globallyPositioned: false },
    l: { symbol: "l", position: [85, 37.5], globallyPositioned: false },
    " ": { symbol: "␣", position: [95, 37.5], globallyPositioned: false },

    z: { symbol: "z", position: [10, 70], globallyPositioned: false },
    x: { symbol: "x", position: [20, 70], globallyPositioned: false },
    c: { symbol: "c", position: [30, 70], globallyPositioned: false },
    v: { symbol: "v", position: [40, 70], globallyPositioned: false },
    b: { symbol: "b", position: [50, 70], globallyPositioned: false },
    n: { symbol: "n", position: [60, 70], globallyPositioned: false },
    m: { symbol: "m", position: [70, 70], globallyPositioned: false },
    ".": { symbol: ".", position: [80, 70], globallyPositioned: false },
    "?": { symbol: "?", position: [90, 70], globallyPositioned: false },
  });
  const joinButtonRef = useRef<null | HTMLInputElement>(null);

  async function signUp(username: string) {
    const session = getTalkSession({
      // @ts-expect-error wawa
      host: "durhack.talkjs.com",
      appId,
      userId: username,
    });

    await session.currentUser.createIfNotExists({ name: username });
    setUsername(username);

    const conversation = session.conversation(conversationId);
    conversation.createIfNotExists();
  }

  useEffect(() => {
    // Jank!
    const interval = setInterval(() => {
      const x = document.querySelector<HTMLDivElement>(".t-editor > div");
      if (x !== null) {
        x.contentEditable = "false";
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  function onKeyPress(key: string) {
    const x = document.querySelector<HTMLParagraphElement>(
      ".t-editor > div > p"
    )!;
    if (x.getAttribute("data-placeholder") === null) {
      x.innerText += key;
    } else {
      x.innerText = key;
    }
    /*
    setKeyboard({
      ...keyboard,
      [key]: {
        ...letter,
        position: [
          letter.position[0] + 1,
          letter.position[1],
        ],
      },
    });
    */
  }

  // DEBUG
  signUp("qwert");

  return (
    <>
      {username !== "" ? (
        <>
          <Chatbox
            ref={chatboxRef}
            host="durhack.talkjs.com"
            appId={appId}
            userId={username}
            conversationId={conversationId}
            chatHeaderVisible={false}
            enterSendsMessage={false}
            theme={myTheme}
            style={{ width: "100%" }}
          ></Chatbox>
          <span>score: {score}</span>
          <Keeb keyboard={keyboard}/>

            {/* TODO */}
            <div
              style={{
                position: "absolute",
                left: "0",
                top: "0",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              {Object.entries(keyboard)
                .filter(([_key, letter]) => letter.globallyPositioned === true)
                .map(([key, letter]) => (
                  <svg
                    key={key}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      translate: `${letter.position[0]}% ${letter.position[1]}%`,
                      userSelect: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      onKeyPress(key);
                    }}
                  >
                    <rect
                      width="50"
                      height="50"
                      x="0"
                      y="0"
                      style={{ pointerEvents: "all" }}
                    ></rect>
                    <text
                      width="50"
                      height="50"
                      x="7"
                      y="20"
                      fontSize="1.5em"
                      fill="white"
                    >
                      {letter.symbol}
                    </text>
                  </svg>
                ))}
          </div>
        </>
      ) : (
        <>
          <input ref={joinButtonRef} />
          <button
            onClick={async () => {
              await signUp(joinButtonRef.current!.value);
            }}
          >
            Join
          </button>
        </>
      )}
      <UiThingy/>
    </>
  );
}

function Keeb({keyboard}: {keyboard: Record<string, Letter>}) {
  return (<div
            style={{
              border: "1px white solid",
              height: "200px",
              width: "100%",
            }}
          >
            <svg width="100%" height="100%">
              <g>
                {Object.entries(keyboard)
                  .filter(
                    ([_key, letter]) => letter.globallyPositioned === false
                  )
                  .map(([key, letter]) => (
                    <g
                      key={key}
                      style={{
                        translate: `${letter.position[0]}% ${letter.position[1]}%`,
                        userSelect: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        onKeyPress(key);
                      }}
                    >
                      <rect width="50" height="50" x="0" y="0"></rect>
                      <text
                        width="50"
                        height="50"
                        x="7"
                        y="20"
                        fontSize="1.5em"
                        fill="white"
                      >
                        {letter.symbol}
                      </text>
                    </g>
                  ))}
              </g>
            </svg>
            </div>)

}

function UiThingy() {
  const nodeRef = useRef(null)
  return <Draggable handle="strong" nodeRef={nodeRef}>
          <div style={{background: "black", width: "100px"}} ref={nodeRef}>
            <strong><div style={{background: "blue"}}>Drag here</div></strong>
            <div>You must click my handle to drag me</div>
          </div>
        </Draggable>
}

export default App;
