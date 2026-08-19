import type { NotifyInput } from './slices/types';

/**
 * mpp-nul-data-etappe, DEEL 1 — de eenmalige K8a-melding wanneer een gebruikersbewerking aantoonbaar
 * de MSP-timephased-sturing van een taak loslaat (`clearTimephasedWindow`/
 * `clearTimephasedDurationWalks` in `taskDefaults.ts` gaven `true` terug op minstens één taak).
 *
 * SESSIE-ONLY "AL GEMELD"-REGISTRATIE PER DOCUMENT — de eigenaarseis is "eenmalig per document per
 * sessie". `notify`'s eigen `dedupeKey`-samenvouwing (uiSlice.ts) volstaat daar NIET voor: die vouwt
 * alleen samen zolang de eerdere melding nog in de actieve lijst staat, en een `info`-toast
 * verdwijnt na 5 s vanzelf (`NotificationHost.tsx`). Zonder aparte registratie zou een tweede
 * bewerking een halve minuut later gewoon een NIEUWE toast opleveren — precies wat de eis uitsluit.
 * Deze module is die aparte, voor de sessie PERMANENTE gate; `dedupeKey` blijft daarnaast nuttig
 * voor het samenvouwen BINNEN ÉÉN BURST (bv. meerdere taken die in één bewerking tegelijk sturing
 * verliezen — de aanroepers tellen dat zelf en geven één `count` mee, zie `notifyTimephasedLoss`).
 *
 * Module-state, geen store-veld: dit is sessie-UI-gedrag, geen projectdata (hoort dus niet in
 * `DOCUMENT_FIELDS`) — en overleeft bewust WEL een documentwissel-en-terug, wat een documentcontract-
 * veld (dat mee zou swappen naar de `DocumentPayload`) niet zou doen.
 */
const notifiedDocIds = new Set<string>();

/** `true` de EERSTE keer voor dit document-id deze sessie — en markeert 'm meteen als gebruikt.
 *  Elke volgende aanroep met hetzelfde document-id geeft `false`, ongeacht of de eerdere toast
 *  intussen is weggeklikt of vanzelf verlopen. */
export function claimTimephasedLossNotice(docId: string): boolean {
  if (notifiedDocIds.has(docId)) return false;
  notifiedDocIds.add(docId);
  return true;
}

/** Test-only: wist de registratie. Headless tests draaien allemaal in hetzelfde Node-proces
 *  (esbuild-bundel, zie tests/planning/run.sh) — zonder reset zou de eerste case die deze melding
 *  triggert 'm voor alle latere cases "al gemeld" maken. */
export function __resetTimephasedLossNoticeForTests(): void {
  notifiedDocIds.clear();
}

/** Het artikel-id waar de melding + de paneelmarkering (DEEL 2) naar doorlinken (mpp-nul-data-
 *  etappe, "lees meer"-eigenaarseis) — sectie "Gecontoureerde toewijzingen" in de gids. */
export const MPP_TIMEPHASED_HELP_ARTICLE_ID = 'gids-msproject-import';

/**
 * Gedeelde notify-aanroep voor alle aanroepplekken (taskSlice.ts, resourceSlice.ts,
 * mcpTransaction.ts): claimt de eenmalige-per-document-gate en pusht de melding als de claim slaagt.
 * `count` is het aantal taken dat in DEZE bewerking/transactie aantoonbaar sturing verloor — `<= 0`
 * is een no-op (nooit aanroepen zonder een echt verlies).
 */
export function notifyTimephasedLoss(
  notify: (n: NotifyInput) => void,
  docId: string,
  count: number,
): void {
  if (count <= 0) return;
  if (!claimTimephasedLossNotice(docId)) return;
  notify({
    severity: 'info',
    messageKey: 'notifications.mppTimephasedSteeringLost',
    params: { count },
    dedupeKey: `mpp-timephased-lost-${docId}`,
    helpArticleId: MPP_TIMEPHASED_HELP_ARTICLE_ID,
  });
}
