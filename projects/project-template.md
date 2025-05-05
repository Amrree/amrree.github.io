---
layout: default
title: {{ title }}
permalink: /projects/{{ slug }}/
---

<div class="project-page">
  <div class="project-header">
    <h1>{{ title }}</h1>
    <div class="project-meta">
      <p class="developer-info">{{ developer }}</p>
      <p class="location">{{ location }}</p>
    </div>
  </div>

  <div class="project-content">
    {{ content }}
  </div>

  <div class="project-features">
    <h2>Features</h2>
    <ul>
      {% for feature in features %}
      <li>{{ feature }}</li>
      {% endfor %}
    </ul>
  </div>

  <div class="project-installation">
    <h2>Installation</h2>
    <pre><code>{{ installation }}</code></pre>
  </div>

  <div class="project-usage">
    <h2>Usage</h2>
    <pre><code>{{ usage }}</code></pre>
  </div>
</div>

{% include footer.html %}
