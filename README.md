# Threephase

This is the source for my portfolio site, Threephase.

Served at:

* threephase.xyz (primary)
* christopherpeplin.com (legacy, redirects to threephase.xyz)
* rhubarbtech.com (legacy, also redirects)

This site uses a modified version of the [Index
theme](https://jekyllthemes.io/theme/index-portfolio-jekyll-theme) from
[jekyllthemes.io](https://jekyllthemes.io/) (see the [license](THEME_LICENSE.html).

## Local Development

```sh
bundle install
bundle exec jekyll serve -wl
```

## Image Optimization

When possible, offer both JPG and WebP versions of images. Use
https://squoosh.app/ to generate manually, or use this script to convert a
folder of originals:

```
$ ./optimize_images.sh images/originals/FOO images/FOO
```

Keep the originals in the same folder, albeit not checked into the repository,
to make mass re-optimizations easier in the future.
