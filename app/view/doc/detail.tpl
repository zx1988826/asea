<html>
  <head>
    <title>Hacker Newdasdasds</title>
    <link rel="stylesheet" href="/public/css/doc.css" />
  </head>
  <body>
    <h1>{{ helper.relativeTime(item.time) }}</h1>
    dsadasd
    <ul class="doc-view view">
      {% for item in list %}
        <li class="item">
          <a href="{{ item.url }}">{{ item.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </body>
</html>