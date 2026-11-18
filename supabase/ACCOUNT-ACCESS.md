# Account permissions

Apply `account-access-migration.sql` once in the Supabase SQL editor **before deploying the JavaScript changes**. Both existing tables (`cost-system.sql` and `milo-highscores.sql`) must already exist. The migration is transactional: an error rolls back all changes.

It matches existing accounts using one-time email fingerprints and copies their current tier, replay-admin, and quiz assignments into `auth.users.raw_app_meta_data.site_access`. It also snapshots each existing account's replay aliases, email prefix and current display name to preserve replay visibility. Fingerprints are pseudonymous matching values, not secrets; email hashes can be guessed. Runtime authorization never uses them. Accounts not yet created cannot be migrated automatically.

After applying the migration, sign out and back in on the main site and quiz to issue fresh tokens. Deploy the JavaScript only after verifying the migrated assignments. Old pages remain usable while the migration runs; database policies require fresh tokens afterward.

Check assignments privately in the SQL editor:

```sql
select id, email, raw_app_meta_data->'site_access' as site_access
from auth.users order by created_at;
```

Keep this result private. Confirm the two tier editors, two replay administrators, quiz administrator, and five explicitly assigned replay players retain their intended rights. Test a regular account and a signed-out visitor too.

For a new account, set the following structure through a trusted Supabase administrator or SQL editor. Preserve unrelated app metadata. Never store authorization in `user_metadata`, which users can edit.

```json
{
  "site_access": {
    "permissions": {
      "edit_costs": false,
      "view_all_replays": false,
      "play_milo": false
    },
    "replay_players": ["assigned-showdown-player"]
  }
}
```

The account UUID remains the identity used for score ownership and cost-change attribution. Permissions are checked against admin-controlled app metadata in both the interface and database policies. Token refresh is required after changes; existing tokens retain their claims until refreshed or expired. Do not rerun the bootstrap migration after manually changing permissions, since it restores legacy assignments.

Doubles viewing currently has no account restriction in the existing code; this change preserves that behavior. Tier editing retains its existing account restriction.

Replay HTML, replay catalogs, quiz scripts and question data are static public files. Their UI gates do not prevent direct downloads. Real replay/question confidentiality requires moving those assets behind server-enforced access checks. Changing identifiers cannot make GitHub Pages files private.

This change removes permission-related email literals from current source files. It does not remove previously published emails from Git history or existing clones. The public replay submission contact address remains intentionally visible.
