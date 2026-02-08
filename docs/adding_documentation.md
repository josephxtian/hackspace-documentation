#  Adding Documentation

[https://docs.hacman.org.uk]() is the home for documentation relating to Manchester Hackspace

It is hosted on GitHub Pages through mkdocs-material. The wiki is written in markdown, a type of text file, the same that the forum uses.

### Adding Documentation 

=== "Non github user" 

    Create a markdown text file (try [stackedit.io](https://stackedit.io) if you want  a simple editor) and email the output to <board@hacman.org.uk> and we will add it to the repo on your behalf

=== "Github User"

    Create a pull request with a new markdown file in the documentation repository and we will pull it at the next update

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
