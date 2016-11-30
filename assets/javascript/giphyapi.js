var topics=["angry","bored", "confused", "happy dance", "unimpressed", "good job", "bye", "mind blown", "eye roll", "inspired", "no", "yes", "whatever", "thank you", "shocked"];  

var searchTerm;


function setup(){
	$("#buttonBox").html("");
	$.each(topics, function(i, value) {
		var newButton =$("<button type='button' class='btn btn-info buttonSearch' value='"+value+"'>"+value+'</button>');
		var buttonBox =$("#buttonBox");
		buttonBox.append(newButton);
	});

	//assign onClick functionality to display gifs from Giphy when topic buton is clicked.
	$(".buttonSearch").on("click", buttonSearch);
};


//setup initial buttons from the topics array
setup();

//assigns onClick function to search button
$(".userInput").on("click", userNormalSearch);
$(".userAnimeInput").on("click", userAnimeSearch);
//sets searchTerm when topic button is clicked
function buttonSearch(){
	searchTerm = this.attributes[2].value; 
	searchTerm = searchTerm.replace(/\s+/g, '+').toLowerCase();
		
  	displayGifs ();
};


//sets searchTerm when the user enters a term in the search box
function userNormalSearch(e){
	e.preventDefault();
	searchTerm = $('#search').val().trim(); 
	userSearch();
};

function userAnimeSearch(e){
	e.preventDefault();
	if($('#search').val().trim()){
	searchTerm ="Anime "+ $('#search').val().trim(); 
	userSearch();}
	else {
		alert("Please enter a new topic.");
	}
};




function userSearch(e){
	if (searchTerm && topics.indexOf(searchTerm) === -1) {
		topics.push(searchTerm);
		setup();
		searchTerm = searchTerm.replace(/\s+/g, '+').toLowerCase();
	   	displayGifs ();    
	   } else {
	   	alert("Please enter a new topic.");
	   };
	$('#search').val('');
	$('#search').attr("placeholder", "Search");

}; 

//takes the searchTerm, queries Giphy, and displays results.
function displayGifs (){
	//giphy query
   var queryURL = "https://api.giphy.com/v1/gifs/search?q="+searchTerm+"&api_key=dc6zaTOxFJmzC&rating=pg-13&limit=10";

   //pulls the inforation (still image, animated image, rating, and slug) from the gighy JSON object
  $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
      var giphyArray = response;
      var importArray =giphyArray.data;


      //clears the existing images, if any
      $("#photoContainer").html("");

      //pulls the variables and displays the images from the JSON object
      $.each(importArray, function(key, value){
		var whatisthekey = key;
		var stillImage = value.images.fixed_height_still.url;
		var animatedImage = value.images.fixed_height.url;
		var rating = value.rating;
		var slug = value.slug;
		$("#photoContainer").append("<div class='portfolio-item'><img class='img-responsive still' src="+stillImage+" alt='"+slug+"'><img class='img-responsive animated' src="+animatedImage+" alt='"+slug+"'><figcaption>Rating: "+rating+"</div>");

	});
    //assigns onClick functionality to images
  	$(".portfolio-item").on("click", toggleGifs);   

  }); //end ajax loop
};//end displayGifs

//toggles visibiity on still and animated images
function toggleGifs (event){
	$(event.currentTarget.firstChild).toggle();
	$(event.currentTarget.childNodes[1]).toggle();
};