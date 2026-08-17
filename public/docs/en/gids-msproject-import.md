# Opening MS Project (.mpp)

Besides MS Project XML (MSPDI), Open Planner Studio can also open Microsoft Project's native
`.mpp` file directly — no export step needed first. The reader is a self-contained TypeScript
implementation of the MPP14 container format (Project 2010 through 2021). This guide explains what
comes along, where the limits are, and what happens when you save a file like this.

## What you'll learn here

- How to open a `.mpp` file, and which paths support it.
- What exactly comes along: tasks, relations, calendars, resources and assignments.
- How accurate the imported start and finish dates are, and which tasks deliberately deviate.
- What happens to progress: MS Project's own resumption convention for tasks in progress.
- One known calendar limitation: work weeks (a temporary alternate weekly pattern).
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

For **hour-based projects** (tasks that MS Project schedules at hour or minute precision, or a
calendar with, say, a lunch break) durations and working times come along at that precision: a
2-hour task no longer comes out as 0 days, and start/finish times keep their real time of day
instead of only the date. Open Planner Studio detects this automatically, per calendar — there's
nothing to turn on. See [Calendars & hour planning](docs://gids-kalenders-uren) for how hour mode
works elsewhere in the app.

## Opening

You open a `.mpp` file the exact same way as any other project file:

- **File → Open** (or **Ctrl+O**), just pick a `.mpp` file.
- Via **recent files** once you've opened one before.
- Via the AI assistant, with the `planner_import_schedule` tool (see the guide
  [Connecting an AI assistant (MCP)](docs://gids-ai-mcp)).

The file lands in a **new document** — like any import — unless the active tab is still empty and
unchanged.

## Date accuracy: what matches to the minute, and what doesn't

Open Planner Studio schedules an opened `.mpp` file using the same calendar logic as MS Project
itself (working days, working hours per day, days off, and — for an hour-based project — the exact
clock time). For **almost every task**, that results in the same start and finish date as in MS
Project, down to the minute for an hour-based project. There are two categories of exceptions, both
deliberate:

- Tasks with a **split**, **leveled**, or otherwise **resource-driven** schedule — a notification
  appears for these when opening the file, see below.
- A small number of isolated, rare edge cases in specific combinations of calendar type, relation
  kind, or task progress, which aren't (yet) flagged automatically. These have been investigated
  and documented internally, but in practice rarely affect an ordinary project — at most you'd
  notice a single task in an unusual situation being off by a day or so from MS Project while the
  rest of the schedule matches.

The first category in detail: tasks with a **split**, **leveled**, or otherwise
**resource-driven** schedule (manual leveling, a "leveling delay", or resource contouring/work
spread out over the task's span). MS Project can stretch such a task over a longer period than its
duration alone would require — for example, a 3-day task that, with a pause in the middle, spans 5
calendar days. Open Planner Studio doesn't yet distinguish this and schedules such a task as one
**continuous** span: the duration is correct, but the window (and therefore possibly the finish
date) can differ from what you see in MS Project.

You'll usually notice this when opening: if the file contains such tasks, a one-time notification
shows the count. Two of the three causes — leveling with a leveling delay, and a split or
multi-day-stretched task — are reliably detected. **Pure resource contouring** (work within a task
gets a rising/falling curve, without the start/finish date itself changing) is a known, unclosed
gap in that notification: the source file's own contour indicator turned out not to be reliably
readable on investigation, so such a task can be scheduled as one continuous span silently, without
a notification. If you need to know exactly which tasks are affected and how they're built up in MS
Project (the breaks, the leveling delay, a contour), open the file in MS Project itself — that
information isn't silently lost from the source file when reading it, Open Planner Studio simply
ignores it when scheduling. Editable task splitting and resource leveling as a feature aren't part
of this stage; the notification and this guide are where you can look this up.

## Progress: MS Project's own resumption convention

For a task that's already **partly done** when you open the `.mpp` file, Open Planner Studio
determines the resumption point of the remaining work the same way MS Project itself does: based
on the actual start time plus the time already elapsed, rather than (as with a project from
Primavera P6 or another format) based on the status date or the pressure from preceding tasks. You
usually won't notice this — the two approaches land on the same result for most tasks — but it's
why a `.mpp`-imported task can sometimes show a slightly different resumption point than an
otherwise identical task sourced from P6 or MS Project XML. This setting is a permanent property of
the project: it stays intact across **Save** (as IFC) and a later **Open**, with no toggle anywhere
to see or change it.

## Calendar exceptions and work weeks

Concrete, one-off exception dates in a calendar (a specific day off on a fixed date) come along
just fine, and so do **yearly recurring** exceptions with a repeat rule — for example a holiday
like Christmas that's set up in MS Project to recur automatically every year. Open Planner Studio
expands such a repeat rule itself into the concrete dates within the project period; there's
nothing you need to do for this. This applies both to ordinary days off and to **working
exceptions** (a day that's normally off but explicitly marked as working in the calendar — for
example a scheduled Saturday).

What remains a known limitation are **work weeks** — MS Project's way of assigning an alternate
weekly pattern to a calendar for a given date range (for example, "starting July 1st this team
also works Saturdays"). Only the standard weekly pattern and the individual exception dates come
along; a temporary alternate weekly pattern doesn't. In practice this affects few files — most MS
Project calendars don't use work weeks — but if you know a calendar has one, double-check it after
opening, under **Planning → Calendar** — see the guide
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
