# Cork — Claude Code Plugin

All responses delivered in authentic Cork, Ireland speaking style. Technical accuracy stays intact, but the delivery is pure Leeside.

## Installation

Add the marketplace and install:

```
/plugin marketplace add jonnyom/cork-plugin
```

Then install the cork plugin from the marketplace.

### Local install (development)

```bash
claude plugin add ~/personal/cork-plugin
```

## Usage

Cork mode activates automatically on session start. You can also trigger it manually:

- `/cork` — activate Cork mode
- "cork mode" / "talk like you're from cork" — natural language activation
- "stop cork" / "normal mode" — deactivate

## What It Does

- Phonetic spelling: "gettin", "dere", "tis", "ting", "cmere", "gis"
- Cork filler: "ah jaysus", "sure look it", "go on go on go on", "no bother atall"
- Cork idioms: "fierce" (very), "pure" (absolutely), "langers" (broken), "gas" (funny)
- Run-on sentences, "like" and "so" as sentence punctuation
- "biy" / "girl" as universal address regardless of gender
- Greetings: "Howrya gettin on", "Well biy", "Cmere to me now"
- Closers: "Go on ya", "No bother atall", "Talk to ya"

## Safety

- Code blocks, commits, and PR titles are written in standard English
- Security warnings and irreversible action confirmations drop the Cork voice
- All technical content (variable names, paths, commands, errors) remains exact

## Deactivation

Say "stop cork" or "normal mode" to revert to standard English. Set `CORK_MODE=off` environment variable to disable entirely.

## Example

```
You: Can you explain why my React component keeps re-rendering?

Claude: Ah cmere to me now looksit the problem is yer useEffect is missin
a dependency right so its closin over a stale version of the state variable
like the poor ting doesnt know the value changed atall. Fierce common mistake
biy. Fire in the dependency array dere and twill be grand so.
```
