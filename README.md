beta
====

UAL beta website

This is the repo for the new [www.arts.ac.uk](www.arts.ac.uk) website.
The site is built using [Zurb Foundation 4.0](http://foundation.zurb.com/).


Github setup
------------

* [Cheat sheet](http://rogerdudler.github.com/git-guide/files/git_cheat_sheet.pdf)
* [Git Reference](http://gitref.org/index.html) 

**Quick start**

`git clone https://github.com/artslondon/beta.git`
`cd beta`

At this point you should fork the artslondon repo into your own github account.

**Verify existing remote**

`git remote -v`

You should see:

-- origin	https://github.com/artslondon/beta.git (fetch)  
-- origin	https://github.com/artslondon/beta.git (push)  

**Update remote**

`git remote update`

-- Fetching origin  
-- From https://github.com/artslondon/beta  
-- * [new branch]      gh-pages   -> origin/gh-pages  
-- * [new branch]      master     -> origin/master  

**Checkout gh-pages branch**

`git checkout gh-pages`

-- Branch gh-pages set up to track remote branch gh-pages from origin.
-- Switched to a new branch 'gh-pages'

**Set a new remote**

`git remote add wisbey https://github.com/wisbey/beta.git`

`git remote -v`

-- origin	https://github.com/artslondon/beta.git (fetch)  
-- origin	https://github.com/artslondon/beta.git (push)  
-- wisbey	https://github.com/wisbey/beta.git (fetch)  
-- wisbey	https://github.com/wisbey/beta.git (push)  


Fork & pull process
-------------------

* [Using pull requests](https://help.github.com/articles/using-pull-requests)

Before doing any work, make sure you have pulled down any changes from the origin repo:

`git pull origin gh-pages`

Make sure you're on the gh-pages branch:

`git branch`

-- *gh-pages  
-- master

Make changes, commit them, then push changes to your own remote:

`git push wisbey gh-pages`

Now you can make a pull request via github.com.
