# Scratchbook

__Scratchbook__ is a scrapbook for music.

A creates an account and then signs in. Once signed in, __Scratchbook__ displays all albums the user has added to their page, as well as the option to add new albums and album covers. There is a function, getAlbums, then when called sends a GET request to the api and returns all of the user's albums. It then sends the return object to a displayAlbums function that loads the data into handlebars to be displayed. The getAlbums fuction is called when a user signs in, adds, edits, deletes, or adds a cover to an album, refreshing the page after every user appropriate user action.

Covers are retrieved from the LastFM api via GET request, and a PATCH request is sent to the __Scratchbook__ api with the cover's url upon success.

I originally intended to include a social aspect, where users could "follow" their friends to see their albums and what they thought of them. I decided not to pursure a social function in the interest of time, but will be revisiting it in the future.

__User Stories__

-As a user, I want to be able to sign in with my credentials so I can see my albums.

-As a developer, I want to use a GET request to validate sign-in info and nested routes to display only the current user's albums.

-As a user, I want to be able to add new ablums and edit ones I've already added.

-As a developer, I want to use POST and PATCH requests to send new album data and updated album data to the api.

-As a user, I want to be able to add album covers to my ablums.

-AS a developer, I want to use a GET request to the LastFm api to get ablum covers and instantly PATCH them to my api.


[Wireframes](https://moqups.com/#!/edit/philschoof/6Oo0ssCT)

[Scratchbook](http://philschoof.github.io/scratchbook/)

[Scratchbook Server](https://github.com/philschoof/scratchbook-server)
