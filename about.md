---
layout: default
title: About
permalink: /about/
---

<div class="post-content">
  <h1>About Me</h1>
  
  <div class="about-grid">
    <div class="about-content">
      <div class="profile-section">
        <img src="{{ site.profile.picture }}" alt="{{ site.profile.alt }}" class="profile-image">
        <div class="social-links">
          <a href="https://twitter.com/{{ site.profile.social.twitter }}" target="_blank">Twitter</a>
          <a href="https://github.com/{{ site.profile.social.github }}" target="_blank">GitHub</a>
          <a href="https://linkedin.com/in/{{ site.profile.social.linkedin }}" target="_blank">LinkedIn</a>
          <a href="https://instagram.com/{{ site.profile.social.instagram }}" target="_blank">Instagram</a>
        </div>
      </div>
      
      {{ content }}
      
      <div class="gallery">
        <h2>More Photos</h2>
        <div class="gallery-grid">
          <img src="/assets/images/bio/image2.jpg" alt="Photo of Amre PixelWitch">
          <img src="/assets/images/bio/image3.jpg" alt="Photo of Amre PixelWitch">
          <img src="/assets/images/bio/image4.jpg" alt="Photo of Amre PixelWitch">
        </div>
      </div>
    </div>
    
    <div class="about-sidebar">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/art/">My Art</a></li>
        <li><a href="/coding/">My Code</a></li>
        <li><a href="/writing/">My Writing</a></li>
        <li><a href="/blog/">Blog</a></li>
      </ul>
    </div>
  </div>
</div>

{% include footer.html %}
