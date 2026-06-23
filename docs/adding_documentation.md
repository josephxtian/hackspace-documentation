#  Adding Documentation

[https://docs.hacman.org.uk]() is the home for documentation for Manchester Hackspace

It is hosted on GitHub Pages through mkdocs-material. The wiki is written in markdown, a type of text file, the same that the forum uses.

### Editing or creating a page

The easiest way to suggest a change is to edit the docs directly in your web browser — you don't need to install anything or know how GitHub works. Nothing you do goes live until a member of the management team has reviewed it.

!!! success "You can't break anything"
    Every change happens on a separate copy of the docs, so the live site stays untouched until your work is approved. If something isn't quite right, we'll just leave comment letting you know — so please don't be shy about giving it a go.

=== "GitHub User"

    Create a pull request with a new markdown file in the documentation repository and we will pull it at the next update

=== "Edit in your browser"

    Navigate to the page you'd like to change (on the live site or in GitHub), then:

    1. Press the full stop (`.`) key on your keyboard. This opens a familiar code-editor view right in your browser.
    2. Find the file you want in the list on the left and click into it. *(To create a brand-new page instead, right-click a folder and choose **New File**, giving it a name ending in `.md`.)*
    3. Make your edits just like you would in any text editor. The docs are written in Markdown — mostly normal text with a few simple symbols for headings and links.
    4. Click the **Source Control** icon on the far left (a little branching diagram with a number badge).
    5. Type a short note describing what you changed, then commit. Because you're not a direct member of the repository, GitHub will offer to create a **fork** — your own personal copy of the docs — and commit to a new branch inside it. Just accept; this is completely normal.
    6. GitHub will then offer to **Create a Pull Request** — click it, add a sentence or two explaining your change if you like, and submit.

    That's it! Your suggestion now sits in a queue for the management team to review and merge. Nothing goes live automatically.

=== "Prefer not to use GitHub?"

    No problem — write your page as a Markdown text file (try [stackedit.io](https://stackedit.io) for a simple editor) and email it to <board@hacman.org.uk>. We'll add it to the repo on your behalf.

### After your change has been accepted

Once a maintainer merges your pull request, your edit is live and that branch has done its job.

!!! warning "Don't keep editing the same branch"
    A merged branch is "spent" and reusing it tends to confuse both you and the reviewer. **One set of changes = one branch = one pull request**. After your pull request is accepted, the **Delete branch** button will appear on the pull request, go ahead and click it — that only removes the finished working copy, never your actual change.

### Starting your next edit

Next time you come to make an edit, make sure your version of the docs is up to date.

1. Go to your fork's page on GitHub (it'll be at `github.com/your-username/[repo-name]`).
2. If it says your fork is **behind**, click **Sync fork** to pull in everyone else's recent changes. This is what stops your next pull request filling up with hundreds of changes that aren't yours.
3. Then edit as normal (as above), letting GitHub create a new branch.

!!! tip "If your fork gets into a weird state"
    If **Sync fork** won't sort it out, the simplest reset is to delete the fork entirely. Next time you press `.`, GitHub just makes you a fresh one that's perfectly up to date.

### GitHub terminology

`master` / `main` / `master branch` — The live version of the docs that everyone can see. This is the one your changes get added to when they've been approved by the management team.

`Commit` — Like saving a snapshot of your work. Unlike saving a normal document, you'd usually only commit once you've finished a change rather than constantly as you type.

`Branch` — A safe, separate copy of the docs where your work lives while you're editing. Nothing you do on a branch touches the live site, so you can't break anything. Each change should get its own branch.

`Pull Request` aka `PR` — A request to have your finished changes added to the live docs. This will be approved by the management team.

`Fork` — Your own copy of the entire docs site but saved to your GitHub account. All your branches and changes live inside your fork until they're approved and pulled across into the live version on Hackspace's GitHub account.

`Merge` — When the management team accepts your pull request, your change is **merged** into the live docs. Once that happens, your branch has done its job and can be deleted.

`Sync fork` — A button on your fork's page that pulls in everyone else's recent changes so your copy stays up to date. Clicking this before starting a new edit is the best way to stop your fork drifting out of step with the live docs.

### Sample Github Workflow
TODO Add an example workflow, e.g. if you are adding new pages for a drill.

### Adding videos, GIFs and animations

Videos and animated images are supported. Reduce the size of videos before adding them to the documentation.

Where possible convert short videos into looping animated images. '.gif' is an old standard and has been replaced by '.webp', which works exactly the same.

```markdown
![Image Alt Text Title](folder/file_path_to_image.webp)

![Another Image alt text title](folder/file_path_to_image.png)
```

Use this browser tool to convert short videos to .webp files.
[https://imagy.app/mp4-to-webp/]()

Videos can be inserted with the following html string. Global css styling is applied for the `video-container` class. This can be seen in the `extra.css` file.

=== "For web videos"
    Replace `https://www.youtube.com` with the link to the video.
    ```html
    <div class="video-container">
      <iframe src="https://www.youtube.com" allowfullscreen></iframe>
    </div>
    ```

=== "For locally hosted videos"
    Replace `./assets/your_video.mp4` with the relative location of the video file.
    ```html
    <div class="video-container">
      <video controls>
        <source src="./assets/your_video.mp4" type="video/mp4">
      </video>
    </div>
    ```

### Adding Images

Store image files in the `docs/assets/` folder, then reference them in Markdown using a path relative to the current page.

```markdown
![Alt text describing the image](../assets/your_image.png)
```

If your page is at the top level of `docs/`, the path starts with `./assets/`. If it's inside a subfolder, use `../assets/` to go up one level first.

Common image formats supported: `.png`, `.jpg`, `.webp`, `.gif`. Prefer `.webp` for photos and animations as it produces smaller files.

### Adding External Links
If an external link may change in future and is going to be refered to on multiple pages of documentation, it can be defined once and referenced everywhere else to make updating dead links easy.

Define the link in the `mkdocs.yml` file under the `links` section. 

To then use it on your page use double curly braces, with a space, then `links.<your_link_name>` followed by a space and double curly braces.

=== "With single definition"

    # mkdocs.yml
    ```yml
    extra:
      links:
        my_link_name: www.google.co.uk
    ```
    # my_file.md
    ```md
    You will find my link [here]({{ links.my_link_name }})
    ```

=== "Without single definition"

    # my_file.md
    ```md
    You will find my link [here](www.google.co.uk)
    ```

### Helpful links

Markdown Guides:
  - [https://www.markdownguide.org/getting-started/]()
  - [https://www.markdownguide.org/cheat-sheet/]()

MkDocs
  - [https://squidfunk.github.io/mkdocs-material/]()
  - 
