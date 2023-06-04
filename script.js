const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [
	{
		album: "Complicated",
		emblem: "Life is better with music",
		"bg-color": ["#4D4D4D", "#999999"],
		"accent-color": "#000000",
		url: "https://images4.alphacoders.com/170/170348.jpg",
		spotify:
			"https://embed-standalone.spotify.com/embed/track/5xEM5hIgJ1jjgcEBfpkt2F?si=45aa9eec71044e27&nd=1"
	},
    {
		album: "Eyes Wide Shut",
		emblem: "Life is better with music",
		"bg-color": ["#A64B00", "#CC5C00"],
		"accent-color": "#260F00",
		url:
			"https://images5.alphacoders.com/613/613454.jpg",
		spotify:
			"https://embed-standalone.spotify.com/embed/track/556awMv4WQP0h1VXMU8rSU?si=0f69bfc6e207476d&nd=1"
	},
    {
		album: "I Fell In Love With The Devil",
		emblem: "Life is better with music",
		"bg-color": ["#1B151E", "#0D080E"],
		"accent-color": "#727272",
		url: "https://images4.alphacoders.com/151/151578.jpg",
		spotify:
			"https://embed-standalone.spotify.com/embed/track/6HHtTXPyBTJsLQT0y3afnm?si=9d8eaa3feba3490e&nd=1"
	},
	{
		album: "Here’s to Never Growing Up",
		emblem: "Life is better with music",
		"bg-color": ["#1E0200", "#0D080E"],
		"accent-color": "#727272",
		url:
			"https://images2.alphacoders.com/466/466359.jpg",
		spotify:
			"https://embed-standalone.spotify.com/embed/track/0qwcGscxUHGZTgq0zcaqk1?si=ac25370b086d4a5e&nd=1"
	},
    {
		album: "Hello Kitty",
		emblem: "Life is better with music",
		"bg-color": ["#727272", "#0D1827"],
		"accent-color": "#727272",
		url: "https://images6.alphacoders.com/421/421355.jpg",
		spotify:
			"https://embed-standalone.spotify.com/embed/track/5eo5uGyM4q70CLU3LZphfu?si=0884dff8fb894bf3"
	},
];

scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));
heroDiv.addEventListener("animationend", () => {
	heroDiv.classList.remove("album-transition");
	document.addEventListener("keydown", handleKeyScroll);
	scrollLeft.disabled = false;
	scrollRight.disabled = false;
	scrollLeft.classList.remove("key-press-hover-left");
	scrollRight.classList.remove("key-press-hover-right");

	for (const text of texts) text.classList.add("show-texts");
});

const handleClickScroll = (val) => {
	if (index + val >= 0 && index + val < albums.length) {
		updateDisplay((index += val));
	}
};

const handleKeyScroll = (e) => {
	if (e.key == "ArrowLeft") {
		scrollLeft.classList.add("key-press-hover-left");
		handleClickScroll(-1);
	}
	if (e.key == "ArrowRight") {
		scrollRight.classList.add("key-press-hover-right");
		handleClickScroll(1);
	}
};
let index = 0;

const updateDisplay = (index) => {
	let DELIMITER = "";

	const album = albums[index];

	for (const text of texts) text.classList.remove("show-texts");
	emblemDiv.innerHTML = "";
	scrollLeft.disabled = true;
	scrollRight.disabled = true;
	document.removeEventListener("keydown", handleKeyScroll);

	sectionContainer.id = `hero-${album.album.toLowerCase().replace(" ", "-")}`;
	bodyContainer.style.background = `linear-gradient(180deg, ${album["bg-color"][0]} 0%, ${album["bg-color"][1]} 100%)`;
	heroDiv.style.backgroundImage = `url(${album.url})`;
	albumTitleSpan.textContent = album.album;
	spotifyWidget.src = album.spotify;

	const number = index + 1;
	albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
	albumNum.style.color = album["accent-color"];

	if (index === 3) scrollRight.classList.add("hide-arrow");
	else scrollRight.classList.remove("hide-arrow");

	createEmblem(album.emblem, DELIMITER[0] || undefined).forEach((node) =>
		emblemDiv.append(node)
	);

	heroDiv.classList.add("album-transition");
};

const createEmblem = (string, delimiter = "•") => {
	const spans = [];

	string = string.trim().replaceAll(" ", delimiter) + delimiter;
	const numChars = string.length;
	const degVal = 90 / (numChars / 6);

	string.split("").forEach((char, idx) => {
		const span = document.createElement("span");
		span.innerText = char;
		span.style.transform = `rotate(${180 - degVal * idx}deg)`;
		if (char === delimiter) span.style.color = albums[index]["accent-color"];
		spans.push(span);
	});

	return spans;
};

updateDisplay(index);