# Occupancy overview

If you plan several projects that all draw from the same resource library, you'll want to see where each crew is booked across all of those projects — and above all, where the sum of those bookings exceeds what the company actually has. That's what the occupancy overview is for: the third view on the Resources tab, next to **Library** and **Project**. It's a reading window — you see everything, you change nothing from it.

## What you'll learn here

- Opening the overview and reading the table: one row per booked library item, expandable per document.
- When a resource counts as double-booked.
- What the ⚠ marker means and how to resolve it.
- The key limitation: the overview only sees this machine.
- Why a duplicated document counts in full.

## Opening the overview

Open the projects you want to oversee, each in its own tab, and go to the Resources tab. The view toggle sits in the top right; pick **Occupancy**. The button only exists when the active project is linked to a library — a standalone project has no library context and therefore no occupancy overview. The overview then shows only the open documents linked to that *same* library; documents linked to a different library (or none) contribute nothing.

To see it in action right away: open [Nieuwbouw 6 Rijwoningen De Akkers](examples://showcase-rijwoningen-de-akkers.ifc) and [Nieuwbouw Appartementencomplex De Vaart](examples://showcase-appartementencomplex.ifc) side by side — both draw from the same demo resource library, so their crews appear together in one overview.

## Reading the table

Each main row is one library item that is booked somewhere: its name, how many documents it appears in, the overall period of the bookings, and the peak load set against the company capacity (for instance "3.0 / 2.0"). If the item is double-booked anywhere, the row carries a red badge with the number of conflict days and the first conflict dates; rows with conflicts sort to the top.

Expand a row and you get one sub-line per document: the document title, the period in which the resource is booked there, and the peak within that document. That shows you at a glance which projects are claiming the resource and who is causing the overlap.

Library items with no booking in the open documents get no row at all: the overview shows deployment, not a catalogue — the catalogue lives in the **Library** view. Project-only resources (with no library provenance) don't count either; their occupancy is a within-project question, and the regular histogram already answers that one.

## When does a resource count as double-booked?

Per day, the app adds up the load from all qualifying open documents and compares that sum with the capacity of the library item itself — the max units as they stand in the library, including its time-phased availability there. If the sum is *strictly greater* than that capacity, the day is double-booked. A sum exactly equal to the capacity is therefore not a conflict.

Note that the capacity comes from the library, not from the projects. Two projects that each stay neatly within their own max units can still be double-booked together — the company simply has fewer people than both projects combined are claiming. And a single document that on its own books above the company capacity shows up here as a conflict too; the expanded view then immediately reveals there's only one culprit.

## The ⚠ marker: document not recalculated

Schedules don't recalculate by themselves: you press F5 (or the **Calculate** button). A document that has changed since its last calculation still counts in the overview — on its last calculated dates — but carries a ⚠ marker on every line where it appears, and a warning shows above the table. That document's figures may be out of date.

The fix: activate that document (click its tab), press **F5**, and switch back to the occupancy overview. The marker disappears and the figures are current again.

## This machine only

The occupancy overview only sees documents that are open on this computer. There is no shared storage between machines: bookings a colleague plans on their computer don't exist locally here and therefore don't count — not even if you share the same library through export and import. That boundary sits below the table as a permanent footnote, so you can never read past it.

Files that live on this machine but aren't open don't count either: the overview is about *open* documents, not everything on disk. How sharing libraries between machines does work — and which limits come with it — is covered in the guide [Resource libraries](docs://gids-resourcebibliotheken).

## Duplicates count in full

Duplicate a document — say, to explore a variant — and that duplicate is a fully-fledged open document whose bookings simply count. Original plus variant together can then show a double-booking that in reality exists only once. The overview deliberately doesn't filter that out silently: if you're comparing variants, close them for a moment or read around them.

## Keep reading

- How library and project relate to each other — linking, provenance, deviations: the guide [Resource libraries](docs://gids-resourcebibliotheken).
- Occupancy *within* a single project — the histogram and leveling: the guide [Resources, histogram & leveling](docs://gids-resources-histogram).
