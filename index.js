
const api_key = "AIzaSyA5LHdKxv0QVsRY33tluW_WqWGu7xWFgPk";

// YOUTUBE
// URL
// fetch()

// "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=thor&key=[YOUR_API_KEY]"

//let container = document.getElementById("container");


/* 
    <iframe width="560" height="315" src="https://www.youtube.com/embed/LGEWs4RuSjE"   // video id
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; 
        autoplay; clipboard-write; 
        encrypted-media; gyroscope; 
        picture-in-picture" allowfullscreen>
    </iframe>
 */
let popular = async  () =>{
    let url1 = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=${api_key}`;

    let res1 = await fetch(url1);

    let data1 = await res1.json()
    append(data1.items);
    console.log(data1)

}
popular();


let search = async () => {

    let query = document.getElementById("query").value;

    let url =`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${api_key}`;

    let res = await fetch(url);

    let data = await res.json();

    append(data.items)

    console.log("data:", data);
    
}

let append = (data) => {

    let container = document.getElementById("container");
    container.innerHTML = null;
    

    data.forEach(( {id: { videoId }, snippet: { title, thumbnails } }) => {
        //console.log("videoId:", videoId);
        //console.log("title:", title);

        let div = document.createElement("div");

       //  let image = document.createElement("img");
        //image.src = thumbnails.default.url; 

        let iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.allow = "fullscreen";

        let h3 = document.createElement("h3");
        h3.innerText = title;

        div.append(iframe, h3);

        let video = {
            title,
            videoId,
        };
        div.onclick = () => {
            playVideo(video);
        };

        container.append(div);

    }) ;

}


let playVideo =(video) => {
    console.log("video:", video);

    window.localStorage.setItem("video", JSON.stringify(video));
    window.location.href = "video.html";
}


