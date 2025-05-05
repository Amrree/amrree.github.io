---
layout: default
title: Blog
permalink: /blog/
---

<div class="post-content">
  <h1>Blog</h1>
  
  <div class="posts-list">
    {% for post in site.posts %}
      <article class="post-card">
        <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
        <div class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
        </div>
        <p>{{ post.excerpt }}</p>
        <a href="{{ post.url }}" class="read-more">Read More</a>
      </article>
    {% endfor %}
  </div>
</div>

{% include footer.html %}
