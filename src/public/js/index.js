window.onload = function (){
    render();
    var ulNode = document.getElementById('cc-comment-list');
    var id = ulNode.dataset.id;
    var formNode = document.getElementById('cc-form-id');

    formNode.addEventListener('submit',function (e) {
        e.preventDefault();
       loader(true);
        const text = document.getElementById('cc-text').value;
        post({
            token : id ,
            text : text
        } , function (res) {
            console.log(res);
            render();
        });
    })
}

function render() {
    loader(true);
    var ulNode = document.getElementById('cc-comment-list');
    var id = ulNode.dataset.id;
    get(id , function (res) {
        var comments = res.data;
        ulNode.innerHTML = '';
        comments.map((comment) => {
            var node = document.createElement("LI");
            node.innerHTML = `<div class="cc-comment-card" xmlns="http://www.w3.org/1999/html"> 
                        <h3>Vikas Sandhu <span>Today at 5:42PM</span></h3> 

                        <p>${comment.text}</p>
                    </div>`;
            ulNode.appendChild(node);
        });

        loader(false);
    });
}

function loader(set) {
    const loader = document.getElementById('cc-loader');
    if(set) {
        loader.style.display = "flex";
    } else {
        loader.style.display = "none";
    }
}


function post(body,cb) {
    var data = JSON.stringify(body);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            cb(JSON.parse(this.responseText));
        }
    });

    xhr.open("POST", "http://192.168.43.222:7000/create");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    // xhr.setRequestHeader("Postman-Token", "76c1d13e-29bf-4c6c-a331-324c9fcc984c");

    xhr.send(data);
}

function get(id,cb) {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            cb(JSON.parse(this.responseText));
        }
    });

    xhr.open("GET", "http://192.168.43.222:7000/get/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMtaXMtbXktdG9rZW4iLCJpYXQiOjE2MDQ3NjgwNDF9.jPk_2qG-m77Pw1Fx162g6SxJDKNH8m5sPdYCAPK3JSE");
    xhr.setRequestHeader("cache-control", "no-cache");
    // xhr.setRequestHeader("Postman-Token", "4288e71e-a0f6-4d58-a242-fa0efffc9678");

    xhr.send(data);
}


