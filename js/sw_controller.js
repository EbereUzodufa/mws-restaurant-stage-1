/*Adding service Worker*/

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(function() {
		console.log('ServiceWorker registration successful with scope: ', registration.scope);
	})
	.catch(function(err) {
		console.log('ServiceWorker registration failed: ', err);
	});
};