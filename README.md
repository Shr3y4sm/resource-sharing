
# 📚 Resource Sharing Platform

A web-based platform for sharing academic resources, built with Node.js, Express, and SQLite. This platform enables users to upload, access, and collaborate on educational materials with ease, fostering a more connected learning environment.

> 🏆 **Achievement:** Developed during a **3-hour hackathon** — *Promptology* — where we secured **1st place** by designing and prototyping a functional web application from scratch!

## Features

- Upload and share educational resources
- Organize resources by semester, branch, and subject
- Browse and search through available resources
- Persistent storage using SQLite database
- Clean and intuitive user interface using EJS templates

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** SQLite with Sequelize ORM
- **Frontend:** EJS (Embedded JavaScript templates)
- **File Handling:** Multer

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

```bash
git clone https://github.com/Shr3y4sm/resource-sharing.git
cd resource-sharing
npm install
node app.js
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
resource-sharing/
├── app.js              # Main application file
├── package.json        # Project dependencies
├── uploads/            # Directory for stored resources
└── views/              # EJS template files
    ├── index.ejs       # Home page
    ├── resources.ejs   # Resource listing page
    ├── sign-in.ejs     # Sign-in page
    └── upload.ejs      # Upload form page
```

## Database Schema

The application uses a SQLite database with the following resource schema:

- `title`: String (Resource title)
- `fileName`: String (Stored file name)
- `semester`: String (Semester number)
- `branch`: String (Branch/Department)
- `subject`: String (Subject name)

## Usage

1. Access the home page at [http://localhost:3000](http://localhost:3000)
2. Navigate to the upload page to share new resources
3. Browse existing resources on the resources page
4. Download resources by clicking on their titles

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Huge thanks to the Promptology organizers for the challenge, and to our amazing team for their collaboration and innovation!
