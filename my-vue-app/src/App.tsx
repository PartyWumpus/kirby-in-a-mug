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
import puppety from "./assets/abababababa.mp3";
import bopitImage from "./assets/bopit.webp";
import clippy from "./assets/clip.webp";
import hackathing from "./assets/hackathing .mp3";
import hourglass from "./assets/hourglass.gif";
import puppetImage from "./assets/puppet.webp";
import boppyStart from "./assets/boppy.mp3";
import boppyEnd from "./assets/boppy2.mp3";
import twistyStart from "./assets/twisty.mp3";
import twistyEnd from "./assets/twisty2.mp3";
import pullyStart from "./assets/pully.mp3";
import pullyEnd from "./assets/pully2.mp3";
import { FabricJSCanvas } from "./DrawableCanvas";
import * as myTheme from "./theme";
import "./theme/index.css";
import { words } from "./words";

type Letter = {
  symbol: string;
  offset: [0, 0];
  globallyPositioned: boolean;
  rotation?: number;
  row: number;
};

const appId = "tYrKVjrQ";
const conversationId = "the_convo";

const eventList = [
  "scramble",
  "scramble",
  "scramble",
  "scramble",
  "scramble",
  "bopit",
  "bopit",
  "bopit",
  "bopit",
  "bopit",
  "bopit",
  "musicBox",
  "missingLetter",
  "missingLetter",
  "missingLetter",
  "missingLetter",
  "drawing",
] as const;

const debuffList = ["swapKeys", "rotateKey", "hideCursor"] as const;

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

setInterval(() => {
  if (Math.random() >= 0.95) {
    window.document.body.style.transition = "rotate 2.5s linear";
    if (window.document.body.style.rotate !== "360deg") {
      window.document.body.style.rotate = "360deg";
    } else {
      window.document.body.style.rotate = "0deg";
    }
  }
}, 8000);

function App() {
  const [username, setUsername] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [time, setTime] = useState(120);
  const [bannedKey, setBan] = useState<string>("");
  const [popups, setPopups] = useState<
    Record<string, [(typeof eventList)[number], Record<string, string>]>
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
        let data = {};
        if (newEvent === "scramble") {
          const randomWord = words[Math.floor(Math.random() * words.length)];
          data = { word: randomWord };
        }
        sessionRef
          .current!.conversation(conversationId)
          .send({ text: newEvent, custom: data });
      }
    }, 15000);

    return () => {
      clearInterval(interval1);
    };
  }, [username]);

  function punish(penalty: number) {
    setTime(time - penalty);
  }

  const [keyboard, setKeyboard] = useState<Record<string, Letter>>({
    q: { symbol: "q", offset: [0, 0], globallyPositioned: false, row: 0 },
    w: { symbol: "w", offset: [0, 0], globallyPositioned: false, row: 0 },
    e: { symbol: "e", offset: [0, 0], globallyPositioned: false, row: 0 },
    r: { symbol: "r", offset: [0, 0], globallyPositioned: false, row: 0 },
    t: { symbol: "t", offset: [0, 0], globallyPositioned: false, row: 0 },
    y: { symbol: "y", offset: [0, 0], globallyPositioned: false, row: 0 },
    u: { symbol: "u", offset: [0, 0], globallyPositioned: false, row: 0 },
    i: { symbol: "i", offset: [0, 0], globallyPositioned: false, row: 0 },
    o: { symbol: "o", offset: [0, 0], globallyPositioned: false, row: 0 },
    p: { symbol: "p", offset: [0, 0], globallyPositioned: false, row: 0 },

    a: { symbol: "a", offset: [0, 0], globallyPositioned: false, row: 1 },
    s: { symbol: "s", offset: [0, 0], globallyPositioned: false, row: 1 },
    d: { symbol: "d", offset: [0, 0], globallyPositioned: false, row: 1 },
    f: { symbol: "f", offset: [0, 0], globallyPositioned: false, row: 1 },
    g: { symbol: "g", offset: [0, 0], globallyPositioned: false, row: 1 },
    h: { symbol: "h", offset: [0, 0], globallyPositioned: false, row: 1 },
    j: { symbol: "j", offset: [0, 0], globallyPositioned: false, row: 1 },
    k: { symbol: "k", offset: [0, 0], globallyPositioned: false, row: 1 },
    l: { symbol: "l", offset: [0, 0], globallyPositioned: false, row: 1 },
    " ": { symbol: "␣", offset: [0, 0], globallyPositioned: false, row: 1 },

    z: { symbol: "z", offset: [0, 0], globallyPositioned: false, row: 2 },
    x: { symbol: "x", offset: [0, 0], globallyPositioned: false, row: 2 },
    c: { symbol: "c", offset: [0, 0], globallyPositioned: false, row: 2 },
    v: { symbol: "v", offset: [0, 0], globallyPositioned: false, row: 2 },
    b: { symbol: "b", offset: [0, 0], globallyPositioned: false, row: 2 },
    n: { symbol: "n", offset: [0, 0], globallyPositioned: false, row: 2 },
    m: { symbol: "m", offset: [0, 0], globallyPositioned: false, row: 2 },
    ".": { symbol: ".", offset: [0, 0], globallyPositioned: false, row: 2 },
    "?": { symbol: "?", offset: [0, 0], globallyPositioned: false, row: 2 },
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
      case "hideCursor": {
        document.documentElement.style.cursor = "none";
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

  useEffect(() => {
    let audio = new Audio(hackathing);
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
    };
  }, [username]);

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
              [crypto.randomUUID()]: [
                eventType as (typeof eventList)[number],
                lastMessage.custom,
              ],
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
    setPopups({ ...popups, [crypto.randomUUID()]: [newEvent, {}] });
  }

  useEffect(() => {
    // Jank!
    const interval = setInterval(() => {
      const x = document.querySelector<HTMLDivElement>(".t-editor > div"); // <- Jank
      if (x !== null) {
        x.contentEditable = "false";
      }

      const a = document.querySelector<HTMLDivElement>(".t-chatbox-content");
      if (a !== null && !a.classList.contains("window")) {
        a.className += " window";
        a.insertAdjacentHTML(
          "afterbegin",
          `<div class="title-bar">
        <div class="title-bar-text">Chat</div>
      </div>`
        );
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
                <Gambler punish={punish} />
                <Clippy />

                {Object.entries(popups).map(([id, [flavor, data]]) => {
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
                      elem = <Scramble deleter={deleter} data={data} />;
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
                    case "drawing":
                      elem = <Drawing deleter={deleter} />;
                      break;
                  }
                  return <Fragment key={id}>{elem}</Fragment>;
                })}
              </>
            ) : undefined}
          </div>
          <Keeb keyboard={keyboard} onKeyPress={onKeyPress} />
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
    if (
      list[0] === "x" &&
      list[0] === list[1] &&
      list[1] === list[2] &&
      list[2] === list[3] &&
      list[3] === list[4]
    ) {
      punish(50);
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
    <div style={{ marginTop: "15px" }} className="window">
      <div className="title-bar">
        <div className="title-bar-text">Keyboard</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        className="window-body"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "98%",
            gap: "1%",
            justifyContent: "space-evenly",
          }}
        >
          {Object.entries(keyboard)
            .filter(([_key, letter]) => letter.row === 0)
            .map(([key, letter]) => (
              <button
                key={key}
                style={{
                  translate: `${letter.offset[0]}px ${letter.offset[1]}px`,
                  userSelect: "none",
                  cursor: "pointer",
                  rotate: `${letter.rotation}deg`,
                  transformOrigin: "25px 25px",
                  width: "50px",
                  fontSize: "22px",
                  height: "50px",
                }}
                onClick={() => {
                  onKeyPress(key);
                }}
              >
                {letter.symbol}
              </button>
            ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "98%",
            gap: "1%",
            justifyContent: "space-evenly",
          }}
        >
          {Object.entries(keyboard)
            .filter(([_key, letter]) => letter.row === 1)
            .map(([key, letter]) => (
              <button
                key={key}
                style={{
                  translate: `${letter.offset[0]}px ${letter.offset[1]}px`,
                  userSelect: "none",
                  cursor: "pointer",
                  rotate: `${letter.rotation}deg`,
                  transformOrigin: "25px 25px",
                  width: "50px",
                  fontSize: "22px",
                  height: "50px",
                }}
                onClick={() => {
                  onKeyPress(key);
                }}
              >
                {letter.symbol}
              </button>
            ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "98%",
            gap: "1%",
            justifyContent: "space-evenly",
          }}
        >
          {Object.entries(keyboard)
            .filter(([_key, letter]) => letter.row === 2)
            .map(([key, letter]) => (
              <button
                key={key}
                style={{
                  translate: `${letter.offset[0]}px ${letter.offset[1]}px`,
                  userSelect: "none",
                  cursor: "pointer",
                  rotate: `${letter.rotation}deg`,
                  transformOrigin: "center",
                  width: "50px",
                  fontSize: "22px",
                  height: "50px",
                }}
                onClick={() => {
                  onKeyPress(key);
                }}
              >
                {letter.symbol}
              </button>
            ))}
        </div>
      </div>
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
        nodeRef.current!.style.zIndex = `${
          globalCounter++ + (props.onTop ? globalCounter : 0)
        }`;
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
  data,
}: {
  deleter: (x: number) => void;
  data: Record<string, string>;
}) {
  console.log(data);
  const randomWord = useRef(
    data["word"] ?? words[Math.floor(Math.random() * words.length)]
  );
  const scrambledWord = useRef(shuffle(randomWord.current.split(""))!.join(""));
  while (scrambledWord.current === randomWord.current) {
    scrambledWord.current = shuffle(randomWord.current.split(""))!.join("");
  }

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
  }, [deleter]);

  return <UiThingy title="Scramble"> {scrambledWord.current} </UiThingy>;
}

function BopIt({ deleter }: { deleter: (x: number) => void }) {
  const actions = ["Bop It!", "Twist It!", "Pull It!"] as const;
  const chosen = useRef(actions[Math.floor(Math.random() * actions.length)]);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (hasPlayed.current === false) {
      
      let audio = new Audio(boppyStart);
      if (chosen.current == "Twist It!"){audio = new Audio(twistyStart)}
      if (chosen.current == "Pull It!"){audio = new Audio(pullyStart)}
      audio.play();
      hasPlayed.current = true  
    }
  }, [])

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
          let audio = new Audio(boppyEnd);
          audio.play();
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
          let audio = new Audio(twistyEnd);
          audio.play()
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
          let audio = new Audio(pullyEnd);
          audio.play()
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
  const hasPlayed = useRef(false);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setTime(time - 1);
      setTime2(timeLeft - 0.1);
    }, 100);

    return () => {
      clearInterval(interval1);
    };
  }, [time, timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0 && hasPlayed.current === false) {
      let audio = new Audio(puppety);
      audio.play();
      hasPlayed.current = true

    }
  }, [timeLeft]);

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
      <Progress max={20} current={timeLeft} />
      <img width="480" height="200" src={puppetImage} />
      <button
        onClick={() => {
          setTime2(Math.min(timeLeft + 2, 20));
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
    "This is what comp sci does to people!",
    "Let's go gambling!",
    "I miss my wife",
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
        <img src={clippy} height="60%" width="100%"></img>
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

export default App;
