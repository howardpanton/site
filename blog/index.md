---
layout: post
title: UAL Development Blog
category : lessons
tagline: "Supporting tagline"
tags : [intro, beginner, jekyll, tutorial]
---

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
<p>test 3</p>
