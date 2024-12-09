var site_name = document.getElementById("site_name");

var site_url = document.getElementById("site_url");

var btnsubmit = document.getElementById("btnsubmit");

var modal = document.querySelector("#modal-body");

var modal_footer = document.querySelector(".modal-footer");

var closmodalbtn = document.querySelector(".close-modal");

var bookmarklist = [];

if (localStorage.getItem("sites") !== null) {
  bookmarklist = JSON.parse(localStorage.getItem("sites"));
  display();
}

var validsite_name = document.querySelector("#site_name");
var validsite_url = document.querySelector("#site_url");

var urlregex =
  /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/){1}(\w){2,}\.(\w{2,})(\.\w{2,})?(\/)?((\w){0,}(\/){1}(\w){1,})*$/;

var nameregex = /^(\w){3,}(\s*(\w){1,})*$/;

validsite_name.addEventListener("input", function () {
  var name_input = validsite_name.value;
  if (name_input === "") {
    site_name.classList.remove("is-invalid", "is-valid");
  } else if (nameregex.test(name_input) == true || name_input == "") {
    site_name.classList.remove("is-invalid");
    site_name.classList.add("is-valid");
  } else {
    site_name.classList.add("is-invalid");
  }
});

validsite_url.addEventListener("input", function () {
  var url_input = validsite_url.value;
  if (url_input === "") {
    site_url.classList.remove("is-invalid", "is-valid");
  } else if (urlregex.test(url_input) == true || url_input == "") {
    site_url.classList.remove("is-invalid");
    site_url.classList.add("is-valid");
  } else {
    site_url.classList.add("is-invalid");
  }
});

closmodalbtn.addEventListener("click", function () {
  modal.classList.remove("show");
});

btnsubmit.onclick = inputValidation;

function inputValidation() {
  var nameregex = /^(\w){3,}(\s*(\w){1,})*$/;

  var urlregex =
    /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/){1}(\w){2,}\.(\w{2,})(\.\w{2,})?(\/)?((\w){0,}(\/){1}(\w){1,})*$/;

  var errors = ``;
  var name_input = validsite_name.value;
  var url_input = validsite_url.value;
  if (urlregex.test(url_input) == true && nameregex.test(name_input) == true) {
    addBookmark();
    return;
  }

  if (name_input == "" && url_input == "") {
    errors += `
    <li><span class><i class="fa-regular fa-circle-right p-2 "></i>Inputs are empty</span></li>`;
    // modal.classList.add("show");
    // return;
  } else if (name_input == "") {
    errors += `
    <li><span class><i class="fa-regular fa-circle-right p-2 "></i>Site name is empty</span></li>`;
    // modal.classList.add("show");
  } else if (url_input == "") {
    errors += `
    <li><span class><i class="fa-regular fa-circle-right p-2 "></i>The URL is empty</span></li>`;
    // modal.classList.add("show");
  }

  if (name_input != "" && nameregex.test(name_input) == false) {
    if (name_input.length < 3) {
      errors += `
        <li><span class><i class="fa-regular fa-circle-right p-2 "></i>Site name must contain at least 3
        characters</span></li>`;
      //   modal.classList.add("show");
    } else if (!nameregex.test(name_input)) {
      errors += `
          <li><span class><i class="fa-regular fa-circle-right p-2"></i>Site name contains special Character.</span></li>`;
      //   modal.classList.add("show");
    }
  }

  if (url_input != "" && urlregex.test(url_input) == false) {
    // Check if the URL starts with http:// or https://
    if (
      !(url_input.startsWith("http://") || url_input.startsWith("https://"))
    ) {
      errors += `
        <li><span class><i class="fa-regular fa-circle-right p-2"></i>The URL must start with https:// or http://</span></li>`;
      //   modal.classList.add("show");
      //   return;
    }
    // Check if the URL has a valid domain extension like .com, .org, etc.
    else if (
      !/^(\w){2,}\.(\w{2,})(\.\w{2,})?(\/)?((\w){0,}(\/){1}(\w){1,})*$/.test(
        url_input
      )
    ) {
      errors += `
        <li><span class><i class="fa-regular fa-circle-right p-2"></i>The URL must have a valid organization (e.g., .com, .org).</span></li>`;
      //   modal.classList.add("show");
      //   return;
    }
  }
  modal_footer.innerHTML = errors;
  modal.classList.add("show");
}

function addBookmark() {
  var bookmark = {
    name: site_name.value,
    url: site_url.value,
  };

  bookmarklist.push(bookmark);
  localStorage.setItem("sites", JSON.stringify(bookmarklist));
  display();
  reset();
}

function display() {
  document.getElementById("bookmarks_tbody").innerHTML = "";
  for (var i = 0; i < bookmarklist.length; i++) {
    document.getElementById(
      "bookmarks_tbody"
    ).innerHTML += `<tr class="bg-light border border-top">
            <td class="p-2">${i + 1}</td>
            <td class="p-2">${bookmarklist[i].name}</td>           
            <td class="p-2"><a href= ${
              bookmarklist[i].url
            }  target="_blank"><button class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
            <td class="p-2"><a href="#"><button onclick="deletebookmark(${i})" class="btn btn-delete"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></a></td>
        </tr>`;
  }
}

function deletebookmark(index) {
  bookmarklist.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(bookmarklist));
  display();
}

function reset() {
  site_name.value = "";
  site_url.value = "";
  site_url.classList.remove("is-valid");
  site_name.classList.remove("is-valid");
}
