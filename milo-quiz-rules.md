# Wer wird Milo-när?

## Spielmodi und Joker

Choose Safe Mode or Risk Mode before starting. Safe Mode has checkpoints at 500, 16.000, and 1.000.000. Risk Mode removes the 16.000 checkpoint. Its extra choice-joker slot remains reserved until the larger joker selection is defined.

50:50 is usable once per run. The audience joker stores manual counts for all four answers and can reopen repeatedly for its original question. Moving to another question, including a developer reroll, expires it. The telephone joker reveals three contacts only when activated, reserves the joker at that point, and keeps the selected contact and dialogue position for the same question.

## Telefonkontakte

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

Allow at most one Mega. Include one Mega in Singles whenever the priced pool permits. Include exactly one non-Mega Pokémon with a Tera or Z upgrade, using the format's published base cost to enforce eligibility (Tera up to 5, Z up to 10). Add the shared captain-table surcharge to the total and identify the upgrade explicitly. Keep species distinct across all forms.

„Wie viele Punkte würde dieses 4er-Team im [Singles/Doubles] nach aktuellem Stand kosten?“

Draw four distinct Pokémon with published costs for the chosen format. Use the current site tier data and snapshot the four costs when generating the question. The sum is the correct answer. Draw three distinct integer distractors whose absolute difference from the total is between 15% and 35% of the total, inclusive. Shuffle all four options. A Doubles placeholder derived from Singles does not qualify as a published Doubles cost.

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
