# How to hand in homework

In this module you'll submit your homework only using Git and GitHub.

1. [GitHub account containing the homework hand-in repositories](https://github.com/HackYourHomework)

## 1. GitHub homework guide

<a href="http://www.youtube.com/watch?feature=player_embedded&v=CpYARPYGQU8" target="_blank"><img src="./assets/submit-homework.png" width="400" height="250" alt="HYF Video" /></a>

Watch the video (by clicking the image) or go through the following walk-through to learn how to submit your homework:

### ONE TIME ONLY (START OF EVERY MODULE)

1. Create a [fork](https://help.github.com/en/articles/fork-a-repo) of
   the [HackYourHomework](https://github.com/HackYourHomework) module repository.
   For Databases the homework module repository is `https://www.github.com/HackYourHomework/databases-class##` where '
   ##' is your class number.
   You do this by using the `fork` option on the top right
2. Navigate to the URL of the cloned repository (it should be in your personal GitHub account, under "repositories")
3. Clone the repository, using SSH, to your local machine. You can do this by typing in `git clone <git url>` in the
   command line (terminal)
4. On your local machine, navigate to the folder using the command line
5. Make sure you've cloned it correctly by running `git status` from the command line.

### EVERY WEEK

1. Do a `git pull` on your main branch to get the latest version.
2. Create a new branch for each week you have homework. For example, for the week 1 homework for JavaScript create a
   branch called `YOUR_NAME-w1-JavaScript`.
   Don't forget to checkout this branch after creating it.
3. Make your homework (name your homework files corresponding to the homework exercises to help out the reviewer. For
   example: `ex1 - transactions`)
4. Once you're finished, add your homework to a commit. Make sure you *only* commit your homework files and nothing
   else. You can use `git add -p` if you only want to add a couple files.
   You can always check what is happening with the `git status` command (as one of our mentors always says, it is the
   console.log of git!).
5. Create the commit (`git commit`). Make the commit message meaningful, for
   example `finished project for homework week1`.
6. Push the branch to your forked repository
7. On the GitHub page of your forked repository, click on the `create pull request` button. Make sure
   the `base repository` is your teacher's repository, on branch master
8. Give the pull request a title in the following format:

```markdown
Homework week 1 <Your name>
```

9. Submit the pull request from your forked repository branch into the `main` branch

If you have any questions or if something is not entirely clear ¯\\\_(ツ)\_/¯, please reach out on Slack!
