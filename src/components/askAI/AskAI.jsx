import React, { useState, useRef, useEffect } from "react";
import { FiX, FiSend, FiZap, FiMessageSquare } from "react-icons/fi";
import styles from "./AskAI.module.css";

/* ── Static knowledge base (tied to dashboard data) ──────────── */
const KB = [
  {
    keys: ["hello", "hi ", "hey", "help"],
    answer:
      "Hi there! I can answer questions about your sales data — try asking about total sales, top regions, leading products, categories, or sales reps.",
  },
  {
    keys: ["total sales", "total revenue", "overall revenue", "overall sales"],
    answer:
      "Total sales across all 500 orders is **$618,850**.\n• South: $168,450 (27.2%)\n• West: $155,320 (25.1%)\n• East: $149,870 (24.2%)\n• North: $145,210 (23.5%)",
  },
  {
    keys: ["top region", "best region", "leading region", "region"],
    answer:
      "**South** is the top-performing region with $168,450 in total sales. West follows at $155,320. All four regions are fairly balanced.",
  },
  {
    keys: ["category", "electronics", "furniture"],
    answer:
      "**Electronics** leads with $338,240 (54.7% of revenue).\n**Furniture** accounts for $280,610 (45.3%).\nElectronics has a slight edge due to high-value Laptop and Phone orders.",
  },
  {
    keys: ["top product", "best product", "leading product", "product"],
    answer:
      "Top products by revenue:\n1. Laptop — $96,240\n2. Sofa — $87,350\n3. Phone — $72,180\n4. Desk — $58,920\n5. Cabinet — $43,650",
  },
  {
    keys: ["laptop"],
    answer:
      "**Laptop** is the #1 product with $96,240 in revenue. It's popular across all regions, with the highest single order at $19,599 (Reginald Wiggins, West).",
  },
  {
    keys: ["sales rep", "top rep", "best rep", "representative", "who sold"],
    answer:
      "Top sales reps by total revenue:\n1. Patrick Valdez — $42,800\n2. Rebecca Haas — $38,200\n3. Thomas Valenzuela — $35,600\n4. Brian Guzman — $33,400\n5. Kevin Harvey — $31,200",
  },
  {
    keys: ["month", "monthly", "trend", "january", "july", "peak"],
    answer:
      "Monthly sales trend for 2024:\n• Peak month: **July** at $64,300\n• Lowest: **February** at $43,800\n• The year shows an upward trend from Q1 → Q3, with a slight Q4 dip.",
  },
  {
    keys: ["order", "how many orders", "count", "total orders"],
    answer:
      "There are **500 total orders** in the dataset, spread across 4 regions (North, South, East, West) and 2 categories (Electronics, Furniture).",
  },
  {
    keys: ["units", "units sold", "how many units"],
    answer:
      "A total of **2,481 units** were sold across all orders. The average order size is ~4.96 units per order.",
  },
  {
    keys: ["north"],
    answer:
      "**North region** generated $145,210 in sales — the 4th ranked region. Top products: Laptop, Sofa, Phone. Top rep: Thomas Valenzuela.",
  },
  {
    keys: ["south"],
    answer:
      "**South region** is #1 with $168,450 in revenue. It has strong Electronics and Furniture performance with rep Patrick Valdez as standout.",
  },
  {
    keys: ["east"],
    answer:
      "**East region** generated $149,870, ranking 3rd. It shows strong Sofa and Laptop numbers with rep Rebecca Haas contributing significantly.",
  },
  {
    keys: ["west"],
    answer:
      "**West region** generated $155,320, ranking 2nd. Kevin Harvey's $15,558 Sofa order and Reginald Wiggins' $18,328 Laptop order were standout West sales.",
  },
];

const WELCOME =
  "Hello! I'm your **AI assistant** for this dashboard.\nAsk me anything about your sales data — regions, products, trends, reps, or totals.";

const FALLBACK =
  "I don't have a specific answer for that yet. Try asking about **total sales**, **top regions**, **leading products**, **categories**, or **sales reps**.";

/* ── Response engine ─────────────────────────────────────────── */
function getResponse(input) {
  const q = input.toLowerCase();
  for (const entry of KB) {
    if (entry.keys.some((k) => q.includes(k))) return entry.answer;
  }
  return FALLBACK;
}

/* ── Render bold markdown (**text**) ────────────────────────── */
function renderText(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

/* ── Typing dots ─────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className={styles.typingWrap}>
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "ai", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  /* Focus input when panel opens */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  /* Auto-scroll to latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  function send() {
    const text = input.trim();
    if (!text || thinking) return;

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const answer = getResponse(text);
      setMessages((m) => [...m, { role: "ai", text: answer }]);
      setThinking(false);
    }, 900);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* ── Chat panel ── */}
      <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerIcon}>
              <FiZap size={14} />
            </span>
            <span className={styles.headerTitle}>Ask AI</span>
            <span className={styles.headerSub}>Sales Assistant</span>
          </div>
          <button className={styles.closeBtn} onClick={() => setOpen(false)}>
            <FiX size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`${styles.msg} ${
                msg.role === "user" ? styles.msgUser : styles.msgAI
              }`}
            >
              {msg.role === "ai" && (
                <span className={styles.aiAvatar}>
                  <FiZap size={11} />
                </span>
              )}
              <div className={styles.bubble}>
                {msg.text.split("\n").map((line, j) => (
                  <span key={j}>
                    {renderText(line)}
                    {j < msg.text.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {thinking && (
            <div className={`${styles.msg} ${styles.msgAI}`}>
              <span className={styles.aiAvatar}>
                <FiZap size={11} />
              </span>
              <div className={styles.bubble}>
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested prompts (visible only when no user message yet) */}
        {messages.length === 1 && (
          <div className={styles.suggestions}>
            {[
              "What are total sales?",
              "Top region?",
              "Best product?",
              "Top sales reps?",
            ].map((s) => (
              <button
                key={s}
                className={styles.chip}
                onClick={() => {
                  setInput(s);
                  setTimeout(() => inputRef.current?.focus(), 50);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className={styles.inputBar}>
          <input
            ref={inputRef}
            className={styles.textInput}
            placeholder="Ask about sales, regions, products…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button
            className={styles.sendBtn}
            onClick={send}
            disabled={!input.trim() || thinking}
          >
            <FiSend size={14} />
          </button>
        </div>
      </div>

      {/* ── Floating action button ── */}
      <button
        className={`${styles.fab} ${open ? styles.fabActive : ""}`}
        onClick={() => setOpen((v) => !v)}
        title="Ask AI"
      >
        {open ? <FiX size={22} /> : <FiMessageSquare size={22} />}
        {!open && <span className={styles.pulse} />}
      </button>
    </>
  );
}
