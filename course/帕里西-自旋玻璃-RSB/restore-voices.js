// Restore this course's TTS voice assignments after importing it into OpenMAIC.
//
// Why this is needed: OpenMAIC's .maic export/import does not carry per-agent
// voiceConfig (the export omits the field, the import never reads it), so the
// discussion-agent voices reset to fallback after import. This script writes the
// intended config back into localStorage. See voice-config.json for the values.
//
// How to run:
//   1. Open the browser tab running OpenMAIC (e.g. http://localhost:3000)
//   2. DevTools → Console → paste this whole file → Enter
//   3. Reload the page
//
// Caveat: if the per-agent voices revert again after reload, your OpenMAIC build
// lacks the default-agent voiceConfig persistence fix in the registry store merge.

(() => {
  const PROVIDER = 'openai-tts';
  const AGENT_VOICES = { 'default-3': 'nova', 'default-4': 'alloy', 'default-6': 'shimmer' };
  const GLOBAL_VOICE = 'echo';

  const reg = JSON.parse(localStorage.getItem('agent-registry-storage') || 'null');
  const agents = reg?.state?.agents;
  if (!agents) {
    console.error('[restore-voices] agent-registry-storage not ready — open the app first, then rerun.');
    return;
  }
  for (const [id, voiceId] of Object.entries(AGENT_VOICES)) {
    if (!agents[id]) {
      console.warn(`[restore-voices] agent ${id} not present, skipping`);
      continue;
    }
    agents[id].voiceConfig = { providerId: PROVIDER, voiceId };
    console.log(`[restore-voices] ${id} → ${voiceId}`);
  }
  localStorage.setItem('agent-registry-storage', JSON.stringify(reg));

  const set = JSON.parse(localStorage.getItem('settings-storage') || 'null');
  if (set?.state) {
    set.state.ttsVoice = GLOBAL_VOICE;
    localStorage.setItem('settings-storage', JSON.stringify(set));
    console.log(`[restore-voices] global ttsVoice → ${GLOBAL_VOICE}`);
  } else {
    console.warn('[restore-voices] settings-storage not found — set the TTS voice to echo manually in Settings.');
  }

  console.log('[restore-voices] Done. Reload the page.');
})();
