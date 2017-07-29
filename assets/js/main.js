$(document).ready(function () {

    // console.log('We are Ready')
    $('#userSearch').on('keyup', function (e) {
        var username = e.target.value;

        // Make API request to Github
        $.ajax({
            url: 'https://api.github.com/users/'+username,
            data: {
                client_id: clientid,
                client_secret: clientsecret,
                sort: 'created: asc',
                per_page: 5
            }
        }).done(function(userData) {
            $.ajax({
                url: 'https://api.github.com/users/'+username+'/repos'
            }).done(function(repoData){
                $.each(repoData, function(index, repoData){
                    $('#repos').append(`
                    <div class="well">
                        <div class="row">
                            <div class="col-md-6">
                            <strong>${repoData.name}</strong> is written in mostly: <strong>${repoData.language}</strong>
                            </div>
                            <div class="col-md-4">
                                <span class="label label-default">Public Repos: ${repoData.forks_count}</span>
                                <span class="label label-default">Public Gists: ${repoData.watchers_count}</span>
                                <span class="label label-info">Followers: ${repoData.stargazers_count}</span>
                                
                            </div>
                            <div class="col-md-2">
                                <a href="${repoData.html_url}" class="btn btn-primary" target="_blank">Visit Repo</a>

                            </div>
                        </div>
                    </div>
                    `);
                });
            });
            $('#profile').html(`
            <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="text-center">Github Profile of ${userData.name}</strong></h3>
            </div>
            <div class="panel-body">
              <div class="row">
              <div class="col-md-3">
              <img src="${userData.avatar_url}" class="gitavatar img-responsive">
              <a href="${userData.html_url}" class="btn btn-default btn-block" target="_blank"><i class="fa fa-github"></i> Visit Profile</a>
              </div>
              <div class="col-md-9">
              <span class="label label-default">Public Repos: ${userData.public_repos}</span>
              <span class="label label-default">Public Gists: ${userData.public_gists}</span>
              <span class="label label-info">Followers: ${userData.followers}</span>
              <span class="label label-warning">Following: ${userData.following}</span>
              <br><br>
              <ul class="list-group">
              <li class="list-group-item">Company: ${userData.company || 'No Info'}</li>
              <li class="list-group-item">Location: ${userData.location || ''}</li>
              <li class="list-group-item">Website: <a href="${userData.blog || ''}" target="_blank" class="label label-primary">Visit Website</a></li>
              <li class="list-group-item">Member Since: ${userData.created_at}</li>
              </ul>
              </div>
              </div>
            </div>
          </div>

          <h3 class="page-header">Latest Repos</h3>
          <div id="repos">
          
          </div>
            `);
        });
    });
});