# Git Cheat Sheet

# Description:
This is a quick cheat sheet of some of the commands that we will be using often. 

# Tasks:

* 1 - Add file(s)
* 2 - Commit file(s)
* 3 - Push file(s)
* 4 - Create a branch
* 5 - Push branch to GitHub
* 6 - Switch to a branch

# 1 - Add file

This adds a particular file to the index.  Please note you could do more than one file at a time.  There are several shortcuts (just be careful). i.e., `git add .` for all files that have changed and are not ignored.

**`git add NAME_OF_FILE`**

# 2 - Commit file

This commits the files you have added.  Please note that you could add and commit at the same time `git commit -am "message here"` (just be careful).

**`git commit -m 'MESSAGE HERE'`**

# 3 - Push commits to GitHub repository

**`git push`**

# 4 - Create a branch

We decided that the name of the branch should be the name of the feature being worked on.

**`git checkout -b name-of-the-new-branch`**

# 5 - Push branch to GitHub repository

**`git push origin name-of-the-new-branch`**

# 6 - Switch to a branch

**`git checkout name-of-branch`**

