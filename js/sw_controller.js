/*Adding service Worker*/

if ('serviceWorker' in navigator) {
  //We use Promise here to make the work better
  navigator.serviceWorker
  .then(function(){
  	console.log('Service worker is Registered');
  })
  .catch(function(error){
    console.error('Error: '+ error);
  })
};