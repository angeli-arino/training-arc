# Body Scan Logic

This file defines the MVP decision logic. It can be adjusted later, but implementation should start here.

## Inputs

### Energy

Scale: 1–5

1. floor
2. low battery
3. functional
4. ready
5. main character

### Soreness

Suggested values:

- `none`
- `mild`
- `medium`
- `spicy`
- `absolutely_cooked`

### Breathing / illness

Suggested values:

- `normal`
- `slightly_off`
- `coughing`
- `sick_sick`

### Mood

Suggested values:

- `calm`
- `frazzled`
- `anxious`
- `emotionally_cooked`

### Planned workout

Suggested values:

- `run`
- `gym`
- `hybrid`
- `rest_day`
- `unsure`

### Recent effort / RPE

Scale: 1–10

1. chill
5. steady
10. boss fight

## Output statuses

### Slay Day

Meaning: Train as planned.

Use when:

- energy is 4–5
- soreness is none/mild/medium
- breathing is normal
- mood is calm/frazzled
- recent RPE is not extreme, or recovery looks fine

### Modify the Quest

Meaning: Reduce intensity, volume, or complexity.

Use when:

- energy is 2–3
- soreness is medium/spicy
- breathing is slightly off or coughing but not sick-sick
- recent RPE is 7–9
- planned workout is intense but recovery signals are mixed

Suggested modifications:

- tempo run → easy run
- intervals → short easy run or walk
- heavy legs → lighter accessories or upper body
- hybrid day → choose either run or gym, not both
- long run → shorter easy run or walk/run

### Recovery Episode

Meaning: Rest or active recovery.

Use when:

- energy is 1–2 and soreness is spicy/absolutely cooked
- breathing is sick-sick
- recent RPE is 9–10 and energy is low
- signs suggest illness, fatigue, or overreaching

Suggested options:

- rest
- gentle walk
- mobility
- stretching
- early bedtime
- hydration and food

### Peace Mode

Meaning: Emotional regulation first.

Use when:

- mood is anxious or emotionally cooked
- emotional state is the primary blocker
- user may benefit from grounding before training decision

Peace Mode can override other outputs if mood is `emotionally_cooked`. If mood is `anxious`, result may be Peace Mode or Modify the Quest depending on energy and illness.

Suggested options:

- 5-minute breathing reset
- shower
- walk outside
- tidy one tiny area
- gentle mobility
- postpone training decision by 20 minutes

## Simple MVP scoring approach

Start with points:

- Energy 4–5: +2
- Energy 3: +1
- Energy 1–2: -2
- Soreness none/mild: +1
- Soreness medium: 0
- Soreness spicy: -1
- Soreness absolutely cooked: -2
- Breathing normal: +1
- Breathing slightly off: 0
- Breathing coughing: -1
- Breathing sick-sick: Recovery Episode override
- RPE 1–5: +1
- RPE 6–7: 0
- RPE 8–10: -1

Mood overrides:

- `emotionally_cooked` → Peace Mode
- `anxious` + low energy → Peace Mode
- `anxious` + okay energy → Modify the Quest with grounding first

Decision:

- Score 4 or higher → Slay Day
- Score 1–3 → Modify the Quest
- Score 0 or lower → Recovery Episode

Hard overrides:

- `sick_sick` → Recovery Episode
- energy 1 + spicy/absolutely cooked soreness → Recovery Episode
- emotionally cooked → Peace Mode

## Result explanation

Every result should include:

- one sentence explaining why
- one recommended action
- one tiny win

Example:

“Energy is low and soreness is spicy, so today is a Recovery Episode. Rest is training. Tiny win: 20-minute walk or mobility.”
