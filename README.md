# বাজার দর | BazarDor

### প্রতিদিনের প্রয়োজনীয় পণ্যের দাম এক নজরে

**BazarDor** is a Bengali-language web application designed to help users explore the prices of essential daily products in one place. It provides product information, price comparisons, price change indicators, and a responsive interface for a convenient browsing experience.

---

## About the Project

BazarDor aims to make information about everyday market prices easier to access. Users can explore essential products, check current prices, view price changes, and navigate product categories through a clean and user-friendly interface.

The application also includes user authentication, allowing users to sign in using supported authentication methods.

## Features

* **Product Price Listing** — Browse essential daily products and their prices.
* **Price Change Indicators** — Identify price increases and decreases.
* **Product Details** — Explore additional information about individual products.
* **Category-Based Navigation** — Find products through relevant categories.
* **User Authentication** — Sign up and sign in using email and password, Google, or GitHub when configured.
* **Responsive Design** — Enjoy a user-friendly experience on desktop, tablet, and mobile devices.
* **Bengali Interface** — Access market information through a Bengali-language interface.

## Technologies Used

| Technology   | Purpose                                    |
| ------------ | ------------------------------------------ |
| Next.js      | React framework and application routing    |
| React        | User interface development                 |
| TypeScript   | Type-safe development                      |
| Tailwind CSS | Responsive styling                         |
| Better Auth  | Authentication and session management      |
| MongoDB      | Database                                   |
| REST API     | Product and category data                  |
| Vercel       | Deployment and hosting                     |
| Git & GitHub | Version control and source code management |

## Live Demo

**Live Website:** (https://bazar-dor-2-snowy.vercel.app/)

## Getting Started

Follow these instructions to run BazarDor locally.

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

### 1. Clone the Repository

Replace `akib511` with your GitHub username and `bazar-dor-2` with your actual repository name.

```bash
git clone https://github.com/akib511/bazar-dor-2.git
```

### 2. Navigate to the Project Directory

```bash
cd YOUR_REPOSITORY_NAME
```

### 3. Install Dependencies

```bash
npm install
```



**Important:** These variable names must match your actual application configuration. Remove any variables for providers you do not use, and add any additional variables your project requires. Never commit real credentials or secret values to GitHub.

### 4. Start the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the application.

## Project Structure

The project follows the Next.js App Router structure.

```text
bazar-dor/
├── public/
├── src/
│   ├── app/
│   ├── component/
│   └── lib/
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

*Note: The structure above is illustrative. Your actual folders and files may differ.*

## Authentication

BazarDor uses Better Auth for user authentication.

Depending on the configured providers, users can authenticate using:

* Email and password
* Google
* GitHub

Social authentication requires valid provider credentials and correctly configured callback URLs. Production environment variables must also be configured in the hosting platform.

## Deployment

The application is deployed using Vercel.

To deploy your own version:

1. Push the project to a GitHub repository.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Set up the authentication provider credentials and callback URLs for your deployment domain.
5. Deploy the application and verify its functionality.

## Disclaimer

Market prices may vary depending on location, market conditions, availability, and the time of collection. Always verify prices with local sellers before making purchasing decisions.

## Author

**Shahariar Hossen Akib**

Frontend Developer | React | Next.js | TypeScript

---

*Built to make everyday market price information easier to explore.*
