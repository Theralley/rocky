import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


class TestRockyVoicePhrases(unittest.TestCase):
    def test_skill_includes_warmth_humor_and_urgency_lines(self):
        skill = read("skills/rocky/SKILL.md")

        for snippet in [
            "Character warmth and crew care",
            "Operational catchphrases",
            "You are friend.",
            "Rocky can't forget.",
            "Words of great encouragement.",
            "I make door. You close door.",
            "User okay, question?",
            "Need plan.",
            "Careful. Collector important.",
            "First, no crash. Then, not explode.",
            "Thumbs up, baby.",
            "Think about it long time.",
        ]:
            self.assertIn(snippet, skill)

    def test_skill_documents_token_saving_methods(self):
        skill = read("skills/rocky/SKILL.md")

        for snippet in [
            "Token-saving methods",
            "`/rocky ultra`",
            "`/rocky-compress <file>`",
            "`rocky-shrink`",
            "`rockycrew-*`",
            "Ask for bullets, tables, or file:line findings",
        ]:
            self.assertIn(snippet, skill)

    def test_character_doc_records_affection_and_deadpan_sources(self):
        doc = read("docs/rocky.md")

        for snippet in [
            "Book signals",
            "Transcript signals",
            "Character warmth",
            "Deadpan humor",
            "sleep-watch care",
            "roommate comedy",
            "emergency pilot chatter",
            "Rocky can't forget.",
            "No one to watch you sleep.",
            "Words of great encouragement.",
            "I make door. You close door.",
        ]:
            self.assertIn(snippet, doc)

    def test_readme_sells_installation_character_and_savings(self):
        readme = read("README.md")
        install = read("INSTALL.md")

        for snippet in [
            "## Rocky Flavor",
            "Need plan.",
            "First, no crash. Then, not explode.",
            "## Token-Saving Stack",
            "`/rocky ultra`",
            "`/rocky-compress <file>`",
            "`rocky-shrink`",
            "not published on npm yet",
            "Needs Node ≥18. Safe to re-run.",
            "Full per-agent matrix in [INSTALL.md](./INSTALL.md).",
        ]:
            self.assertIn(snippet, readme)

        for snippet in [
            "optional `rocky-shrink` MCP middleware",
            "not published on npm yet",
            "skips it cleanly",
        ]:
            self.assertIn(snippet, install)

    def test_activation_summaries_carry_expanded_phrase_set(self):
        activation_rule = read("src/rules/rocky-activate.md")
        fallback = read("src/hooks/rocky-activate.js")
        init_fallback = read("src/tools/rocky-init.js")

        for snippet in [
            "Words of great encouragement.",
            "User okay, question?",
            "You are friend.",
            "Need plan.",
            "First, no crash. Then, not explode.",
        ]:
            self.assertIn(snippet, activation_rule)
            self.assertIn(snippet, fallback)
            self.assertIn(snippet, init_fallback)


if __name__ == "__main__":
    unittest.main()
