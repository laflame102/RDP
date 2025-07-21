<!-- # Personal Recipe Discovery Platform

## How to use

1. **Clone the repository**

   ```bash
   git clone https://github.com/laflame102/RDP
   cd RDP
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Create backend .env file**

   ```bash
   DB_HOST=example
   DB_PORT=example
   DB_USER=example
   DB_PASS=example
   DB_NAME=example
   JWT_ACCESS_SECRET=example
   JWT_REFRESH_SECRET=example
   ```

````

4. **Compose docker**

```bash
docker-compose up --build
```

or run it in the background

```bash
docker-compose up --build -d

```

4. **Forward port**

Run the development port

```bash
npm run dev
````

5. **Go to frontend folder and install dependencies**

   ```bash
   cd ..
   cd frontend
   npm install

   ```

6. **Run port**

   Run the development port

```bash
 npm run dev
```

7. **Open app link**

```bash
http://localhost:4000
```

 -->

# Personal Recipe Discovery Platform

## How to use

1. **Clone the repository**

   ```bash
   git clone https://github.com/laflame102/RDP
   cd RDP
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Create backend .env file**

   Create backend .env file

   ```bash
   DB_HOST=example
   DB_PORT=example
   DB_USER=example
   DB_PASS=example
   DB_NAME=example
   JWT_ACCESS_SECRET=example
   JWT_REFRESH_SECRET=example
   ```

4. **Compose Docker**

   ```bash
   docker-compose up --build
   ```

   Or run in the background:

   ```bash
   docker-compose up --build -d
   ```

5. **Start the backend development server**

Go to the backend directory:

```bash
cd backend
npm run dev
```

6. **Install frontend dependencies**

  Go to the frontend directory

   ```bash
   cd frontend
   npm install
   ```

7. **Start the frontend development server**

   ```bash
   npm run dev
   ```

8. **Open the application**

   Navigate to: [http://localhost:4000](http://localhost:4000)
