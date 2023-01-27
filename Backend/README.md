<!-- @format -->

# post-it-backend

This is a Node.js Express application that allows users to upload files and retrieve them by a unique ID. The application uses the following libraries:

    express: A minimal web framework for Node.js that allows you to easily create web applications and APIs.
    multer: A middleware for handling HTTP multipart/form-data, which is used for file uploads.
    mongoose: An Object Document Mapping (ODM) library for MongoDB that allows you to interact with the database using JavaScript objects.

The application connects to a MongoDB Atlas cluster using the mongoose library, and creates a new MongoDB document for each uploaded file. The file data is saved in the data field of the document, and the file's content-type is saved in the contentType field. The files are saved in the files collection.

The application has two main routes:

    /upload: This route is used to upload files. It uses the multer middleware to handle the file upload and creates a new MongoDB document with the file data. It then responds with a JSON object containing the URL of the uploaded file.
    /files/:id: This route is used to retrieve an uploaded file by its unique ID. It uses the mongoose library to query the files collection by ID, and then sends the file data back to the client with the appropriate content-type header set.

This application listen on port 5000, and once the server starts listening it will print "Server listening on port 5000" in the console.
It also uses the environment variable to connect to the MongoDB cluster, for security reasons you should use a .env file to store the MongoDB connection string instead of hard-coding it in your code.
It returns the file URL as http://localhost:5000/files/:id if you want to access the file, if you want to access the file with the hostname you should use process.env.VERCEL_URL + req.headers.host.

You may want to customize this to fit your needs, like changing the routes, adding authentication, and handling errors.


#  "mongodb+srv://sam4:samuonfleek@userauth.ruoedti.mongodb.net/?retryWrites=true&w=majority",