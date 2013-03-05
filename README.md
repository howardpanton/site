beta
====

UAL beta website

This is the repo for the new www.arts.ac.uk wesbite.
The site is built using Zurb Foundation 4.0 you can find out more information on Zurb at - http://foundation.zurb.com/



Setting up Github
================

Cheat sheet http://rogerdudler.github.com/git-guide/files/git_cheat_sheet.pdf 
Git Reference http://gitref.org/index.html 

git clone https://github.com/artslondon/beta.git 
cd into cloned folder ‘beta’
git remote update

 -- Fetching origin
git remote -v

 -- origin	https://github.com/artslondon/beta.git (fetch)
 -- origin	https://github.com/artslondon/beta.git (push)
git remote update

 -- Fetching origin
 -- From https://github.com/artslondon/beta
 -- * [new branch]      gh-pages   -> origin/gh-pages
 -- * [new branch]      master     -> origin/master
git checkout gh-pages

 -- Branch gh-pages set up to track remote branch gh-pages from origin.
 -- Switched to a new branch 'gh-pages'
git remote add [source] https://github.com/[name]/beta.git
git remote -v

 -- origin	https://github.com/artslondon/beta.git (fetch)
 -- origin	https://github.com/artslondon/beta.git (push)
 -- wisbey	https://github.com/username/beta.git (fetch)
 -- wisbey	https://github.com/username/beta.git (push)
git pull origin gh-pages (to pull all updated files from origin)
