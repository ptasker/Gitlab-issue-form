# Gitlab Issue submission form

Example running at https://powerful-meadow-99103.herokuapp.com/

Here's a little NodeJS project that I wrote up for submitting Gitlab issues via a form.

The Gitlab interface is great, but can be a little overwhelming for the non-technical. This form is setup to submit to a pre-defined list of projects (based on Group).

Todos:
- The Gitlab API on the public version is SLLLOOOWWW, so the UI is a little laggy. Move to Angular JS and put in some loading animations.
- Better error handling, validation and sanitization
- Logging.

## Pre-requisites

There's a couple things needed to get this fully up and running

1. Get a Gitlab account and grab your [API key](https://www.safaribooksonline.com/library/view/gitlab-cookbook/9781783986842/ch06s05.html)
2. Get a [Cloudinary account](https://cloudinary.com) and grab your api details (if you want to upload images)
3. Create a .env file in the root of your project, with the follow up values:

```
cloudinary_api_key=5555555
cloudinary_api_secret=super-secret-here
cloudinary_cloud=cloud-id-here
gitlab_api_key=666fff666
gitlab_group_id=12345
```

Note, to figure out your Gitlab group ID, first create the group in Gitlab, then run this app and visit /gitlab-group to get the info
