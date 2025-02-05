# Study sessions

A project made by:
<ul>
  <li>Klaudia Pohanková, učo 536642</li>
  <li>Kateřina Vácová, učo 514380</li>
  <li>Adam Drobný, učo 525173</li>
  <li>Michal Oleksik, učo 492823</li>
</ul>

## Setup

Following section describes the basic setup you need to perform to be able to run this project.

### Backend

From the project directory run following commands:
```shell
cd ./backend
npm i
./database.sh
npm run migrate:up
npm run seed
npm run watch
```

### Frontend

From the project directory run following commands:
```shell
cd ./frontend
npm i
npm run dev
```

### Accounts to use

To access our test accounts pre-defined you can use following credentials:

A regular user test account:
```
email: test@test.cz
password: Heslo123
```

An admin account:
```
email: admin@admin.cz
password: Admin1234
```

You can also create your own user account.