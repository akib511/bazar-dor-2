# বাজার দর | BazarDor

**বাজার দর** is a Bengali-language web application that helps users explore the prices of essential daily commodities in one place. It provides a simple and user-friendly way to check product prices and understand price changes.

The project is built with modern web technologies to deliver a responsive experience across mobile, tablet, and desktop devices.

## About the Project

BazarDor aims to make everyday market price information easier to access. Users can browse different products, view their current prices, compare price changes, and create an account to access the website's authentication features.

## Technologies Used

* **Next.js** — React framework for building the web application
* **React** — Component-based user interface
* **TypeScript** — Type-safe JavaScript development
* **Tailwind CSS** — Responsive styling and UI design
* **Better Auth** — User authentication
* **MongoDB** — Database for authentication-related data
* **REST API** — Fetching product and market price information

## Key Features

### 1. Product Price Listing

Browse a collection of essential daily commodities and view their current prices in Bengali.

### 2. Price Change Indicators

Quickly identify whether a product's price has increased, decreased, or remained unchanged.

### 3. Product Details

Open individual product pages to explore more information about specific products.

### 4. User Authentication

Create an account or sign in using email and password, Google, or GitHub authentication.

### 5. Responsive User Interface

Access the application through mobile phones, tablets, and desktop devices with a responsive layout.

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git

### Installation

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

**2. Navigate to the project directory**

```bash
cd bazar-dor
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file in the project root and add the environment variables required by the application.

For example:

```env
MONGO_DB_URL=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Configure any additional variables required by your project and authentication providers. Never commit real credentials or secrets to GitHub.

**5. Start the development server**

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Status

BazarDor is an ongoing web development project. Features and improvements may be added as development continues.

## Disclaimer

Market prices may vary depending on location, seller, and market conditions. Displayed prices should be treated as indicative information rather than guaranteed prices.

## Author

Developed as a web development project using Next.js, TypeScript, and modern web technologies.
