export const speak = (text: string) => {
  try {
    const synth = window.speechSynthesis;
    if (synth && !synth.speaking) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-US";
      utter.rate = 1;
      synth.speak(utter);
    }
  } catch (err) {
    console.warn("speech synth error", err);
  }
};
