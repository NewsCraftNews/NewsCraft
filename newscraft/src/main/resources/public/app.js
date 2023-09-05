const API_URL = `http://localhost:8080`
function fetchArticlesData() {
    fetch(`${API_URL}/api/news-articles`)
        .then((res) => {
            //console.log("res is ", Object.prototype.toString.call(res));
            return res.json();
        })
        .then((data) => {
            showArticleList(data)
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('posts').innerHTML = 'Error Loading Articles Data'
        })
}


function fetchArticle(id) {
    fetch(`${API_URL}/api/news-articles/${id}`)
        .then((res) => {
            //console.log("res is ", Object.prototype.toString.call(res));
            return res.json();
        })
        .then((data) => {
            showArticleDetail(data)
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('posts').innerHTML = 'Error Loading Single Article Data'
        })
}

function parseArticleId() {
    try {
        var url_string = (window.location.href).toLowerCase();
        var url = new URL(url_string);
        var articleid = url.searchParams.get("id");
        // var geo = url.searchParams.get("geo");
        // var size = url.searchParams.get("size");
        // console.log(name+ " and "+geo+ " and "+size);
        return articleid
      } catch (err) {
        console.log("Issues with Parsing URL Parameter's - " + err);
        return "0"
      }
}
// takes a UNIX integer date, and produces a prettier human string
function dateOf(date) {
    const milliseconds = date * 1000 // 1575909015000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
    return humanDateFormat
}

function showArticleList(data) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    const ul = document.getElementById('posts');
    const list = document.createDocumentFragment();

    data.map(function(post) {
        console.log("NewsArticle:", post);
        let li = document.createElement('li');
        let title = document.createElement('h3');
        let body = document.createElement('p');
        let by = document.createElement('p');
<<<<<<< HEAD
        title.innerHTML = `<a href="/articledetails.html?id=${post.id}">${post.title}</a>`;
        body.innerHTML = `Time Posted: ${post.timePosted}`;
        //let postedTime = dateOf(post.time)
        by.innerHTML = `Likes: ${post.likes}`;
=======
        title.innerHTML = `<a href="/articles.html?id=${post.id}">${post.title}</a>`;
        body.innerHTML = `${post.timePosted}`;
        //let postedTime = dateOf(post.time)
        by.innerHTML = `${post.likes}`;
>>>>>>> 9a52bff (able to see all the news articles on the homepage)

        li.appendChild(title);
        li.appendChild(body);
        li.appendChild(by);
        list.appendChild(li);
    });

    ul.appendChild(list);
}

function showArticleDetail(post) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    const ul = document.getElementById('post');
    const detail = document.createDocumentFragment();

    console.log("NewsArticle:", post);
    let li = document.createElement('div');
    let title = document.createElement('h2');
    let body = document.createElement('p');
    let by = document.createElement('p');
<<<<<<< HEAD
    let likes = document.createElement('p');
    title.innerHTML = `${post.title}`;
    body.innerHTML = `${post.timePosted}`;
    //let postedTime = dateOf(post.time)
    likes.innerHTML = `${post.likes}`;
    by.innerHTML = `${post.articleText}`;

    li.appendChild(title);
    li.appendChild(body);
    li.appendChild(likes);
=======
    title.innerHTML = `${post.title}`;
    // body.innerHTML = `${post.description}`;
    //let postedTime = dateOf(post.time)
    // by.innerHTML = `${post.origin}`;

    li.appendChild(title);
    li.appendChild(body);
>>>>>>> 9a52bff (able to see all the news articles on the homepage)
    li.appendChild(by);
    detail.appendChild(li);

    ul.appendChild(detail);
}

function handlePages() {
    let articleid = parseArticleId()
    console.log("articleId: ",articleid)

    if (articleid != null) {
        console.log("found a articleId")
        fetchArticle(articleid)
    } else {
        console.log("load all articles")
        fetchArticlesData()
    }
}

handlePages()




