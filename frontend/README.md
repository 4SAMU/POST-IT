
# POST-IT

This social app is built on the Ethereum blockchain using the Solidity programming language. It utilizes smart contracts to manage user profiles, posts, and messages within the app.

Users can create their own profile by calling the "createProfile" function, which takes in their name, bio, and a hash of their profile image. Once a profile is created, users can edit their profile by calling the "editProfile" function and passing in new values for their name, bio, and image hash. Users can also retrieve other user's profiles by calling the "getProfile" function and passing in the address of the user whose profile they wish to retrieve.

The app also allows users to create and manage their own posts. Users can create a new post by calling the "createPost" function and passing in the text and hash of a file associated with the post. They can also edit or delete their existing posts by calling the "editPost" or "deletePost" function and passing in the ID of the post they wish to change. Users can also retrieve all the posts of a specific user by calling the "getUserPosts" function and passing in the address of the user.

The app also allows users to send and receive messages, they can create a new message by calling the "createMessage" function and passing in the address of the receiver and the message text. They can also retrieve all the messages of a specific user by calling the "getUserMessages" function and passing in the address of the user.

Events are also emitted when a new profile is created, a new message is sent and a new post is made. These events can be used to track certain actions within the app and provide additional functionality.

This app allows users to interact with the Ethereum blockchain, creating and managing their own profiles, posts and message and also allowing them to interact with other users.

# contract address = 0x56Eea3A7072AF1f10202f325a1942885FF3628BB

# trouble shooting

Cant resolve ipfs-car/blockstore/memory when importing nft.storage?

    -Go to node_modules/nft.storage directory.
    -Make sure you have ipfs-car/dist/esm/blockstore and ipfs-car/dist/esm/pack. If not, install ipfs-car with npm i ipfs-car. Copy ipfs-car/dist/esm to nft.storage/src.
    -Inside nft.storage/src, update the ipfs-car import statements in the following files like so:

-Inside platform.web.js, update to this: import { MemoryBlockStore } from 'ipfs-car/dist/esm/blockstore/memory'

-Inside lib.js, update to this: import { pack } from 'ipfs-car/dist/esm/pack'

-Inside token.js, update to this: import { pack } from 'ipfs-car/dist/esm/pack'

-This solved my problem.

[![GitHub Streak](http://github-readme-streak-stats.herokuapp.com?user=4SAMU&theme=dark&date_format=j%20M%5B%20Y%5D)](https://git.io/streak-stats)
