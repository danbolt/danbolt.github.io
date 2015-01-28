
/*
 * To minimize HTML traffic and make caching more efficent, the content is
 * rendered without reloading the page. URLs are still preserved though, and
 * pages can be served statically.
 *
 * That means you can share a URL to a specific bit page, without having
 * to navigate by browser as well.
 */


var contentPrepend = 'content/';
var contentPostpend = '.json';

window.addEventListener("popstate", function(e)
{
  loadContent(location.pathname.replace('/', '').replace('.html', ''));
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

    if (name == 'work')
    {
      $('#content').addClass('workDetails');
    }
    else
    {
      $('#content').removeClass('workDetails');
    }

    history.pushState(null, 'pageState', name + '.html');
  }

  var errorFindingContent = function()
  {
    $('#content').html("<h1>Problem!</h1><p>Looks like there was an issue loading the content you selected. Try refreshing the page!</p>");
  }

  if (name == '')
  {
    name = 'index';
  }

  getJSON(contentPrepend + name + contentPostpend);
}
