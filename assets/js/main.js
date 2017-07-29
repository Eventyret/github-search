$(document).ready(function(){
    
    // console.log('We are Ready')
    $('#userSearch').on('keyup', function(){
        var username = e.target.value;

    // Make API request to Github
    $.ajax({
        url:'https://api.github.com/users/' +username,
        data:{
            client_id: clientid,
            client_secret: clientsecret
        }
    });

    });

});