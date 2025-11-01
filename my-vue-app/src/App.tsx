import { getTalkSession, type TalkSession } from "@talkjs/core";
import { Chatbox, type ChatboxRef } from "@talkjs/react-components";
import "@talkjs/react-components/base.css";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import Draggable from "react-draggable";
import "./App.css";
import bopitImage from "./assets/bopit.webp";
import puppetImage from "./assets/puppet.webp";
import { FabricJSCanvas } from "./DrawableCanvas";
import * as myTheme from "./theme";
import "./theme/index.css";
import { words } from "./words";

type Letter = {
  symbol: string;
  position: [number, number];
  globallyPositioned: boolean;
  rotation?: number;
};

const appId = "tYrKVjrQ";
const conversationId = "the_convo";

const eventList = [
  "scramble",
  "bopit",
  "musicBox",
  "missingLetter",
  "captcha",
  "drawing",
  "trivia",
] as const;

function App() {
  const [username, setUsername] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [time, setTime] = useState(120);
  const [popups, setPopups] = useState<
    Record<string, (typeof eventList)[number]>
  >({});
  const chatboxRef = useRef<ChatboxRef>(null);
  const sessionRef = useRef<TalkSession>(null);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setTime(time - 1);
    }, 1500);

    return () => {
      clearInterval(interval1);
    };
  }, [time]);

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
  const joinButtonRef = useRef<HTMLInputElement>(null);

  function triggerRandomDebuff() {
    const debuffList = [
      "swapKeys",
      "rotateKey",
      //      "hideSymbol",
      //      "hideCursor",
    ] as const;
    const debuff = debuffList[Math.floor(Math.random() * debuffList.length)];
    switch (debuff) {
      case "swapKeys": {
        const [key1, key2] = getPairOfKeys();
        const keyboab = {
          ...keyboard,
          [key1]: { ...keyboard[key2], symbol: keyboard[key1].symbol },
          [key2]: { ...keyboard[key1], symbol: keyboard[key2].symbol },
        };
        setKeyboard(keyboab);
        break;
      }
      case "rotateKey": {
        const key1 = getRandomKey();
        const keyboab = {
          ...keyboard,
          [key1]: { ...keyboard[key1], rotation: Math.random() * 360 },
        };
        setKeyboard(keyboab);
        break;
      }
    }
  }

  function getRandomKey(): string {
    const keys = Object.keys(keyboard);
    return keys[(keys.length * Math.random()) << 0];
  }

  function getPairOfKeys(): [string, string] {
    let keys = Object.keys(keyboard);
    const key1 = keys[(keys.length * Math.random()) << 0];
    keys = keys.filter((item) => item !== key1);
    const key2 = keys[(keys.length * Math.random()) << 0];
    return [key1, key2];
  }

  async function signUp(username: string) {
    const session = getTalkSession({
      // @ts-expect-error wawa
      host: "durhack.talkjs.com",
      appId,
      userId: username,
    });
    sessionRef.current = session;

    await session.currentUser.createIfNotExists({ name: username });
    setUsername(username);

    const conversation = session.conversation(conversationId);
    conversation.createIfNotExists();

    globalThis.wawa = async (blob: Blob) => {
      console.log(blob);
      const file = new File([blob], "pfp.png");
      console.log(file);

      const fileToken = await session.uploadImage(blob, {
        filename: "pfp.png",
        width: 100,
        height: 100,
      });

      conversation.send({
        content: [{ type: "file", fileToken }],
      });

      session.currentUser.set({
        photoUrl: "wasd",
      });
    };
  }

  function randomEvent() {
    const newEvent = eventList[Math.floor(Math.random() * eventList.length)];
    setPopups({ ...popups, [crypto.randomUUID()]: newEvent });
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
    // DEBUG
    setScore(score + 1);
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
            style={{ width: "100%", borderRadius: "0" }}
          ></Chatbox>
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
            <UiThingy title="score">{score}</UiThingy>
            {/*<UiThingy title="cookie clicker">
              <iframe
                id="inlineFrameExample"
                title="Inline Frame Example"
                width="800"
                height="400"
                style={{ scale: 0.5, translate: "-200px -100px" }}
                src="https://orteil.dashnet.org/experiments/cookie/"
              ></iframe>
            </UiThingy>*/}
            <UiThingy title="time remaining">
              <TimerGame time={time} />
            </UiThingy>
            <UiThingy title="do not press">
              <button onClick={() => triggerRandomDebuff()}></button>
            </UiThingy>
            <UiThingy title="random event button">
              <button onClick={() => randomEvent()}></button>
            </UiThingy>
            {Object.entries(popups).map(([id, flavor]) => {
              let elem = <span></span>;
              const deleter = () => {
                setPopups(
                  Object.fromEntries(
                    Object.entries(popups).filter(([i]) => i !== id)
                  )
                );
              };
              switch (flavor) {
                case "scramble":
                  elem = <Scramble />;
                  break;
                case "bopit":
                  elem = <BopIt deleter={deleter} />;
                  break;
                case "musicBox":
                  elem = <MusicBox deleter={deleter}/>;
                  break;
                case "missingLetter":
                  //elem = <MissingLetter />;
                  break;
                case "captcha":
                  //elem = <Captcha />;
                  break;
                case "drawing":
                  elem = <Drawing deleter={deleter} />;
                  break;
                case "trivia":
                  //elem = <Trivia />;
                  break;
              }
              return <Fragment key={id}>{elem}</Fragment>;
            })}
          </div>
          <Keeb keyboard={keyboard} onKeyPress={onKeyPress} />

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
                    rotate: `${letter.rotation}deg`,
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
    </>
  );
}

function Keeb({
  keyboard,
  onKeyPress,
}: {
  keyboard: Record<string, Letter>;
  onKeyPress: (key: string) => void;
}) {
  return (
    <div
      style={{
        border: "1px white solid",
        height: "200px",
        width: "100%",
      }}
    >
      <svg width="100%" height="100%">
        <g>
          {Object.entries(keyboard)
            .filter(([_key, letter]) => letter.globallyPositioned === false)
            .map(([key, letter]) => (
              <g
                key={key}
                style={{
                  translate: `${letter.position[0]}% ${letter.position[1]}%`,
                  userSelect: "none",
                  cursor: "pointer",
                  rotate: `${letter.rotation}deg`,
                  transformOrigin: "25px 25px",
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
    </div>
  );
}

function TimerGame({ time }: { time: number }) {
  return <span>{time}</span>;
}

function UiThingy(props: PropsWithChildren<{ title?: string, width?: number }>) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const offsets = useRef<[number, number]>([
    (Math.random() - 0.5) * 600 + 800,
    Math.random() * 100,
  ]);

  useEffect(() => {}, []);

  return (
    <Draggable
      handle="strong"
      nodeRef={nodeRef}
      positionOffset={{ x: offsets.current[0], y: offsets.current[1] }}
    >
      <div
        style={{
          position: "absolute",
          background: "black",
          width: `${props.width ?? 100 }px`,
          pointerEvents: "all",
        }}
        ref={nodeRef}
      >
        <strong>
          <div style={{ background: "blue" }}>{props.title ?? "Drag me"}</div>
        </strong>
        <div>{props.children}</div>
      </div>
    </Draggable>
  );
}

function Scramble() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const wordArray = randomWord.split("");
  const scrambledWord = useRef(shuffle(wordArray));

  function shuffle(array: string[]) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
      return array;
    }
  }
  return <UiThingy title="Scramble"> {scrambledWord.current} </UiThingy>;
}

function BopIt({ deleter }: { deleter: () => void }) {
  const actions = ["Bop It!", "Twist It!", "Pull It!"] as const;
  const chosen = useRef(actions[Math.floor(Math.random() * actions.length)]);
  return (
    <UiThingy title={chosen.current}>
      <img width="100" height="200" src={bopitImage} />
      <button
        onClick={() => {
          if (chosen.current == "Bop It!") {
            deleter();
          }
        }}
      >
        bop
      </button>
      <button
        onClick={() => {
          if (chosen.current == "Twist It!") {
            deleter();
          }
        }}
      >
        twist
      </button>
      <button
        onClick={() => {
          if (chosen.current == "Pull It!") {
            deleter();
          }
        }}
      >
        pull
      </button>
    </UiThingy>
  );
}

function MusicBox({ deleter }: { deleter: () => void }) {
  const [time, setTime] = useState(200);
  const [timeLeft,setTime2] = useState(10);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setTime(time - 1);
      setTime2(timeLeft - 1)
    }, 1000);

    return () => {
      clearInterval(interval1);
    };
  }, [time, timeLeft]);

  if (timeLeft <= 0) {
    deleter();
  if (time == 0){
    deleter()
  }
  }
  return (
    <UiThingy title="Wind the box!" width={500}>
    <span>{timeLeft}s</span>
    <img width="500" height="200" src={puppetImage} />
    <button onClick={()=>{
      setTime2(Math.min(timeLeft + 5, 30))
    }}>wind</button>
  </UiThingy>
  )
}

function Drawing({ deleter }: { deleter: () => void }) {
  return (
    <UiThingy title="Draw a new PFP">
      <FabricJSCanvas onTimeout={deleter} />
    </UiThingy>
  );
}

export default App;
