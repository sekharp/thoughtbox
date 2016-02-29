$(document).ready(function() {
  getLinks();
  createLink();
  deleteLink();
  editTitle();
  editUrl();
});

function renderLink(link) {
  $("#latest-links").prepend(
    "<div class='link' data-id='" +
    link.id +
    "'><h6>Published on " +
    link.created_at +
    "</h6><p>" +
    "<b id='link-title' contentEditable='true'>" +
    link.title +
    "</b><p id='link-url' contentEditable='true'>" +
    link.url +
    "</p><p id='link-quality" +
    link.id +
    "'>Read: " +
    link.read +
    "<p><button id='change-link-status" +
    link.id +
    "' name='button-fetch' class='btn btn-default btn-xs'>Change Status</button>" +
    "</p>" +
    "<button id='delete-link' name='button-fetch' class='btn btn-default btn-xs'>Delete</button>" +
    "</div>"
  );
    changeLinkStatus(link.id);
}

function getLinks() {
  $.getJSON('api/links.json')
    .then(function(links){
      $.each(links, function(index, link){
        renderLink(link);
    });
  });
}

function createLink() {
  $('#create-link').on('click', function(){
    var linkTitle  = $('#link-title').val();
    var linkurl   = $('#link-url').val();
    var linkParams = {
      link: {
        title: linkTitle,
        url: linkurl
      }
    };

    $('#link-title').val('');
    $('#link-url').val('');

    $.post("api/links.json", linkParams, $(this).serialize())
      .done(renderLink);
  });
}

function deleteLink() {
  $('#latest-links').delegate('#delete-link', 'click', function() {
    var $link = $(this).closest('.link');

    $.ajax({
      type: 'DELETE',
      url: 'api/links/' + $link.attr('data-id') + '.json',
      success: function(response) {
        $link.remove();
      }
    });
  });
}

function changeLinkStatus(id) {
  $('#change-link-status' + id).on('click', function(){
    event.preventDefault();

    $.getJSON('/api/links/' + id, function(link){
      if (link.read === false){
          var newStatus = true;
        } else { var newStatus = false; }

      $.ajax({
        type: 'PUT',
        url: '/api/links/' + id + '.json',
        data: {
          link: {read: newStatus}
        },
        success: function(link){
          $('#link-quality' + id).html("Read: " + newStatus);
        }
      });
    });
  });
}

function editTitle() {
  $('#latest-links').delegate('#link-title', 'keydown', function(event) {
    if(event.which == 13 || event.keyCode == 13){
      var $title = event.currentTarget.textContent;
      var $id = $(this).closest('.link').attr('data-id');
      var params = {
        link: {
          title: $title,
        }
      };
      event.preventDefault();
      this.blur();
      $.ajax({
        type: 'PUT',
        url: '/api/links/' + $id + '.json',
        data: params,
        success: function(link){
        }
      });
    }
  });
}

function editUrl() {
  $('#latest-links').delegate('#link-url', 'keydown', function(event) {
    if(event.which == 13 || event.keyCode == 13){
      var $url = event.currentTarget.textContent;
      var $id = $(this).closest('.link').attr('data-id');
      var params = {
        link: {
          url: $url,
        }
      };
      event.preventDefault();
      this.blur();
      $.ajax({
        type: 'PUT',
        url: '/api/links/' + $id + '.json',
        data: params,
        success: function(link){
        }
      });
    }
  });
}
