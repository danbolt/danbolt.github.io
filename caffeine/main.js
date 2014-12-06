
var contentPrepend = 'content/';
var contentPostpend = '.json';

window.addEventListener("popstate", function(e)
{
  loadContent(location.pathname.replace('/', ''));
});

/*
 * setContentBorder(name)
 *
 * Sets the border of the element whose id is
 *       #<<name>>Button
 */
var setContentBorder = function(name)
{
  $('.navIcon').css('border', 'none');

  if (name)
  {
    $('#' + name + 'Button').css('border', '1px solid');
  }
}

/*
 * loadContent(name)
 *
 * Loads an object from a JSON file and fills the 'content' element with the
 * text in the 'content' DOM element with whatever is in its 'content' field.
 */
var loadContent = function(name)
{
  setContentBorder(name);

  var getJSON = function(url)
  {
    $.get(url)
    .done(applyContent)
    .fail(errorFindingContent);
  }

  var applyContent = function(data)
  {
    $('#content').html(data.content);

    history.pushState(null, 'pageState', name);
  }

  var errorFindingContent = function()
  {
    $('#content').html("<h1>Problem!</h1><p>Looks like there was an issue loading the content you selected. Try refreshing the page!</p>");
  }

  getJSON(contentPrepend + name + contentPostpend);
}
