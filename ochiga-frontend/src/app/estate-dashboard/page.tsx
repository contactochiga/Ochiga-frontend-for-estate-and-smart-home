const handleSend = (text?: string) => {
  const message = (text ?? input).trim();
  if (!message) return;

  const userMsg: ChatMessage = {
    role: "user",
    content: message,
    panel: null,
    id: createId(),
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  };

  setMessages(prev => [...prev, userMsg]);
  setInput("");

  setTimeout(() => {
    const panel = detectEstatePanelType(message);

    if (panel) {
      const index = messages.findIndex(m => m.panel === panel);

      if (index !== -1) {
        // PANEL EXISTS → MOVE TO BOTTOM
        let existingMsg = messages[index];

        // Update timestamp
        existingMsg = {
          ...existingMsg,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        };

        // Remove it from old location + reinsert at bottom
        setMessages(prev => {
          const arr = prev.filter(m => m.id !== existingMsg.id);
          return [...arr, existingMsg];
        });

        // Bounce animation
        setTimeout(() => {
          const el = document.querySelector(`[data-id='${existingMsg.id}']`);
          if (el) {
            el.classList.add("bounce-panel");
            setTimeout(() => el.classList.remove("bounce-panel"), 700);
          }
        }, 50);

        // Scroll to bottom
        setTimeout(() => {
          chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth"
          });
        }, 150);

        return; // IMPORTANT: do NOT generate reply
      }
    }

    // Otherwise: create NEW panel reply
    let reply = "Okay — processed your request.";
    if (panel === "estate_devices") reply = "Estate device panel opened.";
    if (panel === "estate_power") reply = "Estate power control panel opened.";
    if (panel === "estate_accounting") reply = "Estate accounting panel opened.";
    if (panel === "estate_community") reply = "Estate community panel opened.";

    const assistantMsg: ChatMessage = {
      role: "assistant",
      content: reply,
      panel,
      id: createId(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, assistantMsg]);

    setTimeout(() => {
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth"
      });
    }, 200);
  }, 200);
};
