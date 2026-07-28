# Beveiligingsbeleid

*English: to report a vulnerability, use GitHub's private reporting on the
[Security tab](https://github.com/OpenAEC-Foundation/open-planner-studio/security/advisories/new).
Please do not open a public issue. Reports in English are welcome.*

## Een kwetsbaarheid melden

Meld een beveiligingsprobleem **niet** via een gewoon issue, een pull request of
de feedbackknop in de app — die zijn allemaal publiek.

Gebruik in plaats daarvan GitHub's private melding:
**[Security → Report a vulnerability](https://github.com/OpenAEC-Foundation/open-planner-studio/security/advisories/new)**.
Dat maakt een besloten draad aan tussen jou en de beheerders.

Helpt bij een melding:

- welke versie (de versie staat in Backstage → Instellingen, of in de titelbalk);
- of het de desktopversie of de browserversie betreft — die verschillen in wat
  ze mogen (bestandssysteem, updater);
- een reproductie: de kleinste stappen of het kleinste bestand dat het uitlokt;
- wat een aanvaller ermee zou kunnen bereiken.

Stuur geen echte projectbestanden mee als daar bedrijfsgegevens in staan; een
teruggebracht voorbeeldbestand is genoeg en meestal duidelijker.

## Wat je kunt verwachten

Dit is een klein project zonder team dat piket draait. We streven naar een
eerste reactie binnen een week. Je hoort van ons wat we met de melding doen,
ook als we besluiten dat het geen kwetsbaarheid is. Als je dat wilt, word je
genoemd in de release-notitie van de fix.

## Ondersteunde versies

Alleen de nieuwste release krijgt fixes. Versies zijn CalVer (`JJJJ.M.patch`);
de desktopversie werkt zichzelf bij via de ingebouwde updater, behalve bij een
Snap- of AppImage-installatie — die worden door hun eigen kanaal bijgewerkt.
De browserversie op `open-planner-studio.open-aec.com` loopt altijd op de
nieuwste `main`.

## Waar de risico's zitten

Twee onderdelen zijn interessanter dan de rest, en het helpt als een melding
duidelijk maakt om welke het gaat.

**Extensies voeren code uit.** Een extensie is JavaScript dat in de app draait,
in een `new Function(...)`-sandbox waarvan `require()` alleen de eigen API
teruggeeft en waarvan de rechten per API-aanroep worden gecontroleerd. Die
sandbox is een *afbakening*, geen beveiligingsgrens: installeer alleen
extensies die je vertrouwt. Meldingen over ontsnappen uit die sandbox zijn
welkom en worden serieus genomen.

**IFC-bestanden komen van buiten.** Openen betekent parsen. De parser wordt met
vijandige invoer getest (`tests/library/check-ifc-hostile.ts`), maar een
bestand dat de app laat crashen, laat vastlopen, of iets laat doen wat het niet
hoort te doen, is een geldige melding.

Buiten scope: dat een extensie die je zelf installeert kan doen wat je hem
toestaat, en dat een IFC-bestand rare planningen kan bevatten.

## Openbaarmaking

We werken met gecoördineerde openbaarmaking: we vragen je te wachten met
publiceren tot er een fix uit is, of tot negentig dagen na je melding als het
zolang duurt. Als een probleem al actief misbruikt wordt, gaan we sneller en
melden we het openbaar zodra er een fix is.
