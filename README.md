1  **Title of the project ->** Blockchain-Explorer
2  **Technology stack/libraries used ->** Express, MongoDb, Axios, https://etherscan.io/
3  **Steps to run/build the project**

i - Install Node.js and npm: Ensure Node.js and npm are installed.
ii - Install MongoDB: Install MongoDB and ensure it's running.
iii - Clone the Repository: Clone the project repository or download it.
iv - Install Dependencies: Run npm install to install dependencies.
v - Run the Application: Execute  node server.js
vi - Access API Endpoints: Use tools like Postman to access endpoints.

4 ** A public Video link ->** https://drive.google.com/file/d/1Z1zL8hpjl63jvmf-s0mZDnoEzY6XZZpM/view?usp=sharing

5- **A paragraph explaining how you approached the task.**
In order  to  create a blockchain explorer for Ethereum addresses and implementing the functionality to set up alerts, following key points are executed:-  Firstly, as to minimize 3rd party API calls, I used backend server to cache and manage address details, reducing the dependency on external services and improving the performance. 
The use of Express.js provided a robust framework for handling HTTP requests and routing, the creation of RESTful endpoints for retrieving address details and setting up alerts. By integrating with the Etherscan API, essential information such as balance, transactions, logs, and internal transactions could be fetched efficiently. The implementation of a MongoDB database using Mongoose allowed  storage of user-defined alerts, enabling users to specify threshold amounts and notification methods for monitoring address activities. Throughout the development process, emphasis was made on error handling to ensure the server's stability and responsiveness, thereby enhancing the overall user experience. With the best efforts solution is done to address the requirements effectively considering scalability and extensibility.
