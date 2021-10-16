let APIURL  =  'https://api.github.com/users/';

// select elements...

const form = document.querySelector('#form-space');
const search = document.querySelector('#form-input');
const main = document.querySelector('#main')

//getUsers('bradtraversy')

// get users data...

// using axios(http library) and asyn await...

async function getUsers(username){
  
  //using ES6 destructuring...
  try{
  let { data } = await axios(`${APIURL}${username}`);
  displayUsersCards(data);
  getRepos(username)
  }catch(error){
    if(error.response.status == 404){
    displayErrorCards('No profile with this username');
    }
  }
}


async function getRepos(username) {

  //using ES6 destructuring...
  try {
    let { data } = await axios(`${APIURL}${username}/repos?sort=created`);
    addReposToCards(data);
  } catch (error) {
    
      displayErrorCards('Problem fetching repos...');
    
  }
}



function displayErrorCards(err){
   
  let cardHTML = `
  <div id = 'main'>
   <h3> ${err} </h3>
  </div>
  ` ;
  main.innerHTML = cardHTML;
}

// display on the page...
function displayUsersCards(user){
  let cardHTML = `
   <div class="top-space">
      <div class="image">
        <img src="${user.avatar_url}" alt="${user.name}">
      </div>
      
      <h3 class="username">${user.name}</h3>
    </div>
    
    <div class="body-info">
      <p class="bio">
      ${user.bio}
      </p>
      
      <ul>
        <li>${user.followers} <strong>followers</strong></li>
        <li>${user.following} <strong>following</strong></li>
        <li>${user.public_repos} <strong>repos</strong></li>
      </ul>
      
      <div class="repos">
      </div>
    </div>
  `;

   main.innerHTML = cardHTML;
}


function addReposToCards(repos){
  let reposEl = document.querySelector('.repos');
  
  repos
  .slice(0, 5)
     .forEach(repo => {
       let repoEl =  document.createElement('a');
       repoEl.classList.add('repo');
       repoEl.href = repo.html_url;
       repoEl.target = '_blank';
       repoEl.innerText = repo.name;
       
       
       reposEl.appendChild(repoEl);
     })
}


// get the inputed values...

form.addEventListener('submit',(e) => {
  e.preventDefault();
   
  const user = search.value;
  if(user){
    getUsers(user);
    search.value = ''
  }
})

