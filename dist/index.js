"use strict";
const inputField = document.querySelector("#search_user");
const formAction = document.querySelector("#search");
const mainData = document.querySelector(".main_container");
async function mycustomurl(url, options) {
    let response = await fetch(url, options);
    if (!response.ok) {
        throw Error(`the response status is ${response}`);
    }
    let data = await response.json();
    console.log(data);
    return data;
}
function showuserdata(info) {
    const { avatar_url, login, url } = info;
    mainData.insertAdjacentHTML("beforeend", `
    <div class="card">
    <div class="card_footer">
        <img src=${avatar_url} alt=${login} class="img_url">
        <a href=${url}>check github</a>
        </div>
    </div>


    `);
}
function fetchurl(url) {
    mycustomurl(url, {}).then((userinfo) => {
        for (let info of userinfo) {
            showuserdata(info);
        }
    });
}
fetchurl("https://api.github.com/users");
//clear the mainata
function clearMainData() {
    mainData.innerHTML = "";
}
//search functionality
inputField.addEventListener("input", () => {
    performSearch();
});
formAction.addEventListener("submit", async (e) => {
    e.preventDefault();
    performSearch();
});
// perform search
async function performSearch() {
    const userSearchitem = inputField.value.toLowerCase().trim(); // Trim to remove extra spaces
    console.log(userSearchitem);
    try {
        const url = "https://api.github.com/users";
        const getUserData = await mycustomurl(url, {});
        const matchingUser = getUserData.filter((user) => {
            return user.login.toLowerCase().includes(userSearchitem);
        });
        clearMainData();
        if (matchingUser.length === 0) {
            mainData.insertAdjacentHTML("beforeend", `
            <p>not found</p>
        `);
        }
        else {
            for (const finduser of matchingUser) {
                showuserdata(finduser);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
