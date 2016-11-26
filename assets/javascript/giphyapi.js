var topics=["happy","sad", "excited", "happy dance", "confused", "nervous", "annoyed", "mind blown", "silly", "love", "innocent", "laughing", "hillarious", "sleepy", "shocked"];  

function setup(){
$.each(topics, function(i, value) {
	var newButton =$("<button type='button' class='btn btn-info buttonSearch' value='"+value+"'>"+value+'</button>');
	var buttonBox =$("#buttonBox");
	buttonBox.append(newButton);
});

};


//setup initial buttons from the topics array
setup();

//assign onClick functionality to display gifs from Giphy when topic buton is clicked.
$(".buttonSearch").on("click", displayGifs);

function displayGifs (){
	var searchTerm = this.attributes[2].value; 
	searchTerm = searchTerm.replace(/\s+/g, '+').toLowerCase();
		console.log(searchTerm);
    // Example queryURL for Giphy API
   var queryURL = "http://api.giphy.com/v1/gifs/search?q="+searchTerm+"&api_key=dc6zaTOxFJmzC&limit=10";


  $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
      var giphyArray = response;
      var importArray =giphyArray.data;
      console.log(importArray);
      $.each(importArray, function(key, value){
		var whatisthekey = key;
		var stillImage = value.images.fixed_height_still.url;
		var animatedImage = value.images.fixed_height.url;
		var slug = value.slug;
		$("#photoContainer").append("<div class='portfolio-item'><img class='img-responsive still' src="+stillImage+" alt='"+slug+"'><img class='img-responsive animated' src="+animatedImage+" alt='"+slug+"'></div>");

	});

   $(".portfolio-item").on("click", toggleGifs);   

  });

//});
};

function toggleGifs (event){
	$(event.currentTarget.firstChild).toggle();
	$(event.currentTarget.lastChild).toggle();
};