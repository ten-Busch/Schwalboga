# Booster collection setup

Apply [booster-collection.sql](booster-collection.sql) once in this project's Supabase SQL editor before deploying the game. It adds only the `booster_players`, `booster_packs`, and `booster_cards` tables and the `booster_collect_pack` function. Existing cost, permission and Milo highscore tables are not altered. No extra account permission is needed: every signed-in account can play.

The tables use row-level security. Accounts can read their own progress and cards; only the authenticated RPC can credit cards. Pack UUID receipts make retries idempotent, and a per-account lock makes concurrent tabs safe. The five main cards, optional sixth Energy Foil Pokémon, and pack counter are credited atomically. Ordinary Energy cards are never stored. Existing installations must apply `booster-energy-foil.sql` to accept six-card packs. Full arts, moves and footer choices are frozen by the shared renderer before crediting.

The client retains uncredited packs in browser storage under an account-specific key, then removes them after successful account synchronization. This is a retry queue, not the collection's source of truth. Closing before the overview resumes the same pack. After reaching the overview, a failed save can be retried without changing cards or crediting duplicates. On another browser, already saved cards are loaded from Supabase; an uncredited local pack remains on its original browser.

The collection merges duplicates by Pokémon/form, normal/Mega/Tera/Z variant, type and full-art finish. It retains one rendered example and a count for each combination. Dex slots combine forms by national Dex number. Counters include duplicate copies, with full art counted separately from base rarity.

Before enabling the game, verify with two regular accounts that collections are separate, that reopening/retrying one pack UUID credits the same five or six Pokémon cards exactly once, and that signed-out requests cannot read or credit progress. The feature has no competitive rewards; pack contents and rarity are client-generated.

## Admin testing controls

Apply `booster-admin.sql` to enable the Admin collection editor. It uses the existing `play_milo` permission in server-managed app metadata, verifies the caller's account ID, and edits only that administrator's own collection. Regular users gain no write access. The editor can add a specific catalog version, edit/delete copy counts, clear the selected set or entire collection, and change the total opened-pack counter. Clearing cards retains pack receipts and the pack counter; receipts prevent an old retry from recreating deleted cards. Local pending packs for the cleared scope are removed from that browser. The total pack counter is independent of manually edited card counts.
