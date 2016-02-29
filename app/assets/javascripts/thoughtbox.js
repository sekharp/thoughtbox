$(document).ready(function() {
  getlinks();
  createlink();
  deletelink();
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
    url +
    "</p><p id='link-quality" +
    link.id +
    "'>Quality: " +
    link.quality +
    "<p><button id='upvote-link" +
    link.id +
    "' name='button-fetch' class='btn btn-default btn-xs'>+</button>" +
    "  <button id='downvote-link" +
    link.id +
    "' name='button-fetch' class='btn btn-default btn-xs'>-</button>" +
    "</p>" +
    "<button id='delete-link' name='button-fetch' class='btn btn-default btn-xs'>Delete</button>" +
    "  <button id='edit-link' name='button-fetch' class='btn btn-default btn-xs'>Edit</button>" +
    "</div>"
  );
    upvotelink(link.id);
    downvotelink(link.id);
}

function getlinks() {
  $.getJSON('api/links.json')
    .then(function(links){
      $.each(links, function(index, link){
        renderlink(link);
    });
  });
}

function createlink() {
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
      .done(renderlink);
  });
}

function deletelink() {
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

function upvotelink(id) {
  $('#upvote-link' + id).on('click', function(){
    event.preventDefault();

    $.getJSON('/api/links/' + id, function(link){
      var newQuality = function(){
        if (link.quality === 'swill'){
          return 'plausible';
        } else { return 'genius'; }
      };

      $.ajax({
        type: 'PUT',
        url: '/api/links/' + id + '.json',
        data: {
          link: {quality: newQuality}
        },
        success: function(link){
          $('#link-quality' + id).html(newQuality);
        }
      });
    });
  });
}

function downvotelink(id) {
  $('#downvote-link' + id).on('click', function(){
    event.preventDefault();

    $.getJSON('/api/links/' + id, function(link){
      var newQuality = function(){
        if (link.quality === 'genius'){
          return 'plausible';
        } else { return 'swill'; }
      };

      $.ajax({
        type: 'PUT',
        url: '/api/links/' + id + '.json',
        data: {
          link: {quality: newQuality}
        },
        success: function(link){
          $('#link-quality' + id).html(newQuality);
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
