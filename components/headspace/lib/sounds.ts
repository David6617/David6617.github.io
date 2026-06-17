export const OPEN_POLAROID_SOUND = "/open_polaroid.mp3";

let openPolaroidAudio: HTMLAudioElement | null = null;

export function playOpenPolaroidSound() {
  if (!openPolaroidAudio) {
    openPolaroidAudio = new Audio(OPEN_POLAROID_SOUND);
    openPolaroidAudio.preload = "auto";
  }

  openPolaroidAudio.currentTime = 0;
  void openPolaroidAudio.play().catch(() => {});
}
