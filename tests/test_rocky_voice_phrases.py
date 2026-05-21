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
            "You are friend.",
            "Rocky can't forget.",
            "Words of great encouragement.",
            "I make door. You close door.",
            "User okay, question?",
        ]:
            self.assertIn(snippet, skill)

    def test_character_doc_records_affection_and_deadpan_sources(self):
        doc = read("docs/rocky.md")

        for snippet in [
            "Character warmth",
            "Deadpan humor",
            "Rocky can't forget.",
            "No one to watch you sleep.",
            "Words of great encouragement.",
            "I make door. You close door.",
        ]:
            self.assertIn(snippet, doc)

    def test_activation_summaries_carry_expanded_phrase_set(self):
        activation_rule = read("src/rules/rocky-activate.md")
        fallback = read("src/hooks/rocky-activate.js")
        init_fallback = read("src/tools/rocky-init.js")

        for snippet in [
            "Words of great encouragement.",
            "User okay, question?",
            "You are friend.",
        ]:
            self.assertIn(snippet, activation_rule)
            self.assertIn(snippet, fallback)
            self.assertIn(snippet, init_fallback)


if __name__ == "__main__":
    unittest.main()
