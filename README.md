## Introduction

DDIT Syllabus Management System is a web application which manages university syllabus in an effective manner. Traditional syllabus management systems require more manpower and are error prone. While our system elements manpower and error by huge margins by making such tasks automatic and managing data properly. Hence improvement in speed of process of syllabus management and we also have access to the system over the web.

## Tech Stack

Frontend has implemented react with bootstrap ui. Backend has implemented in node js express app with sequelize as ORM and mysql as database. Including one external dependency wkhtmltopdf.

## Setup Development Environment

### 1. Install NodeJS

**1**.1 Inside terminal:

```bash
# Using Ubuntu
curl -fsSL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**1.2** Install MySql

```bash
sudo apt install mysql-server
```

**1.3** Install wkhtmltopdf

```bash
sudo apt-get install wkhtmltopdf
```

**1.4** Clone project repository

```bash
git clone https://github.com/sameep-baraiya/syllabus-management-system.git
```

**1.5** Go inside project directory

```bash
cd syllabus-management-system
```

**1.6** Go to backend directory

```bash
cd backend
```

**1.7** Install backend dependencies

```bash
npm install
```

**1.8** Go back to project root directory

```bash
cd ..
```

**1.9** Go to frontend directory

```bash
cd frontend
```

**1.10** Install frontend dependencies

```bash
npm install
```

**1.11** Setup config.env file inside backend directory

Copy config.env.env file to config.env and assign all variables properly.

**1.12** Create your mysql user

Create your user inside mysql and give all permission to that user for your development
and production database.

```bash
CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'new_password';
GRANT ALL ON my_db.* TO 'new_user'@'localhost';
```

**1.13** Run initBackend script from scriptManger in backend

```bash
npm run dev-script
```

**1.14** Test your project by executing initTest in backend

```bash
npm run dev-init-test
```

Result should look like this:

```
PASS #1 config.env exists
PASS #2 JWT_SECRET does exist
PASS #3 JWT_EXPIRE does exist
PASS #4 DEV_DB does exist
PASS #5 DEV_DB_USERNAME does exist
PASS #6 DEV_DB_PASSWORD does exist
PASS #7 DEV_DB_HOST does exist
PASS #8 DEV_DB_DIALECT does exist
Connection has been established successfully (DEV_DB)
PASS #9 Databased connected
PASS #10 Uploads folder exists
PASS #11 Temp folder exists
PASS #12 uploads/academic-batch folder exists
PASS #13 Level DB exists
PASS #14 Level DB initialized properly

Executing (default): SELECT `id`, `name`, `email`, `contactNumber`, `role`, `department`, `password`, `isApproved`, `crudInfo`, `createdAt`, `updatedAt` FROM `User` AS `User` LIMIT 0;

Executing (default): SELECT `id`, `courseCode`, `courseName`, `courseDescription`, `courseType`, `department`, `noOfSem`, `monthPerSem`, `isOutdated`, `isFreezed`, `crudInfo`, `createdAt`, `updatedAt` FROM `Course` AS `Course` LIMIT 0;

Executing (default): SELECT `id`, `subjectCode`, `subjectName`, `subjectShort`, `subjectType`, `subjectDescription`, `department`, `headMasterJSON`, `theoryFile`, `isElective`, `practicalFile`, `semNo`, `listIndex`, `files`, `noOfFiles`, `isOutdated`, `updateNo`, `isFreezed`, `crudInfo`, `createdAt`, `updatedAt`, `successorId`, `predecessorId` FROM `Subject` AS `Subject` LIMIT 0;

Executing (default): SELECT `SubjectId`, `AcademicBatchId` FROM `AcademicBatchSubject` AS `AcademicBatchSubject` LIMIT 0;

Executing (default): SELECT `id`, `academicBatchCode`, `academicBatchDescription`, `academicBatchName`, `startYear`, `endYear`, `files`, `isFreezed`, `crudInfo`, `createdAt`, `updatedAt`, `CourseId` FROM `AcademicBatch` AS `AcademicBatch` LIMIT 0;

Executing (default): SELECT `id`, `meetingCode`, `meetingsNotes`, `dateOfMeeting`, `meetingType`, `department`, `requestedChanges`, `files`, `noOfFiles`, `isFreezed`, `relationObject`, `crudInfo`, `createdAt`, `updatedAt` FROM `Meeting` AS `Meeting` LIMIT 0;

Executing (default): SELECT `id`, `msg`, `type`, `model`, `by`, `createdAt`, `updatedAt` FROM `CRUDLog` AS `CRUDLog` LIMIT 0;

Executing (default): SELECT `id`, `title`, `msg`, `department`, `crudInfo`, `createdAt`, `updatedAt` FROM `Announcement` AS `Announcement` LIMIT 0;

PASS #15 Database models exists properly

```

**1.14** Test project in devlemplemnt mode

```bash
# Inside backend
$ npm run dev

# Inside Frontend (in separate terminal)
$ npm run start
```

Run following commands in two separate terminals. Application will open a new browser
tab automatically at localhost:3000.

## Code Structure

### Backend

Entry point of backend express server is server.js file, it performs initialization of express app, initialization socket io (for notification system), mounte router with respective route file, loaded environment variables.

Based on request url it file forwarded to preticuler route which match with it. Where it goes throw validator, authentication-protect, advanced-result middleware based on url to perform initial operation on request before forwarding request to controller module.

Inside the controller it will perform specific operations based on request type. It can be creation of a new subject, read operating of academic batch, updated config, or file generation. In between middleware and controller if an error occurred it will pass to the last error handler middleware where it handles all errors at one place.

Valdiator middleware are responsible to validate the request body. It will check the the request body contains all necessary data and with its right format.

Advance-result middleware is responsible for advance result filter with pagination, search query, field inclusion-exclusion.

Protect middleware responsible to verify authenticity of request by using javascript webtokent (JWT). It also restices request access based on user role.

### Frontend

Entry point frontend app is index.html which intern mount react application to client and load all necessary components. Starting point of the react app is App.js file. It loads all state components of application which allow global access to application sub components common data, load sidebar.css and showonhover.css style components, initialized pdf js global service worker.

Frontend is mainly divided in 3 parts: Navbar, Sidebar, MainContent.

Navbar: Navbar gives routing functionality for higher order routes of the system with notification, loading animation, initialization of config, route protection based on user role and authentication status.

Sidebar: Sidebar provides sub components routing functionality on the left side of application. It also restricts certain routes based on user role.

MainContent: Here all UI components will render based on route and user role restriction.

All Context fill used for mating global access of important common data for application
sub components. By this pattern we avoid heavy props passing and improve readability of
code.

### Coding Standards

Application following rest pattern. Every backend request starts with “/api/v1/path”. Here “v1” suggests a version of the “api” backend route.

Backend is divided into controller, model, middleware mainly. Server will forward requests based on the path to repectice route file, then the route will execute middleware and controller in specific order.

Frontend is divided in model, layout, context components mainly. The layout component aligns the main context on view and provides common visual components. Model components contain model vise create, view, edit, delete, find component for pertucaler model. By combining this model components we can have new components. Context component provides all components to command global data and functionality.
