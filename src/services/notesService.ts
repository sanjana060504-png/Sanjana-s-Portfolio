export type FigJamPastelColor = 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'peach' | 'gray';

export interface NotePayload {
  name?: string;
  message: string;
  color: FigJamPastelColor;
  page: 'Playground';
  timestamp: string;
}

export interface SubmitResult {
  success: boolean;
  error?: string;
  mode: 'email' | 'local';
}

export const FIGJAM_PASTELS: Record<
  FigJamPastelColor,
  {
    name: string;
    bg: string;
    darkBg: string;
    border: string;
    darkBorder: string;
    text: string;
    darkText: string;
    dotBg: string;
    pinColor: string;
    shadow: string;
  }
> = {
  yellow: {
    name: 'Yellow',
    bg: '#FFF3A3',
    darkBg: '#E8DC7A',
    border: '#E8DC7A',
    darkBorder: '#C9BD5B',
    text: '#2C2700',
    darkText: '#1E1B00',
    dotBg: '#FEF38B',
    pinColor: '#D1B41A',
    shadow: 'rgba(217, 194, 70, 0.25)',
  },
  green: {
    name: 'Green',
    bg: '#D4F8D3',
    darkBg: '#B8EAB7',
    border: '#B6EBB5',
    darkBorder: '#96D695',
    text: '#0E3615',
    darkText: '#08280E',
    dotBg: '#D4F8D3',
    pinColor: '#38A169',
    shadow: 'rgba(72, 187, 120, 0.22)',
  },
  blue: {
    name: 'Blue',
    bg: '#C6EBFE',
    darkBg: '#AEDBFC',
    border: '#A8DCFA',
    darkBorder: '#83C8F3',
    text: '#0C3759',
    darkText: '#08253D',
    dotBg: '#C6EBFE',
    pinColor: '#3182CE',
    shadow: 'rgba(66, 153, 225, 0.22)',
  },
  purple: {
    name: 'Purple',
    bg: '#E4D4FF',
    darkBg: '#D0BCFA',
    border: '#D0BAFB',
    darkBorder: '#B297EE',
    text: '#371561',
    darkText: '#240B43',
    dotBg: '#E4D4FF',
    pinColor: '#805AD5',
    shadow: 'rgba(128, 90, 213, 0.22)',
  },
  pink: {
    name: 'Pink',
    bg: '#FFD6E8',
    darkBg: '#FABFD9',
    border: '#FABED7',
    darkBorder: '#E69BBF',
    text: '#551131',
    darkText: '#3B0A21',
    dotBg: '#FFD6E8',
    pinColor: '#D53F8C',
    shadow: 'rgba(213, 63, 140, 0.22)',
  },
  peach: {
    name: 'Peach',
    bg: '#FFE2C6',
    darkBg: '#F8CEAA',
    border: '#F7CEAA',
    darkBorder: '#E0AA7E',
    text: '#562B03',
    darkText: '#3D1D00',
    dotBg: '#FFE2C6',
    pinColor: '#DD6B20',
    shadow: 'rgba(221, 107, 32, 0.22)',
  },
  gray: {
    name: 'Gray',
    bg: '#EBEBEB',
    darkBg: '#D7D7D7',
    border: '#D5D5D5',
    darkBorder: '#BBBBBB',
    text: '#2C2C2C',
    darkText: '#1A1A1A',
    dotBg: '#EBEBEB',
    pinColor: '#718096',
    shadow: 'rgba(113, 128, 150, 0.2)',
  },
};

/**
 * Submits the note and delivers it directly to Sanjana's email
 * (sanjana060504@gmail.com) via Formsubmit AJAX endpoint, while also
 * saving in local storage for an immediate tactile desk experience.
 */
export async function submitPlaygroundNote(
  note: Omit<NotePayload, 'page' | 'timestamp'>
): Promise<SubmitResult> {
  const payload: NotePayload = {
    name: note.name?.trim() ? note.name.trim() : undefined,
    message: note.message.trim(),
    color: note.color || 'yellow',
    page: 'Playground',
    timestamp: new Date().toISOString(),
  };

  // Always persist locally first so visitor sees their pinned note immediately
  try {
    const key = 'sanjana_playground_notes';
    const raw = localStorage.getItem(key);
    const existing: NotePayload[] = raw ? JSON.parse(raw) : [];
    existing.unshift(payload);
    localStorage.setItem(key, JSON.stringify(existing.slice(0, 20)));
  } catch (err) {
    console.warn('Could not store note locally:', err);
  }

  // Deliver directly to Sanjana's email
  try {
    const targetEmail = 'sanjana060504@gmail.com';
    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name || 'Anonymous Visitor',
        message: payload.message,
        note_color: payload.color,
        page: 'Playground Portfolio Desk',
        submitted_at: new Date().toLocaleString(),
        _subject: `✦ New Sticky Note left on your Portfolio Desk (${payload.color.toUpperCase()})`,
        _template: 'table',
      }),
    });

    if (response.ok) {
      return { success: true, mode: 'email' };
    }
  } catch (err) {
    console.warn('Email delivery error (fallback to local session):', err);
  }

  return { success: true, mode: 'local' };
}

export function getLocalPinnedNotes(): NotePayload[] {
  try {
    const raw = localStorage.getItem('sanjana_playground_notes');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
