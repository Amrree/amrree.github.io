---
layout: default
title: Art Piece Title
permalink: /art/:title/
---

<div class="art-piece">
  <div class="art-header">
    <h1>{{ title }}</h1>
    <div class="art-meta">
      <p class="art-type">Digital Art</p>
      <p class="art-date">Created: {{ date }}</p>
    </div>
  </div>

  <div class="art-content">
    <div class="art-image">
      <img src="{{ image }}" alt="{{ title }}">
    </div>

    <div class="art-details">
      <h2>Description</h2>
      <p>{{ description }}</p>

      <h2>Key Elements</h2>
      <ul>
        {% for element in key_elements %}
        <li>{{ element }}</li>
        {% endfor %}
      </ul>

      <h2>Screenshots</h2>
      <div class="screenshot-grid">
        {% for screenshot in screenshots %}
        <img src="{{ screenshot }}" alt="Screenshot of {{ title }}">
        {% endfor %}
      </div>
    </div>
  </div>
</div>

{% include footer.html %}
