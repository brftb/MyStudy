## Station 6 「OGP」
https://ogp.me/
### 基本
```html
   <meta property="og:title" content="ページのタイトル"/>
   <meta property="og:type" content="ページの種類"/>
   <meta property="og:url" content="ページのURL"/>
   <meta property="og:image" content="サムネイルのURL"/>
   <meta property="og:site_name" content="サイト名"/>
   <meta property="og:description" content="ページの説明文"/>
```

#### type
* music.song
   * music:duration - integer >=1 - The song's length in seconds.
   * music:album - music.album array - The album this song is from.
   * music:album:disc - integer >=1 - Which disc of the album this song is on.
   * music:album:track - integer >=1 - Which track this song is.
   * music:musician - profile array - The musician that made this song.
* music.album
   * music:song - music.song - The song on this album.
   * music:song:disc - integer >=1 - The same as music:album:disc but in reverse.
   * music:song:track - integer >=1 - The same as music:album:track but in reverse.
   * music:musician - profile - The musician that made this song.
   * music:release_date - datetime - The date the album was released.
* music.playlist
   * music:song - Identical to the ones on music.album
   * music:song:disc
   * music:song:track
   * music:creator - profile - The creator of this playlist.
* music.radio_station
   * music:creator - profile - The creator of this stat
* video.movie
   * video:actor - profile array - Actors in the movie.
   * video:actor:role - string - The role they played.
   * video:director - profile array - Directors of the movie.
   * video:writer - profile array - Writers of the movie.
   * video:duration - integer >=1 - The movie's length in seconds.
   * video:release_date - datetime - The date the movie was released.
   * video:tag - string array - Tag words associated with this movie.
* video.episode
   * video:actor - Identical to video.movie
   * video:actor:role
   * video:director
   * video:writer
   * video:duration
   * video:release_date
   * video:tag
   * video:series
* article - Namespace URI: https://ogp.me/ns/article#
   * article:published_time - datetime - When the article was first published.
   * article:modified_time - datetime - When the article was last changed.
   * article:expiration_time - datetime - When the article is out of date after.
   * article:author - profile array - Writers of the article.
   * article:section - string - A high-level section name. E.g. Technology
   * article:tag - string array - Tag words associated with this article.
* book - Namespace URI: https://ogp.me/ns/book#
   * book:author - profile array - Who wrote this book.
   * book:isbn - string - The ISBN
   * book:release_date - datetime - The date the book was released.
   * book:tag - string array - Tag words associated with this book.
* profile - Namespace URI: https://ogp.me/ns/profile#
   * profile:first_name - string - A name normally given to an individual by a parent or self-chosen.
   * profile:last_name - string - A name inherited from a family or marriage and by which the individual is commonly known.
   * profile:username - string - A short unique string to identify them.
   * profile:gender - enum(male, female) - Their gender.
* website - Namespace URI: https://ogp.me/ns/website#

***
### Twitter
```html
   <meta name="twitter:card" content="カード種類" />
   <meta name="twitter:site" content="@ツイッターユーザー名" />
```
#### card
summary - タイトル、説明、およびサムネイル。最も一般的な形です。
summary_large_image - summary cardと同じ形で、画像の大きさがそれより大きいもの。Facebookのカードに近い形です。
app - アプリ配布用の表示カード。アプリの名前や紹介文、アプリアイコンに加えて、評価や価格などの表示もされます。
player - ビデオやオーディオなどのメディアを表示できるカード
#### site
@から始まる、コンテンツの作成者や管理者のTwitterユーザーIDを入力します。


## Station 9 「レスポンシブ対応」

```css
@media screen and (max-width: 1200px) {
}
@media screen and (max-width: 768px) {
}
@media screen and (max-width: 320px) {
}
```


