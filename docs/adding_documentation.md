#  Adding Documentation

https://docs.hacman.org.uk is the home for documentation relating to Manchester Hackspace

It is hosted on GitHub Pages through mkdocs-material. The wiki is written in markdown, a type of text file, the same that the forum uses.

### Adding Documentation 

#### Github User

Create a pull request with a new markdown file in the documentation repository and we will pull it at the next update

#### Non github user 

Create a markdown text file (try [stackedit.io](https://stackedit.io) if you want  a simple editor) and email the output to board@hacman.org.uk and we will add it to the repo on your behalf

### Adding videos, GIFs and animations

Videos and animated images are supported. Reduce the size of videos before adding them to the documentation.

Where possible convert short videos into looping animated images. '.gif' is an old standard and has been replaced by '.webp', which works exactly the same.

```markdown
![Image Alt Text Title](folder/file_path_to_image.webp)

![another image alt text title](folder/file_path_to_image.png)
```

Use this browser tool to convert short videos to .webp files.
[](https://imagy.app/mp4-to-webp/)

Videos can be inserted with the following html string. Global css styling is applied for the `video-container` class. This can be seen in the `extra.css` file.

For web links
```html
<div class="video-container">
  <iframe src="https://youtube.com" allowfullscreen></iframe>
</div>
```

For locally hosted videos
```html
<div class="video-container">
  <video controls>
    <source src="../your_video.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>
```

### Helpful links

Markdown Guides:
  - [https://www.markdownguide.org/getting-started/](https://www.markdownguide.org/getting-started/)
  - [https://www.markdownguide.org/cheat-sheet/](https://www.markdownguide.org/cheat-sheet/)

MkDocs
  - [https://squidfunk.github.io/mkdocs-material/](https://squidfunk.github.io/mkdocs-material/)
