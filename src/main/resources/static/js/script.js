function updatePlaylist(){
    $.ajax({
        url: 'http://localhost:8080/song/',
        method: 'GET',
        success: function(data){
            $("tbody").empty();
            $.each(data, function(){
               $("tbody").append(
                    "<tr class='bg-white border-b dark:bg-gray-900 dark:border-gray-700'><td class='py-4 px-6'>"+this.name+"</td><td class='py-4 px-6'>"+this.artist+"</td><td class='py-4 px-6'>"+this.album+"</td><td class='py-4 px-6'>"+this.duration+"</td><td class='py-4 px-6' id='"+this.id+"'><a href='#' onclick='edit(event)' data-modal-toggle='new-song-modal' type='button' data-modal-toggle='edit-song-modal' class='edit font-medium text-blue-600 dark:text-blue-500 hover:underline'><i class='fa-solid fa-lg fa-pen-to-square'></i></a><a href='#' onclick='remove(event)' class='font-medium text-red-600 ml-3 dark:text-red-500 hover:underline'><i class='fa-solid fa-lg fa-trash'></i></a></td></tr>"
               )
            });
        }
    });
}

function edit(event){
    let id = $(event.currentTarget.parentNode).attr('id');
    $.ajax({
        url:'http://localhost:8080/song/'+ id,
        method: 'GET',
        success: function(data){
            $("#songName").val(data.name);
            $("#songArtist").val(data.artist);
            $("#songAlbum").val(data.album);
            $("#songDuration").val(data.duration);
            $("#typeOfOperation").val("UPDATE");
            $("#songId").val(id);
            const modal = new Modal(document.getElementById('new-song-modal'));
            modal.show();
        }
    })
}

function remove(event){
    let id = $(event.currentTarget.parentNode).attr('id');
    $.ajax({
        url:'http://localhost:8080/song/'+ id,
        method: 'DELETE',
        success: function(){
            updatePlaylist();
        }
    })
}

function removeModalBackdrop(){
    $("body > div").remove();
}

$(document).ready(updatePlaylist);

$("#modal-form").submit(function(event){
    event.preventDefault();
    let song = {
        name : $("#songName").val(),
        artist : $("#songArtist").val(),
        album : $("#songAlbum").val(),
        duration : parseInt($("#songDuration").val())
    }

    let typeOfOperation = $("#typeOfOperation").val();
    if(typeOfOperation == 'CREATE')
        create(song);
    else if(typeOfOperation == 'UPDATE')
        update(song, $("#songId").val());
    else
        alert('Invalid operation');
    const modal = new Modal(document.getElementById('new-song-modal'));
    modal.hide();
    removeModalBackdrop();

});

function create(song){
     $.ajax({
        url:'http://localhost:8080/song/',
        method: 'POST',
        data: JSON.stringify(song),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function(){
            updatePlaylist();
            $("#modal-form")[0].reset();
        }
     })
}

function update(song, id){
     $.ajax({
        url:'http://localhost:8080/song/' + id,
        method: 'PUT',
        data: JSON.stringify(song),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function(){
            updatePlaylist();
            $("#modal-form")[0].reset();
            const modal = new Modal(document.getElementById('new-song-modal'));
            modal.hide();
        }
     })
}