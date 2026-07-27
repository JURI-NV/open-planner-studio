import { useEffect, useRef } from 'react';

/**
 * Module-globale dialoog-stapel (S2, B1.1-vlootbevindingen V1/V3): elke `Dialog`-instantie roept
 * `useDialogKeys` aan, en zonder stapelbesef verwerkte de ONDERSTE (eerst-gemonteerde) dialoog een
 * Escape/Enter net zo goed als de bovenste — bij bv. WelcomeDialog+LibraryLinkDialog tegelijk open
 * sloot de eerste Escape zo het onzichtbare Welcome-scherm terwijl LibraryLinkDialog open bleef.
 * Elke `useDialogKeys`-instantie meldt zich aan (push bij mount, pop bij unmount) en de keydown-
 * handler verwerkt de toets alleen als zijn eigen id BOVENAAN de stapel staat. `ConfirmDialog` heeft
 * hiernaast nog zijn eigen capture+`stopImmediatePropagation`-workaround (zie de toelichting daar)
 * — die blijft ongemoeid en vuurt sowieso vóór deze bubble-fase-listeners.
 */
let dialogStack: symbol[] = [];

/** Is er momenteel minstens één dialoog gestapeld? Gebruikt door sneltoetsen die niet óver een
 *  openstaande dialoog heen mogen openen (bv. Ctrl+N, zie `shortcutRegistry.ts`). */
export function isAnyDialogOpen(): boolean {
  return dialogStack.length > 0;
}

/**
 * Standaard dialoog-sneltoetsen (fase 2.8b): Esc = annuleren/sluiten, Enter = primaire actie
 * (Toepassen/Aanmaken) — hetzelfde als de primaire knop, zoals `RecoveryDialog` het al deed.
 *
 * Enter wordt NIET afgevuurd wanneer de focus in een element staat waar Enter een eigen betekenis
 * heeft:
 *  - een `<textarea>` (regeleinde),
 *  - een open dropdown (`aria-expanded="true"`) of een `Select`-trigger (`aria-haspopup="listbox"`,
 *    Enter opent/kiest daar),
 *  - tijdens IME-compositie (`isComposing` — CJK/complexe invoer),
 *  - of wanneer de toets al is afgehandeld (`defaultPrevented`, bv. door een open `Select`).
 */
export function useDialogKeys({
  onConfirm,
  onCancel,
}: {
  onConfirm?: () => void;
  onCancel?: () => void;
}): void {
  const idRef = useRef<symbol | null>(null);
  if (idRef.current === null) idRef.current = Symbol('dialog');

  // Losse effect met lege deps: registratie op de stapel mag niet heropvoeren bij elke
  // onConfirm/onCancel-identiteitswissel (anders pop/push je jezelf tussentijds naar de top).
  useEffect(() => {
    const id = idRef.current!;
    dialogStack.push(id);
    return () => {
      dialogStack = dialogStack.filter((s) => s !== id);
    };
  }, []);

  useEffect(() => {
    const id = idRef.current!;
    const onKey = (e: KeyboardEvent) => {
      if (dialogStack[dialogStack.length - 1] !== id) return; // niet de bovenste — negeren
      if (e.key === 'Escape') {
        if (onCancel) { e.preventDefault(); onCancel(); }
        return;
      }
      if (e.key === 'Enter') {
        if (!onConfirm || e.defaultPrevented || e.isComposing) return;
        const el = document.activeElement as HTMLElement | null;
        if (el?.tagName === 'TEXTAREA') return;
        if (el?.getAttribute('aria-expanded') === 'true') return;   // open dropdown
        if (el?.getAttribute('aria-haspopup') === 'listbox') return; // Select-trigger (open/dicht)
        e.preventDefault();
        onConfirm();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onConfirm, onCancel]);
}
