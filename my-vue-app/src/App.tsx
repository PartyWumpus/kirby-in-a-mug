import "98.css";
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
import puppetJumpscare from "./assets/anobg.gif";
import bopitImage from "./assets/bopit.webp";
import clippy from "./assets/clipy.jpeg";
import hourglass from "./assets/hourglass.gif";
import puppetImage from "./assets/puppet.webp";
import clippy from "./assets/clip.webp";
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

const debuffList = [
  "swapKeys",
  "rotateKey",
  "changeFont",
  //      "hideSymbol",
  //      "hideCursor",
] as const;

declare global {
  var sentMessage: () => void;
}

let globalCounter = 0;

const messageListeners: Record<string, (x: string) => void> = {};

globalThis.sentMessage = () => {
  const x = document.querySelector<HTMLParagraphElement>(
    ".t-editor > div > p"
  )!;
  Object.values(messageListeners).forEach((a) => a(x.textContent));
};

function App() {
  const [username, setUsername] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [time, setTime] = useState(2);
  const [bannedKey, setBan] = useState<string>("");
  const [popups, setPopups] = useState<
    Record<string, (typeof eventList)[number]>
  >({});

  const [gameOver, setGameOver] = useState(false);

  const chatboxRef = useRef<ChatboxRef>(null);
  const sessionRef = useRef<TalkSession>(null);
  const messageIdRef = useRef<string>("not-an-id");
  useEffect(() => {
    const interval1 = setInterval(() => {
      if (time <= 0 && gameOver === false) {
        sessionRef
          .current!.conversation(conversationId)
          .participant(sessionRef.current!.currentUser)
          .delete();
        setGameOver(true);
        clearInterval(interval1);
        setTime(0);
      } else if (gameOver === false) {
        setTime(time - 1);
      }
    }, 1500);

    return () => {
      clearInterval(interval1);
    };
  }, [time, gameOver]);

  useEffect(() => {
    const interval1 = setInterval(() => {
      if (username === "server") {
        const newEvent =
          eventList[Math.floor(Math.random() * eventList.length)];
        sessionRef
          .current!.conversation(conversationId)
          .send({ text: newEvent });
      }
    }, 5000);

    return () => {
      clearInterval(interval1);
    };
  }, [username]);

  function punish(penalty: number) {
    setTime(time - penalty);
  }

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
      case "changeFont": {
        window.document.body.style.fontFamily = "cursive !important";
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

    const conversation = session.conversation(conversationId);
    conversation.createIfNotExists();

    globalThis.wawa = async (blob: Blob) => {
      const fileToken = await session.uploadImage(blob, {
        filename: "pfp.png",
        width: 80,
        height: 80,
      });

      conversation.send({
        content: [{ type: "file", fileToken }],
      });
    };

    setUsername(username);
  }

  useEffect(() => {
    if (sessionRef.current) {
      const conversation = sessionRef.current!.conversation(conversationId);
      conversation.createIfNotExists();
      const subscriber = conversation.subscribeMessages((a) => {
        if (a !== null) {
          const lastMessage = a[0];
          if (
            lastMessage.sender?.id === sessionRef.current!.currentUser.id &&
            lastMessage.content[0]?.type === "file" &&
            lastMessage.content[0].filename === "pfp.png"
          ) {
            sessionRef.current!.currentUser.set({
              photoUrl: lastMessage.content[0].url,
            });
          }

          if (
            lastMessage.sender?.name === "server" &&
            lastMessage.content[0]?.type === "text" &&
            messageIdRef.current != lastMessage.id
          ) {
            messageIdRef.current = lastMessage.id;
            const eventType = lastMessage.plaintext;
            setPopups({
              ...popups,
              [crypto.randomUUID()]: eventType as (typeof eventList)[number],
            });
          }
        }
      });
      return () => {
        subscriber.unsubscribe();
      };
    }
  }, [popups, username]);

  function randomEvent() {
    const newEvent = eventList[Math.floor(Math.random() * eventList.length)];
    setPopups({ ...popups, [crypto.randomUUID()]: newEvent });
  }

  useEffect(() => {
    // Jank!
    const interval = setInterval(() => {
      const x = document.querySelector<HTMLDivElement>(".t-editor > div"); // <- Jank
      if (x !== null) {
        x.contentEditable = "false";
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  function onKeyPress(key: string) {
    if (key === bannedKey) {
      punish(5);
    }
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

            <TimerGame time={time} />
            {gameOver === false ? (
              <>
                <UiThingy title="do not press">
                  <button onClick={() => triggerRandomDebuff()}></button>
                </UiThingy>
                <UiThingy title="random event button">
                  <button onClick={() => randomEvent()}></button>
                </UiThingy>
                <Gambler punish={punish} />
                <Clippy />

                {Object.entries(popups).map(([id, flavor]) => {
                  let elem = <span></span>;
                  const deleter = (x?: number) => {
                    setPopups(
                      Object.fromEntries(
                        Object.entries(popups).filter(([i]) => i !== id)
                      )
                    );
                    setTime(time + (x ?? 0));
                    setScore(score + Math.max(x ?? 0, 0));
                  };
                  switch (flavor) {
                    case "scramble":
                      elem = <Scramble deleter={deleter} />;
                      break;
                    case "bopit":
                      elem = <BopIt deleter={deleter} />;
                      break;
                    case "musicBox":
                      elem = <MusicBox deleter={deleter} />;
                      break;
                    case "missingLetter":
                      elem = (
                        <MissingLetter deleter={deleter} setBan={setBan} />
                      );
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
              </>
            ) : undefined}
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

function Gambler({ punish }: { punish: (x: number) => void }) {
  const [gambleys, setGambles] = useState(["x", "o", "x", "o", "x"]);

  function gamble() {
    let list = [];
    punish(5);
    for (let i = 0; i < 5; i++) {
      if (Math.random() >= 0.5) {
        list.push("o");
      } else {
        list.push("x");
      }
    }
    if (
      list[0] === "o" &&
      list[0] === list[1] &&
      list[1] === list[2] &&
      list[2] === list[3] &&
      list[3] === list[4]
    ) {
      punish(-100);
    }
    if (list[0] === "x" && list[0] === list[1] && list[1] === list[2] && list[2] === list[3] && list[3] === list[4]) {
      punish(50)
    }
    setGambles(list);
  }

  return (
    <UiThingy title="lets go gambling!">
      <div> {gambleys[0]} </div>
      <div> {gambleys[1]} </div>
      <div> {gambleys[2]} </div>
      <div> {gambleys[3]} </div>
      <div> {gambleys[4]} </div>
      <button onClick={() => gamble()}>-5 seconds</button>
    </UiThingy>
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
    <div style={{}} className="window">
      <div className="title-bar">
        <div className="title-bar-text">Keyboard</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <svg width="100%" height="100%" className="window-body">
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
  return (
    <UiThingy title="time remaining" warning={time < 45} onTop={time < 20}>
      <span>{time}</span>
      <img src={hourglass} height="20px" />
    </UiThingy>
  );
}

function UiThingy(
  props: PropsWithChildren<{
    title?: string;
    width?: number;
    warning?: boolean;
    onClose?: () => void;
    onTop?: boolean;
  }>
) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const offsets = useRef<[number, number]>([
    (Math.random() - 0.5) * 600 + 800,
    Math.random() * 100,
  ]);

  return (
    <Draggable
      handle=".title-bar"
      nodeRef={nodeRef}
      positionOffset={{ x: offsets.current[0], y: offsets.current[1] }}
      onStart={() => {
        nodeRef.current!.style.zIndex = `${globalCounter++ + (props.onTop ? globalCounter : 0)}`;
      }}
    >
      <div
        style={{
          position: "absolute",
          width: `${props.width ?? 150}px`,
          pointerEvents: "all",
        }}
        className="window"
        ref={nodeRef}
      >
        <div
          className="title-bar"
          style={{
            transition: "filter 100ms linear",
            animation:
              props.warning === true ? "flash 1s step-start infinite" : "",
          }}
        >
          <div className="title-bar-text" style={{ userSelect: "none" }}>
            {props.title ?? "drag me"}
          </div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" onClick={() => props?.onClose?.()} />
          </div>
        </div>
        <div className="window-body">{props.children}</div>
      </div>
    </Draggable>
  );
}

function Scramble({
  deleter,
  sessionRef,
}: {
  deleter: (x: number) => void;
  sessionRef: TalkSession;
}) {
  const randomWord = useRef(words[Math.floor(Math.random() * words.length)]);
  const scrambledWord = useRef(shuffle(shuffle(randomWord.current.split(""))!));

  useEffect(() => {
    const id = crypto.randomUUID();
    messageListeners[id] = (str) => {
      if (str.includes(randomWord.current)) {
        deleter(20);
      }
    };
    return () => {
      delete messageListeners[id];
    };
  }, [sessionRef, deleter]);

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

function BopIt({ deleter }: { deleter: (x: number) => void }) {
  const actions = ["Bop It!", "Twist It!", "Pull It!"] as const;
  const chosen = useRef(actions[Math.floor(Math.random() * actions.length)]);
  return (
    <UiThingy title={chosen.current} width={180}>
      <img width="160" height="200" src={bopitImage} />
      <button
        onClick={() => {
          if (chosen.current == "Bop It!") {
            deleter(30);
          } else {
            deleter(-10);
          }
        }}
      >
        bop
      </button>
      <button
        onClick={() => {
          if (chosen.current == "Twist It!") {
            deleter(30);
          } else {
            deleter(-10);
          }
        }}
      >
        twist
      </button>
      <button
        onClick={() => {
          if (chosen.current == "Pull It!") {
            deleter(29);
          } else {
            deleter(-10);
          }
        }}
      >
        pull
      </button>
    </UiThingy>
  );
}

function MusicBox({ deleter }: { deleter: (x: number) => void }) {
  const [time, setTime] = useState(200);
  const [timeLeft, setTime2] = useState(10);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setTime(time - 1);
      setTime2(timeLeft - 0.1);
    }, 100);

    return () => {
      clearInterval(interval1);
    };
  }, [time, timeLeft]);

  if (timeLeft <= 0) {
    setTimeout(() => deleter(-30), 1000);
    return (
      <img
        style={{
          zIndex: 9999,
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
        }}
        src={puppetJumpscare}
      />
    );
  }

  if (time <= 0) {
    deleter(20);
  }

  return (
    <UiThingy title="Wind the box!" width={500}>
      <Progress max={30} current={timeLeft} />
      <img width="480" height="200" src={puppetImage} />
      <button
        onClick={() => {
          setTime2(Math.min(timeLeft + 2, 30));
        }}
      >
        wind
      </button>
    </UiThingy>
  );
}

function Clippy() {
  const [time, setTime] = useState(2);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval1 = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => {
      clearInterval(interval1);
    };
  }, [time]);

  const clippyPhrases = [
    "Kill Yourself!",
    "It works on my machine!",
    "Don't forget to wind the music box!",
    "Have you eaten today?",
    "I'm Clipping It.",
    "Chat can somebody clippy that?",
    "Would you like help typing?",
    "I hope you have a cliptastic day!",
    "Please give me your toenail clippings.",
    "This is beyond my generation.",
    "Would you like to send a fax?",
    "Please refill your printer ink!",
    "Who needs AI when you have Clippy!",
  ];
  const clippyPhrase = useRef(
    clippyPhrases[Math.floor(Math.random() * clippyPhrases.length)]
  );

  if (count > 2) {
    setCount(0);
    setTime(30);
    return <></>;
  }

  if (time <= 0) {
    return (
      <UiThingy
        key={count}
        title="Help from Clippy!"
        onClose={() => {
          setCount(count + 1);
          clippyPhrase.current =
            clippyPhrases[Math.floor(Math.random() * clippyPhrases.length)];
        }}
      >
        Clippy Says: {clippyPhrase.current}
        <img src={clippy} height= "60%" width= "100%"></img>
      </UiThingy>
    );
  }
}

function Drawing({ deleter }: { deleter: () => void }) {
  return (
    <UiThingy title="Draw a new PFP">
      <FabricJSCanvas onTimeout={deleter} />
    </UiThingy>
  );
}

export function Progress({ max, current }: { max: number; current: number }) {
  const progressPercent = (current / max) * 100;
  return (
    <div className="progress-indicator segmented">
      <span
        className="progress-indicator-bar"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
}

function MissingLetter({
  deleter,
  setBan,
}: {
  deleter: (x: number) => void;
  setBan: (x: string) => void;
}) {
  const letterList = ["e", "t", "a", "o", "i", "n", "s", "h", "r", "l"];
  const randomLetter = useRef(
    letterList[Math.floor(Math.random() * letterList.length)]
  );
  const [time, setTime] = useState(30);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => {
      clearInterval(interval1);
    };
  }, [time]);

  useEffect(() => {
    setBan(randomLetter.current);

    return () => {
      setBan("");
    };
  }, []);

  if (time <= 0) {
    deleter(30);
  }

  return (
    <UiThingy title="disabled letter">
      <span>{time}s</span>
      <br />
      <span>{randomLetter.current} is disabled</span>
    </UiThingy>
  );
}

export default App;
