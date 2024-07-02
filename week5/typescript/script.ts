let currentDestination: string = '';
let imageIndex: number = 1;

async function getDestination(): Promise<void> {
    const spotInput = document.getElementById("spot") as HTMLInputElement;
    const spot: string = spotInput.value;
    currentDestination = spot;
    const message: string = `Whoosh! Off to ${spot}! Better start packing your imaginary bags for an adventure of a lifetime!`;
    const msgElement = document.getElementById("msg") as HTMLElement;
    msgElement.textContent = message;

    const imageUrl: string = `https://source.unsplash.com/1600x900/?${encodeURIComponent(spot)}`;
    const imgBack = document.querySelector(".img_back") as HTMLImageElement;
    imgBack.src = imageUrl;

    const apiUrl: string = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(spot)}&client_id=RbpiBjFQBvyPLjopn4V05NCcQCBkuFamJq_0S9a7zh0`;

    try {
        const response: Response = await fetch(apiUrl);
        if (response.ok) {
            const jsonResponse: any = await response.json();
            if (jsonResponse.results.length > 0) {
                const firstImageUrl: string = jsonResponse.results[0].urls.regular;
                const destImage = document.getElementById("dest_image") as HTMLImageElement;
                destImage.src = firstImageUrl;
                imgBack.src = firstImageUrl;
                destImage.alt = "Image of " + spot;
            } else {
                console.error('No images found for the destination.');
            }
        } else {
            console.error('Failed to load image');
        }
    } catch (error) {
        console.error('Error fetching image:', error);
    }

    const destElement = document.getElementById("dest") as HTMLElement;
    destElement.style.display = "block";
}

async function fetchNewImage(): Promise<void> {
    imageIndex++;
    const apiUrl: string = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(currentDestination)}&client_id=RbpiBjFQBvyPLjopn4V05NCcQCBkuFamJq_0S9a7zh0&page=${imageIndex}`;

    try {
        const response: Response = await fetch(apiUrl);
        if (response.ok) {
            const jsonResponse: any = await response.json();
            if (jsonResponse.results.length > 0) {
                const newImageUrl: string = jsonResponse.results[0].urls.regular;
                const destImage = document.getElementById("dest_image") as HTMLImageElement;
                const imgBack = document.getElementById("img_back") as HTMLImageElement;
                destImage.src = newImageUrl;
                imgBack.src = newImageUrl;
            } else {
                console.error('No more images found.');
            }
        } else {
            console.error('Failed to load image');
        }
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}
