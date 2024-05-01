interface User {
    name: string;
    email: string;
}

export function generateHtml(user: User, token: string, url: string): string {
     return `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <title>Welcome</title>
        <style>
          body {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: "Dosis", sans-serif;
          }
          .container {
            width: 100%;
            margin: 20px auto 0;
            text-align: center;
            background-color: white;
          }
          img {
            width: 100%;
          }
          .section-body {
            padding: 15px 30px;
            background-color: rgb(55, 51, 51);
          }
          .email-heading {
            color: rgba(255, 247, 0, 0.953);
            letter-spacing: 3px;
            font-weight: 700;
          }
          .email-message {
            color: white;
            font-size: 24px;
            line-height: 1.6;
          }
          a {
            background-color: gold;
            display: block;
            color: black;
            width: fit-content;
            padding: 5px 10px;
            margin: 10px auto 0;
            text-decoration: none;
            font-weight: 700;
          }
          footer {
            background-color: rgb(171, 168, 168);
            padding: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <img
              src="https://res.cloudinary.com/dkbsyvcpa/image/upload/v1697630206/aphia-image.jpg"
              alt="aphia logo"
            />
          </header>
          <div class="section-body">
            <h1 class="email-heading section-body">Password Change Request!</h1>
            <p class="email-message">Hello ${user.name},</p>
            <p class="email-message">
              We noticed you requested to change your password. If you didn't, please ignore.
            </p>
            <p>
              Else, click here to continue.
              <a href="${url}/reset-password/${token}">
                Click here
              </a>
            </p>
          </div>
          <footer>
            <p>&copy; Ace & Grit Legal Practitioners</p>
          </footer>
        </div>
      </body>
    </html>
  `;
}

