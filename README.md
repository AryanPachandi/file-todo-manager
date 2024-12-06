
```markdown
# File Todo Manager

This is a simple Node.js-based project that allows you to manage files and a to-do list. It includes routes for managing files in a folder and provides a to-do list functionality using an Express server. The to-do list data is saved in a `todos.json` file.

## Features

- **File Management**: 
  - View files in a folder.
  - Read the contents of files.

- **To-Do List**: 
  - Add, view, and delete tasks.
  - Tasks are stored in a JSON file (`todos.json`).

## Requirements

- Node.js (v14.x or higher)
- Express.js
- File System access for managing and viewing files

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/AryanPachandi/file-todo-manager.git
    ```

2. Navigate into the project directory:

    ```bash
    cd file-todo-manager
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the server:

    ```bash
    node todoexpress.js
    ```

2. Access the following routes:

    - **File Management**:
      - `GET /`: Displays a welcome message and lists the files in the root folder.
      - `GET /:foldername`: Displays files in a specified folder.
      - `GET /:foldername/:filename`: Displays the contents of a specific file.
      - `GET /files.json`: Retrieves and displays the list of files in the folder as a JSON response.

    - **To-Do List**:
      - `GET /gettodos`: Fetches all to-dos.
      - `POST /todos`: Creates a new to-do item.
      - `DELETE /todos/:id`: Deletes a to-do by its ID.

## Example

- **Get To-Dos**:
  
  ```bash
  curl http://localhost:3000/gettodos
  ```

- **Add a To-Do**:

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"des": "Buy groceries"}' http://localhost:3000/todos
  ```

- **Delete a To-Do**:

  ```bash
  curl -X DELETE http://localhost:3000/todos/1
  ```

- **Get Files List**:

  ```bash
  curl http://localhost:3000/files.json
  ```

- **Get File Contents**:

  ```bash
  curl http://localhost:3000/:foldername/:filename
  ```


- **`GET /files.json`**: Retrieves and displays the list of files in the folder as a JSON response.
- **`GET /:foldername/:filename`**: Displays the contents of a specific file.

Feel free to adjust any details as needed!
