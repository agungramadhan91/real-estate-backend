# TUTORIAL NOTES

### App Structure
   1. React (Client): from github
   1. Express API (Server)
   1. Prisma
   1. MongoDB

   Request flow:
   `React` -> `Express API` -> `Prisma` -> `MongoDB` <br>
   Response flow:
   `MongoDB` ->  `Prisma` -> `Express API` -> `React`

</br>

### Database Model Collection
   - User
   - Post
   - Post Details
   - Saved Post
   - Chat
   - Message

   ```
   # Database Relations

   user.id < post.userId
   post.id - postDetail.postId
   user.id < savedPost.userId
   post.id < savedPost.postId
   user.id < chat.userIds
   chat.id < message.chatId
   ```


  