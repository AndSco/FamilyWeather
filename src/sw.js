const CACHE_NAME = "localCache";

self.addEventListener("install", (event) => {
	console.log("SW installed");
})


self.addEventListener("activate", () => {
	console.log("SW activated");
})

