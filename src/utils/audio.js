// Futuristic UI Sound Effects powered by Web Audio API
// Instant zero-latency synthesis with no external file dependencies

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('abhay_portfolio_sound');
      if (saved !== null) {
        this.muted = saved === 'false';
      }
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.muted = !this.muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('abhay_portfolio_sound', (!this.muted).toString());
    }
    if (!this.muted) {
      this.playToggle(true);
    }
    return !this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Liquid bubble toggle sound (sweeping frequency with soft resonance)
  playToggle(isDay = false) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isDay ? 2200 : 1800, t);

      // Pitch sweep up for day (sun rise), pitch sweep down for night (moon rise)
      if (isDay) {
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(740, t + 0.14);
      } else {
        osc.frequency.setValueAtTime(640, t);
        osc.frequency.exponentialRampToValueAtTime(280, t + 0.16);
      }

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.24);

      // Subtle overtone sparkle
      const spark = this.ctx.createOscillator();
      const sparkGain = this.ctx.createGain();
      spark.type = 'triangle';
      spark.frequency.setValueAtTime(isDay ? 1200 : 960, t + 0.04);
      spark.frequency.exponentialRampToValueAtTime(isDay ? 1800 : 700, t + 0.18);
      sparkGain.gain.setValueAtTime(0.001, t);
      sparkGain.gain.linearRampToValueAtTime(0.05, t + 0.05);
      sparkGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);

      spark.connect(sparkGain);
      sparkGain.connect(this.ctx.destination);
      spark.start(t + 0.02);
      spark.stop(t + 0.22);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Crisp futuristic glass click for links / buttons
  playClick() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.06);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.08);
    } catch {}
  }

  // Harmonic chord chime for interactive node inspection
  playChime(nodeIndex = 0) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const baseFreqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chord notes
      const freq = baseFreqs[nodeIndex % baseFreqs.length];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.12);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.26);
    } catch {}
  }

  // Soft crystalline tick on hover
  playHover() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, t);
      osc.frequency.exponentialRampToValueAtTime(1800, t + 0.03);

      gain.gain.setValueAtTime(0.02, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch {}
  }
}

export const sounds = new SoundEngine();
