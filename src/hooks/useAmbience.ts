import { useCallback, useEffect, useRef, useState } from "react";

type AudioBundle = {
  ctx: AudioContext;
  master: GainNode;
  timer: number;
};

const CHIME_NOTES = [523.25, 659.25, 783.99, 659.25, 587.33, 987.77];

/**
 * A very light ambient bed: a low warm drone with an occasional soft chime.
 * Nothing plays until the visitor explicitly switches sound on.
 */
export function useAmbience() {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<AudioBundle | null>(null);

  const playChime = useCallback((ctx: AudioContext, destination: AudioNode) => {
    const now = ctx.currentTime;
    const startIndex = Math.floor(Math.random() * CHIME_NOTES.length);

    [0, 1, 2].forEach((step) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      const frequency = CHIME_NOTES[(startIndex + step * 2) % CHIME_NOTES.length];
      const start = now + step * 0.42;

      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.05, start + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 3.2);

      oscillator.connect(gain);
      gain.connect(destination);
      oscillator.start(start);
      oscillator.stop(start + 3.4);
    });
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audioRef.current = null;
    window.clearInterval(audio.timer);
    const { ctx, master } = audio;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setTargetAtTime(0.0001, now, 0.3);
    window.setTimeout(() => {
      void ctx.close().catch(() => undefined);
    }, 1100);
    setEnabled(false);
  }, []);

  const start = useCallback(async () => {
    if (audioRef.current) return;

    const AudioCtor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioCtor) return;

    try {
      const ctx = new AudioCtor();
      await ctx.resume();

      const master = ctx.createGain();
      master.gain.value = 0.0001;
      master.connect(ctx.destination);
      master.gain.setTargetAtTime(0.7, ctx.currentTime, 0.8);

      const drone = ctx.createOscillator();
      const droneGain = ctx.createGain();
      drone.type = "sine";
      drone.frequency.value = 130.81;
      droneGain.gain.value = 0.022;
      drone.connect(droneGain);
      droneGain.connect(master);
      drone.start();

      playChime(ctx, master);
      const timer = window.setInterval(() => playChime(ctx, master), 8500);

      audioRef.current = { ctx, master, timer };
      setEnabled(true);
    } catch {
      // Audio is an enhancement; fail quietly.
    }
  }, [playChime]);

  const toggle = useCallback(() => {
    if (audioRef.current) {
      stop();
    } else {
      void start();
    }
  }, [start, stop]);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (!audio) return;
      audioRef.current = null;
      window.clearInterval(audio.timer);
      void audio.ctx.close().catch(() => undefined);
    };
  }, []);

  return { enabled, toggle };
}
