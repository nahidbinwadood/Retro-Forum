let allPosts;
const loadAllData = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await response.json();
    allPosts = data.posts;
    hideSpinner();
}


// All Post Section:

const displayAllData = () => {

    const postContainer = document.getElementById('posts-container');
    postContainer.innerHTML = '';
    allPosts.forEach((item) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add("p-8", "lg:p-12", "grid", "space-y-6", "lg:space-y-0", "lg:grid-cols-12", "bg-[#797DFC1A]", "rounded-xl")
        postDiv.innerHTML = `
         <div class="col-span-2">
                                 <div class="relative size-24 mx-auto">
                                     <img class="rounded-lg" src="${item.image}" alt="">
                                     <div id="red-dot" class="absolute top-0 right-0 size-4 rounded-full ${item.isActive ? 'bg-[#10B981]' : 'bg-[#FF3434]'}">
                                     </div>
                                 </div>
                             </div>
                             <div class="col-span-10 flex flex-col gap-10">
                                 <div class="flex flex-col gap-5">
                                     <div class="flex gap-5">
                                         <h2 class="inter text-[#12132DCC]"># ${item.category}</h2>
                                         <h2 class="inter text-[#12132DCC]">Author : ${item.author.name}</h2>
                                     </div>
                                     <div>
                                         <h2 class="mulish text-[#12132D] text-xl font-bold">${item.title}</h2>
                                     </div>
                                     <div>
                                         <h2 class="inter text-[#12132D99]">${item.description}</h2>
                                     </div>
                                     <div class="border-t-2 border-dashed border-[#12132D4D] my-8"></div>
                                     <div class="flex justify-between">
                                         <div class="flex flex-row gap-4 lg:gap-8">
                                             <div class="flex items-center gap-2 inter text-[#12132D99]">
                                                 <i class="fa-regular fa-message"></i>
                                                 <h2>${item.comment_count}</h2>
                                             </div>
                                             <div class="flex items-center gap-2 inter text-[#12132D99]">
                                                 <i class="fa-regular fa-eye"></i>
                                                 <h2>${item.view_count}</h2>
                                             </div>
                                             <div class="flex items-center gap-2 inter text-[#12132D99]">
                                                 <i class="fa-regular fa-clock"></i>
                                                 <h2>${item.posted_time} min</h2>
                                             </div>
                                         </div>
                                         <div onclick="appendTitle('${item.title.replace(/'/g, '@')}','${item.view_count}')" class="cursor-pointer">
                                             <img src="./images/Group 40106.png" alt="">
                                         </div>
                                     </div>
                                 </div>
                             </div>
         `;
        postContainer.appendChild(postDiv);
        ;
    });
}

// hide displayAll data

const displayAllDataHide = () => {

    const postContainer = document.getElementById('posts-container');
    postContainer.innerHTML = '';
}

//Latest Post Section: 

const displayLatestData = async () => {

    const response1 = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data1 = await response1.json();
    const latestPostContainer = document.getElementById('latest-post-container');
    data1.forEach((items) => {
        const latestDiv = document.createElement('div');

        latestDiv.innerHTML = `<div id="latest-post-container" class="p-8 rounded-xl border space-y-6 border-gray-200 h-full">
         <div>
             <img class="rounded-xl" src="${items.cover_image}" alt="">
         </div>
         <div class="space-y-4">
             <div class="flex items-center gap-2 mulish text-[#12132D99]">
                 <div>
                     <img src="./images/calender.png" alt="">
                 </div>
                 <div>
                     <h2>${items.author.posted_date ? items.author.posted_date : "No Publish Date"}</h2>
                 </div>
             </div>
             <div>
                 <h2 class="mulish font-extrabold text-lg text-[#12132D]">${items.title}</h2>
             </div>
             <div>
                 <h2 class="mulish text-[#12132D99]">${items.description} </h2>
             </div>
             <div class="flex items-center gap-4">
                 <div>
                     <img class="size-12 rounded-full"  src="${items.profile_image}" alt="">
                 </div>
                 <div>
                     <h2 class="mulish font-bold text-[#12132D]">${items.author.name}</h2>
                     <h2 class="muslish text-[#12132D99]">${items.author.designation ? items.author.designation : "Unknown"}</h2>
                 </div>
             </div>
         </div>
     </div>`;
        latestPostContainer.appendChild(latestDiv);
    }

    );
}





///Appending Title:

let count = 0;

const appendTitle = (value1, value2) => {
    console.log(value1, value2);
    count = count + 1;
    const postCount = document.getElementById('count');
    postCount.innerText = count;
    const titleAppend = document.getElementById('title-append');
    const appendDiv = document.createElement('div');
    appendDiv.classList.add("p-6", "flex", "justify-between", "items-center", "bg-white", "rounded-xl");
    appendDiv.innerHTML = `
        <div class="lg:w-2/3">
            <h2 class="mulish font-semibold">${value1.replace(/@/g, "'")}</h2>
        </div>
        <div class="flex items-center gap-2 inter text-[#12132D99]">
            <i class="fa-regular fa-eye"></i>
            <h2>${value2}</h2>
        </div>
    `;

    titleAppend.appendChild(appendDiv);

}
loadAllData();



//Search :

let searchData;
const searchApi = async (search) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`);
    const dataS = await res.json();
    searchData= dataS.posts;
    showSpinner(searchData);
}

const filter = () => {
    const searchInput = document.getElementById("search-input");
    const searchInputValue = searchInput.value;
    searchApi(searchInputValue);  
}

const displayNewData = (newData) => {
    const postContainer = document.getElementById('posts-container');
    postContainer.innerHTML = '';
    newData.forEach((item) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add("p-8", "lg:p-12", "grid", "space-y-6", "lg:space-y-0", "lg:grid-cols-12", "bg-[#797DFC1A]", "rounded-xl")
        postDiv.innerHTML = `
        <div class="col-span-2">
                                <div class="relative size-24 mx-auto">
                                    <img class="rounded-lg" src="${item.image}" alt="">
                                    <div id="red-dot" class="absolute top-0 right-0 size-4 rounded-full ${item.isActive ? 'bg-[#10B981]' : 'bg-[#FF3434]'}">
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-10 flex flex-col gap-10">
                                <div class="flex flex-col gap-5">
                                    <div class="flex gap-5">
                                        <h2 class="inter text-[#12132DCC]"># ${item.category}</h2>
                                        <h2 class="inter text-[#12132DCC]">Author : ${item.author.name}</h2>
                                    </div>
                                    <div>
                                        <h2 class="mulish text-[#12132D] text-xl font-bold">${item.title}</h2>
                                    </div>
                                    <div>
                                        <h2 class="inter text-[#12132D99]">${item.description}</h2>
                                    </div>
                                    <div class="border-t-2 border-dashed border-[#12132D4D] my-8"></div>
                                    <div class="flex justify-between">
                                        <div class="flex flex-row gap-2 lg:gap-8">
                                            <div class="flex items-center gap-2 inter text-[#12132D99]">
                                                <i class="fa-regular fa-message"></i>
                                                <h2>${item.comment_count}</h2>
                                            </div>
                                            <div class="flex items-center gap-2 inter text-[#12132D99]">
                                                <i class="fa-regular fa-eye"></i>
                                                <h2>${item.view_count}</h2>
                                            </div>
                                            <div class="flex items-center gap-2 inter text-[#12132D99]">
                                                <i class="fa-regular fa-clock"></i>
                                                <h2>${item.posted_time} min</h2>
                                            </div>
                                        </div>
                                        <div onclick="appendTitle('${item.title.replace(/'/g, '@')}','${item.view_count}')" class="cursor-pointer">
                                            <img src="./images/Group 40106.png" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
        `;
        postContainer.appendChild(postDiv);
    });
}


//Spinner:

const hideSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    setTimeout(() => {
        spinner.classList.add('hidden');
        displayAllData();
        displayLatestData();
    }, 2000);;
}

const showSpinner = (val) => {
    const spinner = document.getElementById('loading-spinner');
    spinner.classList.remove('hidden');
    displayAllDataHide();
    setTimeout(() => {
        spinner.classList.add('hidden');
        displayNewData(val); 
    }, 2000);;   
}
