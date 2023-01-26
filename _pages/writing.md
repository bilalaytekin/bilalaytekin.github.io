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
