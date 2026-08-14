# Opening MS Project (.mpp)

Besides MS Project XML (MSPDI), Open Planner Studio can also open Microsoft Project's native
`.mpp` file directly — no export step needed first. The reader is a self-contained TypeScript
implementation of the MPP14 container format (Project 2010 through 2021). This guide explains what
comes along, where the limits are, and what happens when you save a file like this.

## What you'll learn here

- How to open a `.mpp` file, and which paths support it.
- What exactly comes along: tasks, relations, calendars, resources and assignments.
- A known limitation around yearly recurring holidays.
- What deliberately does not come along, and what you get for an unsupported file.
- What happens when you save or re-export an opened `.mpp` file.

## What comes along

When you open a `.mpp` file, Open Planner Studio reads:

- **Tasks**, including the hierarchy (summary tasks/subtasks) and the WBS coding.
- **Relations** in all four kinds (finish-to-start, start-to-start, finish-to-finish,
  start-to-finish), with lag — both in working days and in elapsed days, as well as percentage lag.
- **Calendars**: working days, working hours per day, and the concrete exception dates
  (days off).
- **Resources**, of type Work or Material. MS Project also has a Cost type, but — same as with
  the existing MSPDI import — it's treated as Work.
- **Assignments** of resources to tasks, including progress (percent complete, actual
  start/finish where present).

This is the same field set as the existing MS Project XML import (MSPDI), except for the
limitations listed below.

## Opening

You open a `.mpp` file the exact same way as any other project file:

- **File → Open** (or **Ctrl+O**), just pick a `.mpp` file.
- Via **recent files** once you've opened one before.
- Via the AI assistant, with the `planner_import_schedule` tool (see the guide
  [Connecting an AI assistant (MCP)](docs://gids-ai-mcp)).

The file lands in a **new document** — like any import — unless the active tab is still empty and
unchanged.

## Calendar exceptions: a known limitation

Concrete, one-off exception dates in a calendar (a specific day off on a fixed date) come along
just fine. What does **not** come along are yearly recurring exceptions with a repeat rule — for
example a holiday like Christmas that's set up in MS Project to recur automatically every year.
Only the flattened, concrete dates are read; the repeat rule itself is lost. This is visible to
you: a calendar built with a yearly repeat rule in MS Project comes out with fewer days off in
Open Planner Studio than you'd expect for future years.

This isn't specific to the `.mpp` reader: the existing MSPDI import (MS Project XML) has the same
limitation. If you need the full calendar, check it after opening under
**Planning → Calendar** and add any missing future holidays by hand if needed — see the guide
[Calendars & hour planning](docs://gids-kalenders-uren).

## What doesn't come along

The `.mpp` import is **read-only**: there is no `.mpp` export format, not even in the source
project (MPXJ) the reader is based on. In addition:

- **No baselines**, custom fields, outline codes, subprojects or cost fields. The field set is
  exactly what the MSPDI import also delivers, minus baselines.
- **Older `.mpp` formats** (MPP8/9/12 — Project 98 through 2007) are recognized but not read:
  you get a clear error message suggesting you export the file as XML in MS Project
  (**File → Save As → XML**) and open that file instead.
- **Password-protected files** give the same error with the same suggestion — the contents are
  not decrypted.

## Saving and exporting

As everywhere in Open Planner Studio, **Save** always writes IFC — there's no separate `.mpp`
project format to write back to. Because an opened `.mpp` file (just like an opened `.csv` or MS
Project XML) therefore gets no save target of its own, **Ctrl+S** on such a document is always
**save-as**: your source file is never silently overwritten with IFC content. To bring the
schedule back into MS Project, use **Backstage → Export → MS Project XML** — see the guide
[Import/export](docs://gids-import-export) for what does and doesn't come along there.

## Origin

The `.mpp` reader is derived from the source code and structural knowledge of MPXJ
(`github.com/joniles/mpxj`, Jon Iles et al.), a Java library under LGPL-2.1 — just like Open
Planner Studio itself is open source under LGPL-3.0.

## Further reading

- What each export and import format does and doesn't carry: [Import/export](docs://gids-import-export).
- Checking working days, hours and holidays after opening:
  [Calendars & hour planning](docs://gids-kalenders-uren).
