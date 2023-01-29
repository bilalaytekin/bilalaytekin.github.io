---
layout: archive
title: "Writing"
permalink: /writing/
author_profile: true
---

{% if author.arxiv %}
  You can also find my articles on <u><a href="{{author.arxiv}}">my arXiv page</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}

## Notes

- MATH525: [Algebraic Number Theory (Spring '22)](../files/math525_notes.pdf).
- MATH522: [Algebra I (Fall '22)](../files/math522_notes.pdf).