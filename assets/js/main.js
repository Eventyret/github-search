$(document).ready(function () {

    // console.log('We are Ready')
    $('#userSearch').on('keyup', function (e) {
        var username = e.target.value;

        // Make API request to Github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: clientid,
                client_secret: clientsecret
            }
        }).done(function(userData) {
            $('#profile').html(`
            <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">${userData.name}</h3>
            </div>
            <div class="panel-body">
              <div class="row">
              <div class="col-md-3">
              <img src="${userData.avatar_url}" class="thumbnail gitavatar">
              </div>
              <div class="col-md-9">
              
              </div>
              </div>
            </div>
          </div>
            `)
        });
    });
});