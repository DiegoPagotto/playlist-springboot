function updatePlaylist(){
    $.ajax({
        url: 'http://localhost:8080/song/',
        method: 'GET',
        success: function(data){
            $("tbody").empty();
            $.each(data, function(){
               $("tbody").append(
                    "<tr class='bg-white border-b dark:bg-gray-900 dark:border-gray-700'><td class='py-4 px-6'>"+this.name+"</td><td class='py-4 px-6'>"+this.artist+"</td><td class='py-4 px-6'>"+this.album+"</td><td class='py-4 px-6'>"+this.duration+"</td><td class='py-4 px-6' id='"+this.id+"'><a href='#' class='edit font-medium text-blue-600 dark:text-blue-500 hover:underline'><i class='fa-solid fa-lg fa-pen-to-square'></i></a><a href='#' onclick='remove(event)' class='font-medium text-red-600 ml-3 dark:text-red-500 hover:underline'><i class='fa-solid fa-lg fa-trash'></i></a></td></tr>"
               )
            });
        }
    });
}

function remove(event){
    let id = $(event.currentTarget.parentNode).attr('id');
    $.ajax({
        url:'http://localhost:8080/song/'+ id,
        method: 'DELETE',
        success: function(){
            alert('Deletado!');
            updatePlaylist();
        }
    })
}


$(document).ready(updatePlaylist);

// $('#btnAddSong').click(function(){

// })