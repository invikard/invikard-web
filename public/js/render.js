function renderHello() {
  var template = document.getElementById('template').innerHTML;
  var rendered = Mustache.render(template, { name: 'Luke' });
  document.getElementById('target').innerHTML = rendered;
}
