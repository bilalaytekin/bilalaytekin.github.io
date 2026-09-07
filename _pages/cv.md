---
layout: archive
title: ""
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* B.S. in Computer Engineering and Mathematics, Bogazici University, 2023
* Ph.D. in Mathematics, University of Maryland, 2023-

Publications
======
  <ul>{% for post in site.publications %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Talks
======
  <ul>{% for post in site.talks %}
    {% include archive-single-talk-cv.html %}
  {% endfor %}</ul>
  
Service
======
  <ul>{% for post in site.service %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>