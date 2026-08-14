/**
 * Gedeelde duur-omrekening voor de import-readers (T7-kwaliteitsreview, M2) — spiegelt de F5-a-
 * conventie van `importDates.ts` (één gedeeld primitief i.p.v. losse, bijna-identieke kopieën per
 * reader). `mspdiReader.ts` (LinkLag-lag, LagFormat-"anders"-tak) en `mppReader.ts` (taakduur uit
 * `TBkndTask` + TBkndCons-lag WORKTIME-tak) bewaren beide een ruwe waarde in TIENDEN VAN EEN MINUUT
 * en rekenen 'm om naar hele WERKDAGEN met dezelfde afronding.
 *
 * Vóór deze samenvoeging waren dit twee losse functies: mspdiReader.ts's eigen `tenthsOfMinutesToDays`
 * had GEEN bovengrens op `hoursPerDay === 0` (`Math.round(hours / hoursPerDay)` ⇒ `Infinity`/`NaN`
 * bij een kapotte/lege kalender — hetzelfde soort lek als T7-kwaliteitsreview I2 in `mppPrimitives.
 * ts`'s `getDouble`), terwijl mppReader.ts's `durationTenthsOfMinuteToDays` die guard al had. Deze
 * gedeelde versie neemt de guard mee voor BEIDE lezers.
 */
export function tenthsOfMinutesToDays(tenths: number, hoursPerDay: number): number {
  const minutes = tenths / 10;
  const perDay = hoursPerDay * 60;
  return perDay > 0 ? Math.round(minutes / perDay) : 0;
}
