---
layout: home
title: Amre PixelWitch
---

# Welcome to My Digital Space

I am Amre PixelWitch, an Irish woman living at the intersection of code and creativity. I am a mother, a lover, and a writer who finds beauty in both the digital and physical worlds.

## My Roles

### Mother
Nurturing life and growth

### Lover
Connecting hearts and minds

### Writer
Weaving words and stories

### Developer
Building digital worlds

## Latest Work

{% for post in site.posts limit:3 %}
  <article class="post-excerpt">
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p>{{ post.excerpt }}</p>
  </article>
{% endfor %}
