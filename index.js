async function getWikiArticleText(articleTitle, language = "en") {
    try {
        const url = `https://${language}.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&format=json&origin=*&titles=${encodeURIComponent(articleTitle)}`;

        const response = await fetch(url);
        const data = await response.json();

        const page = Object.values(data.query.pages)[0];

        if (page.extract) {
            return page.extract;
        } else {
            return "Article not found or text not available";
        }
    } catch (error) {
        console.error("Error:", error);
        return "An error occurred when requesting an article";
    }
}

getWikiArticleText("JavaScript", "en").then(text => console.log(text));
