# Student Profile API


A RESTful API for managing student profiles, subjects, grades, and registrar information. The project includes a web frontend (Bootstrap 5 + DataTables) and a Node.js/Express.js backend with SQLite for persistent storage.

## Getting Started

### Prerequisites
- [Node.js 18.x](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation
```bash
git clone https://github.com/ChristopherYS/sp_api_v3.git
cd sp_api_v3
npm install
```

### Environment Variables
Create a `.env` file in the root directory with the following content if it doesnt exist:
```env
API_KEY=your_api_key_here
PORT=3000
```
Replace `your_api_key_here` with your desired API key.

### Running the Server
```bash
npm start
```
# Or for development with auto-reload
```bash
npm run dev
```

## Authentication
Most endpoints require an API key. Include it in the `x-api-key` header of your requests:

```http
GET /student/allstud
Host: localhost:3000
x-api-key: your_api_key_here
```

**Example with curl:**
```bash
curl -H "x-api-key: your_api_key_here" http://localhost:3000/student/allstud
```


## API Documentation & Testing

- The web UI at [`/public/index.html`](public/index.html) provides a browsable overview of all endpoints.
- **Note:** If you are running the project locally, update the `getBaseUrl` value in [`public/config.js`](public/config.js) to `http://localhost:3000` for the frontend to work correctly with your local backend.


## Features
- Registrar and student authentication
- CRUD operations for students, registrars, and subjects
- Manage student grades (reate, read, update, delete)
- API key-based authentication for protected endpoints
- Responsive web UI with Bootstrap 5 and DataTables
- Environment variable management with dotenv
- Password hashing with bcrypt
- CORS support for cross-origin requests

## Technologies Used
- **Node.js** — Backend JavaScript runtime environment
- **Express.js** — Fast, minimalist web server framework for Node.js
- **SQLite** — Lightweight SQL database engine (accessed via `better-sqlite3`)
- **bcrypt** — Library for secure password hashing
- **cors** — Middleware for enabling Cross-Origin Resource Sharing
- **dotenv** — Loads environment variables from `.env` files
- **Bootstrap 5** — CSS framework for responsive web design
- **DataTables** — jQuery plugin for advanced HTML table features

## Example API Usage

**Create a new student:**
```bash
curl -X POST http://localhost:3000/student/newstud \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key_here" \
  -d '{"name":"John Doe","school_id":"2025001","address":"123 Main St","email_address":"john@example.com","username":"johndoe","password":"password123","course":"BSCS"}'
```

**Get all subjects:**
```bash
curl -H "x-api-key: your_api_key_here" http://localhost:3000/subject/allsub
```

## API Endpoints

### Registrar Endpoints
- `POST   /registrar/login` — Registrar login
- `POST   /registrar/newreg` — Create new registrar
- `GET    /registrar/allreg` — Get all registrars
- `GET    /registrar/:id` — Get registrar by ID
- `PUT    /registrar/:id/info` — Update registrar info
- `DELETE /registrar/delreg` — Delete registrar
- `PUT    /registrar/:id/username` — Update registrar username
- `PUT    /registrar/:id/password` — Update registrar password

### Student Endpoints
- `POST   /student/login` — Student login
- `POST   /student/newstud` — Create new student
- `GET    /student/allstud` — Get all students
- `GET    /student/:id` — Get student by ID
- `PUT    /student/:id/info` — Update student info
- `DELETE /student/delstud` — Delete student
- `PUT    /student/:id/username` — Update student username
- `PUT    /student/:id/password` — Update student password

### Subject & Grades Endpoints
- `POST   /subject/newsub` — Create new subject
- `GET    /subject/allsub` — Get all subjects
- `GET    /subject/:id` — Get subject by ID
- `PUT    /subject/:id` — Update subject info
- `DELETE /subject/delsub` — Delete subject
- `POST   /subject/addstudgrades` — Add student grades
- `PATCH  /subject/updatestudgrades` — Update student grades
- `DELETE /subject/delstudgrades` — Delete student grades
- `GET    /subject/studgrades/:studentId` — View student grades by student ID

## Project Structure

```
app.js                                  # Main Express app
package.json                            # Project metadata and dependencies
student_profile.db                      # SQLite database file

controllers/                            # Route handler logic
  registrar_controller.js
  student_controller.js
  subject_controller.js

db/                                     # Database setup and schema
  database.js
  student_profile_db_schema.drawio

middleware/                             # Express middleware
  auth_middleware.js                    # API key validation

models/                                 # Data access logic
  registrar_model.js
  student_model.js
  subject_model.js

public/                                 # Static frontend files (HTML, CSS, JS)
  all_students.html
  all_subjects.html
  delete_registrar.html
  delete_student.html
  delete_student_grades.html
  delete_subject.html
  get_registrar_by_id.html
  get_student_by_id.html
  get_subject_by_id.html
  index.html                            # API documentation UI
  newgrade.html
  newreg.html
  newstud.html
  newsub.html
  registrar_login.html
  student_login.html
  update_registrar_info.html
  update_registrar_password.html
  update_registrar_username.html
  update_student_grades.html
  update_student_info.html
  update_student_password.html
  update_student_username.html
  update_subject_info.html
  view_student_grades.html
  config.js                             # Frontend config (update getBaseUrl for local or deployment use)

routes/                                 # Express route definitions
  registrar_routes.js
  student_routes.js
  subject_routes.js
```

---

**Authors:** Bea Verna Barañao, Joshua Repique, Christopher Sembrano