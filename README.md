# github-project-explorer

Github Project Explorer allows you to search Github
organizations and view top repos and recent commits.

https://github-project-explorer.now.sh/


## Getting up and running

1. Install [Nodejs](https://nodejs.org/en/download/)
2. Install [Yarn](https://classic.yarnpkg.com/en/docs/install) (`npm i -g yarn`)
3. Clone Repo
4. Install project dependencies (`yarn install`)
5. Run Development server (`yarn dev`)


## Testing

This project still needs automated testing with **Jest** implemented.  
For now, here is the manual testing strategy.

**Happy Path**  

1. Load app
2. Navigate to home page (`/`)
3. Search for an organization (`Netflix`)
4. Validate no more than 130 projects load.
5. Change sort from popular to stars, issues, then updated.
6. Validate project info matches in descending order on sort type.
7. Click on a project item
8. Validate last 28 commits load (if available)
9. Click on commit title (bold) and validate it opens a new tab for that commit on Github


**No Org**

1. Load App
2. Navigate to home page
3. Search for a fake org (`fakeolorg`)
4. Validate error message appears

**Wrong Project path**

1. Load App
2. Navigate to a fake repo page (`/search/netflix/notarealrepo`)
3. Validate error message appears