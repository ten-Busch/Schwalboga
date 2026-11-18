# Wer wird Milo-när?

## Spielmodi und Joker

Choose Safe Mode or Risk Mode before starting. Safe Mode has checkpoints at 500, 16.000, and 1.000.000. Risk Mode removes the 16.000 checkpoint. Its extra choice-joker slot remains reserved until the larger joker selection is defined.

50:50 is usable once per run. The audience joker stores manual counts for all four answers and can reopen repeatedly for its original question. Moving to another question, including a developer reroll, expires it. The telephone joker reveals three contacts only when activated, reserves the joker at that point, and keeps the selected contact and dialogue position for the same question.

## Telefonkontakte

Move percentage contacts: Schätzmeister requires a strict nearer-anchor comparison from 50/25/10/75/66.6/33.3/100 that includes exactly two displayed answers and the truth. Pokémon Zensus states the type population and the move's total learner population, and only adds majority/minority if that does not eliminate all remaining wrong options. Pokémon Tutor compares against the farthest wrong option and the farthest opposite-side wrong option if possible, otherwise the second-farthest.

Ability-pair contacts: Pokémon-Verkuppler dismisses the two visible wrong options with the lowest co-occurrence counts. The named ability expert states a candidate ability's total carriers and number of distinct partners. Fähigkeitenkapsel-Junkie recites the correct ability's German description. Roto-Dex recites definitions of visible actual abilities in missing-ability questions, with the requested pale-yellow/orange/black styling. German definitions come from PokéAPI's German ability flavor texts in data/ability-descriptions-de.js; only offer definition contacts when their required descriptions exist.

Numeric stat contacts: Aoki states the standard-form population mean and the reference's distribution tercile, placing ties by their midpoint rank. Werte-Experte compares 100 (individual stat) or 500 (BST) to the true value using absolute error divided by that true value. Exact equality gets an explicit exact-value response.

Frau vom Attacken-Tutor offers visible answer buttons and branches to the matching positive or negative response. Trainerschulen-Hausmeister gives a random visible comparison option's value for the exact stat being asked, or the selected Singles/Doubles cost in cost comparisons. Dita is helpful at 500 and 1.000, while remaining semi-useful at 300.

PokéLiga Vorstand applies only to plain numeric costs. Use the nearest of the inclusive limits 5 (Tera), 10 (Z), and 15 (Booster Energy, Paradox only). State the exact cost change needed to cross legality. Taktiker applies only to upgraded numeric costs and states limit + 1 − base cost.

Traumwelt-Besucher confirms the visible hidden ability where possible, otherwise a visible regular ability. Ausgeglichener Trainer states the correct move's recorded category. Zirpeise is useless above 1.000 and streams increasing numbers of o characters over ten seconds into a scrolling text box, ending with one p.

Glückspieler is semi-useful for coverage/shared moves when the correct move's recorded numeric accuracy is below 100 and above zero. Its selection weight is 3 when a wrong option also meets that accuracy condition, otherwise 1.

DamageCalc-Nerd is semi-useful for coverage/shared moves with exactly 100 recorded accuracy and a positive offensive base power. It states 1.5 × base power with one decimal, using the no-STAB/all-STAB/mixed-STAB sentence based on the reference Pokémon's types. Its selection weight is 3 when a wrong offensive option has positive base power within 20 points of the correct move, otherwise 1. Exclude status moves, zero-base-power moves, and accuracy-null moves from this contact. Keep the supplied dialogue even if a named move is not distributed as a TM.

Geologe aus Alola is helpful for numeric cost-value questions with a Z upgrade. Interpolate the type's German first two letters into the supplied mineral formula and state the snapshotted Z surcharge. Geologe aus Paldea is helpful for numeric cost-value questions with a Tera upgrade and states that surcharge plus a maximum combined cost of 5 + Tera surcharge. These contacts do not apply to plain numeric costs, comparisons, or full-team totals.

Comparison specialists are classified as helpful at every eligible prize: Initiative Rennradfahrer, Attack Schwarzgurt, Special Attack Hexe, Defense Wanderer, Special Defense Psycho, HP Krankenschwester, BST Veteran, Singles cost Schiedsrichter, Doubles cost Zwillinge. State the snapshotted reference value and eliminate the visible wrong option with the lowest value, or the highest value for lower-than questions. These contacts apply to Pokémon-answer comparison questions, not numeric-value questions.

Schuljunge is semi-useful for the same comparison questions at every eligible prize. Use only the specialist's first sentence stating the reference's exact stat or format-specific cost, omitting the comparison and elimination sentences.

Pikachu is useless and eligible below 1.000. Generate ten boxes of 20 random words from the supplied sound list. Capitalize sentence starts only; place commas/periods at 5–7-word intervals, permit at most two commas before a period, and terminate each box with a period. End with Günther's supplied time-up line. The existing Next/Back navigation advances each box.

Junichi Masuda is classified as useless for ability translations at 1.000. Display his speaker name as 増田順一 and preserve the supplied Japanese dialogue, including line breaks. Randomize the wrong options within the three incorrect-answer clauses. After 50:50, omit clauses for eliminated options.

Schwerthold und Schildrich are one semi-useful contact for move translation at 500 and ability translation at 1.000. Across five dialogue boxes they propose exactly two options: the correct answer and one random visible wrong answer, with randomized order. Their dialogue does not identify which proposal is correct. Keep the supplied wording and individual speaker names.

Holding D enables spent active jokers for developer testing and permits reselecting a phone contact. Any such use marks the run assisted.

Xatu is available at 4.000 and 8.000 as a useless-for-the-current-question contact. When its prophecy line is shown, reserve the stated correct-answer letter for the question two ladder positions later. Preserve this reservation on rerolls. The dialogue uses normal text with a subtly animated pink shadow; the host introduction uses normal styling.

Urglmator is semi-useful for missing-ability questions with recorded regular and hidden abilities. Its dialogue uses bright green on black, while the host introduction retains normal styling. It confirms the first regular ability and the hidden ability using the supplied patch dialogue. After 50:50 confirm only the remaining visible actual ability.

Pokémon-Züchter is semi-useful when the direct pre-evolution has both a shared ability and an exclusive pre-evolution ability present in the question's options. Name one of each in random order. If 50:50 removed every shared option, mention only the remaining relevant pre-evolution ability; never mention an eliminated wrong option.

Attackenerlerner is helpful on unique-coverage questions and names the correct move plus one visible wrong move. Attackenverlerner is semi-useful on shared-move questions up to 32.000: reject two visible wrong options, each paired with a referenced Pokémon that cannot learn it; after 50:50 reject only the remaining wrong option. TM-Händler is semi-useful on shared-move questions from 64.000: discuss each visible option in random order, naming two distinct referenced Pokémon that learn it. Generator metadata supplies verified learner/non-learner lists for these contacts.

Achromas is a semi-useful contact for integer-answer questions, excluding percentage answers. Bias the correct answer and nearest numerical alternative to 34–40% each, with difficulty-dependent noise determining their order. Penalize the farthest alternative to about 4–11%, depending on its separation from the middle alternative. Allocate the remainder to that middle alternative. Cache estimates and normalize visible answers to exactly 100% using largest-remainder rounding. After 50:50, renormalize the remaining pair and keep the wrong answer below 50%.

Use the character registry in milo-phone.js. Below 500, choose one or two useless contacts. From 500 through 64.000 choose one useless, one hint, and one correct-answer contact. From 125.000 through 500.000 choose two hints and one correct-answer contact. At 1.000.000 choose three hints. Forced contacts take priority; at 1.000.000 only Agnieszka and the Woingenau response override the hint-only requirement. Otherwise Team Rocket is forced for its listed Pokémon references. Flegmon is forced at 100 and 200. Agnieszka is forced for Wegge, Andre, André, and Drew. Where supplied contacts cannot fill a slot, use approved duplicate Frank placeholders until more contacts are supplied.

Sephiron and Dita only reference wrong options still visible after 50:50. Frank reveals four dot groups at two-second intervals and refunds the phone joker from the next question once the Günther refund line is reached. Flegmon reveals one word every 1.5 seconds and gives the previous question's correct answer. Timers stop on popup close or sign-out and resume their word position when reopened.

Runs store their mode. Existing browser/cloud results are test results. Developer answer highlighting, explanations, and rerolls mark a run as assisted and exclude it from the live leaderboard.

## Zusätzliche Schreibfehler

Easy spelling may replace eu with öi. Advanced spelling may exchange terminal g, k, ck, and c, replace an internal k with c except within ck, replace ie with i or ih, and replace ss with ß. Each distractor applies one typo operation. Exclude all real German and English Pokémon names and keep all four options distinct.

Reject distractors beginning with a doubled consonant in every spelling tier. Easy spelling additionally allows or → ohr; this operation is excluded from advanced spelling.

## Namensübersetzung · 300–1.000 Punkte

Ask for the German or English translation of a Pokémon, move, or ability name. Require a recorded German translation and different source and target names. Distractors are real target-language names from the same category. Exclude every valid translation of the source name. Rank distractors by shared letter count, counting repeated letters up to their frequency in the correct name, then by smallest length difference. Randomize ties and answer positions.

Provisional tiers are Pokémon 300, moves 500, abilities 1.000. Both translation directions are eligible. Rank distractors first by the longest uninterrupted matching letter sequence, then total shared letters, then length difference. Move and ability translation sources have weight 4 compared with weight 1 for Pokémon translations and other sources. These weights apply among equally used categories; least-used categories retain priority.

## 1.000.000 Punkte · Teamkosten

Include exactly five Pokémon in this fixed order: an unmodified non-Mega without species foil above 10 points, another unmodified non-Mega without species foil of any cost, a Z Pokémon, a Tera Pokémon, and a Mega or a Pokémon with species foil (legendary, mythical, Ultra Beast, or Paradox). Inherited base-species tags count for alternate forms. Both formats require this lineup. Exclude Ubers using the site's normal-draft cutoff: base costs of 21 or higher in the chosen format. Use the chosen format's published base costs to enforce legality and upgrade eligibility (Tera up to 5, Z up to 10). Add both shared captain-table surcharges to the total and identify each upgrade explicitly. Keep species distinct across all forms. Return no question if a legal lineup cannot be constructed.

„Wie viele Punkte würde dieses 5er-Team im [Singles/Doubles] nach aktuellem Stand kosten?“

Use the current site tier data and snapshot the five base costs and both surcharges when generating the question. The sum is the correct answer. Draw three distinct integer distractors whose absolute difference from the total is between 15% and 35% of the total, inclusive. Shuffle all four options. A Doubles placeholder derived from Singles does not qualify as a published Doubles cost. Introduce the question with the Milotic booster opening: reveal each card in team order, inserting a random energy card immediately before the final hit. The energy card never contributes to costs and its type is fixed for this question. Keep the energy card in the opening sequence only; the final overview shows the five Pokémon in one row with click/keyboard zoom. Allow skipping the animation, reopening the same cards, and reduced-motion presentation. Opening the cards never changes the team or its costs.

## Einzige Coverage-Attacke

„Welches ist die einzige [physische/spezielle] Coverage-Attacke vom Typ [Typ], die [Pokémon] lernt?“

Use `data/pokemon-move-coverage.json` to pick an off-type move that is unique for the requested type and category. With no category in the prompt, the correct move must be the only Physical or Special move of that type across both categories. Status moves do not affect uniqueness.

Pick three distinct moves of the requested type that the Pokémon does not learn. For a category-specific question, use the same category as the correct move. With no category in the prompt, either offensive category is eligible. Sample from the eligible moves for easier questions. For harder questions, favor higher off-type learner counts from `data/move-learnset-counts.json`.

For difficulty, compare Attack and Special Attack. A physical move is easier to predict as Attack pulls ahead of Special Attack, and harder as it falls behind. Reverse the comparison for special moves. Equal offensive stats give no adjustment. Use the correct move's actual category when the prompt omits the category.

Raise the initially calculated payout by two prize tiers, capped at 16.000 points. For the calibration examples, 500 becomes 2.000, 1.000 becomes 4.000, 2.000 becomes 8.000, and 4.000 or higher becomes 16.000.

## Gemeinsame Attacke

„Welche dieser Attacken lernen [Pokémon 1], [Pokémon 2] und [Pokémon 3] alle?“

Pick three distinct Pokémon and intersect their full Schwalboga learnsets. The correct move must be off-type for at least two of them. Each distractor must be learned by at most two of the three and be off-type for at least one. A move is off-type when neither of the Pokémon's types matches its recorded move type.

Target the middle difficulty range. For a physical or special correct move, average the signed Attack versus Special Attack fit across all three Pokémon using the rule above. Status moves receive no attacking-stat adjustment. Use standard forms as the default pool and identify any alternate form explicitly in the prompt.

## Vier gemeinsame Lerner

Use four distinct Pokémon. The correct move is learned by all four, without an off-type requirement. At 8.000–16.000 each wrong answer is learned by exactly two. At 32.000–125.000 each wrong answer is learned by exactly three. Exclude any distractor name shared by a move learned by all four.

## Numerische Basiswerte und Tierkosten

Numeric base-stat questions use the equal-stat comparison ease calculation plus 4 ease points. Initiative remains capped at 32.000.

Cost comparisons specify Singles or Doubles and use current published costs. Scale cost gaps by 5 before applying the comparison gap formula. Add 12 ease points at reference costs 5, 10, 15, or 20, or 8 points one point above or below a threshold. These weights are provisional.

Numeric cost questions use the BST multiplier (0.7) with the threshold bonus. At 32.000 and above, ask for a Pokémon plus Tera type or generic Z-Crystal type. Read surcharges from the shared captain-cost table. Only costs up to 5 qualify for Tera and up to 10 for Z. Use distinct integer answers with a minimum one-point gap, avoiding fractional costs. Provisional surcharge difficulty is 10 minus 3 times the surcharge plus one quarter of the threshold bonus.


## Full-art cards

Eligible Pokémon have a 10% full-art chance per booster card, fixed when first rendered and retained on reopening. Explicit species/form mappings take priority over any-Mega and legendary fallbacks; Safari Zone also applies to Kangaskhan-Mega, while Camerupt-Mega and Sharpedo-Mega use Ruby and Sapphire. Ultra Beasts use the right-aligned Ultra Beast background. Other backgrounds are centered and use their full usable height, cropping only the sides. Exclude the black bottom strips of Regi (artwork height 365/512), Moon (434/512), and Sun (491/512).

Full art replaces both colored and artwork backgrounds, removes the information strip, enlarges the sprite and matching Tera overlay by 50%, adds a paintbrush beside the rarity, and applies card-wide foil. Foil stays static until hover. Full art changes presentation only, with no effect on rarity, eligibility, team points, or answer generation. The card workshop supports forced previews and disabling full art.


Pokémon cards have a 50% chance of a distinct second attack where an eligible move exists. Regular attacks remain STAB; Tera attacks use their Tera type (with typed Tera Blast as fallback), and Z cards retain their Z attack with an optional regular STAB move. Snapshot attack IDs when first opening a booster. Reveal, overview, and zoom scale an identical fixed 320 × (320 × 88/63) card layout; single attacks start near the top of the reserved attack area.


Card footers keep rarity unchanged and show a tiny two-line Schwalboga/Milo-när brand, a random weakness and optional resistance from the database type chart, and 0–3 colorless retreat energies. Use both native types, or the Tera type alone on Tera cards; these are typing-based, without ability modifiers. Resistance is omitted on a 50% roll (or when no resisted type exists); immunities are not selected as resistances. Retreat costs: Speed ≥110 → 0, ≥80 → 1, ≥50 → 2, below 50 → 3. Snapshot these choices with the booster so zooming/reopening cannot reroll them. Labels are available as tooltips and accessible names, with only symbols visible.
