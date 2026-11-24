# Milo-när: bonus lifelines and highscore storage

For an existing installation, run `supabase/milo-lifelines.sql` in the Supabase SQL editor before testing the updated quiz. For a new installation, `supabase/milo-highscores.sql` already includes these changes.

The migration preserves existing results and access policies. It adds a four-slot JSON lifeline history and a generated usage count, allows integer scores from 0 to 1,000,000 (needed for Zerschneider deductions), and orders equal scores by fewer used lifelines, then creation time and ID. It is safe to run again.

Historical results have no recorded lifeline history; their usage count defaults to zero. New results record each lifeline as used or unused. Reopening the same audience/phone call does not count again; a refunded telephone call still records that the telephone lifeline was used. Safe Mode's fourth slot is blank.

Zerschneider deducts the skipped ladder value once from the final payout, including a safety-point payout after a wrong answer. Results have a minimum of zero. Amnesie keeps the current ladder payout but generates a question for the previous ladder value; it is unavailable on the first question because there is no previous level, and above 16,000.

Until the migration is applied, new cloud highscore requests will fail; the existing local retry queue retains finished results for synchronization after the migration.
