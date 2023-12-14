# Blood Donation System  [ React.js , MySQL, Spring Boot ] 

## Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js and npm installed for the React frontend.
-  MySQL database setup.
- Java and Maven installed for the Spring Boot backend.

### Frontend (React)

1. Clone the repository:

    ```bash
    git clone https://github.com/your/repository.git
    ```
    
2. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```
### Database (MySQL)

1. Make sure you have MySQL installed and running.

2. Create a new database for the project.

3. Update the database configuration in the backend application properties or environment variables if needed.

4. Initialize the database schema and data if necessary.


## Running the Spring Boot Project in Eclipse or Spring Tool Suite (STS)

To run the Spring Boot backend of this project in Eclipse or STS, follow these steps:

### Prerequisites

- Eclipse or Spring Tool Suite (STS) installed.
- JDK (Java Development Kit) installed.

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/your/repository.git
    ```

2. Open Eclipse or STS.

3. Import the backend project:

    - Click on `File` -> `Import`.
    - Choose `Existing Maven Projects`.
    - Navigate to the backend directory and select the `pom.xml` file.
    - Click `Finish` to import the project.

4. Build the project:

    - Right-click on the project in the Project Explorer.
    - Select `Run As` -> `Maven clean`.
    - Then, right-click again and choose `Run As` -> `Maven install`.

5. Run the Spring Boot application:

    - Navigate to the main class (`Application.java` or similar).
    - Right-click on the main class.
    - Select `Run As` -> `Java Application`.

6. The backend server should now be running locally in Eclipse or STS on `http://localhost:8080`.


Now, the frontend, backend, and database are set up locally. You can access the application by visiting `http://localhost:3000` for the React frontend and making requests to the backend running at `http://localhost:8080`.


### Additional Notes

- Adjust any necessary configurations within the project, such as database settings or application properties.
- Ensure that port 8080 is not in use by other services to avoid conflicts.

Now, the backend server is running within Eclipse or STS, allowing you to interact with the APIs or connect it to the frontend of your project.


