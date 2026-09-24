export interface NotePayload {
  name?: string;
  message: string;
  page: 'Playground';
  timestamp: string;
}

export interface SubmitResult {
  success: boolean;
  error?: string;
  mode: 'endpoint' | 'local';
}

/**
 * Isolated submission handler for Playground sticky notes.
 *
 * When a backend endpoint (e.g. VITE_NOTE_ENDPOINT_URL or /api/notes) is provided,
 * it delivers the payload directly.
 *
 * If no remote endpoint is connected, it stores the note cleanly in local storage
 * without claiming or faking that an external email was sent across the wire.
 */
export async function submitPlaygroundNote(
  note: Omit<NotePayload, 'page' | 'timestamp'>
): Promise<SubmitResult> {
  const payload: NotePayload = {
    name: note.name?.trim() ? note.name.trim() : undefined,
    message: note.message.trim(),
    page: 'Playground',
    timestamp: new Date().toISOString(),
  };

  const endpoint = import.meta.env.VITE_NOTE_ENDPOINT_URL;

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Endpoint returned status ${response.status}`);
      }

      return { success: true, mode: 'endpoint' };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Submission failed';
      console.warn('Note endpoint submission error:', message);
      return { success: false, error: message, mode: 'endpoint' };
    }
  }

  // Local persistence mode when no remote backend is connected
  try {
    const key = 'sanjana_playground_notes';
    const raw = localStorage.getItem(key);
    const existing: NotePayload[] = raw ? JSON.parse(raw) : [];
    existing.unshift(payload);
    // Keep up to 20 recent notes in the visitor's browser session
    localStorage.setItem(key, JSON.stringify(existing.slice(0, 20)));
  } catch (err) {
    console.warn('Could not store note locally:', err);
  }

  return { success: true, mode: 'local' };
}

/**
 * Helper to retrieve visitor's pinned notes for this session
 */
export function getLocalPinnedNotes(): NotePayload[] {
  try {
    const raw = localStorage.getItem('sanjana_playground_notes');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
