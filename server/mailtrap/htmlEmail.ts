export const htmlResetEmail = (resetLink: string) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9fafc;
      margin: 0;
      padding: 0;
    }
    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 40px auto;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #333333;
    }
    p {
      color: #555555;
      line-height: 1.6;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 24px;
      background-color: #4caf50;
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #999999;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Reset Your Password</h2>
    <p>Hello,</p>
    <p>We received a request to reset your password. Click the button below to set a new password. This link will expire in 1 hour.</p>
    <a href="${resetLink}" class="btn">Reset Password</a>
    <p>If you didn’t request a password reset, you can safely ignore this email.</p>
    <p>Thanks,<br />The Food App Team</p>
    <div class="footer">
      &copy; 2025 Food App. All rights reserved.
    </div>
  </div>
</body>
</html>

    
    `
}
export const htmlResetSuccessEmail = () => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f7;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      padding: 30px;
    }

    h2 {
      color: #333333;
    }

    p {
      color: #555555;
      line-height: 1.6;
    }

    .success {
      color: #4caf50;
      font-weight: bold;
    }

    .footer {
      text-align: center;
      color: #999999;
      font-size: 13px;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Password Reset Successful ✅</h2>
    <p class="success">Your password has been successfully updated.</p>
    <p>You can now log in using your new password.</p>
    <p>If you didn’t perform this action or suspect unauthorized activity, please contact our support team immediately.</p>
    <p>Stay safe,<br/>The Food App Team</p>

    <div class="footer">
      &copy; 2025 Food App. All rights reserved.
    </div>
  </div>
</body>
</html>


    
    `
}
export const htmlVerficationCode = (verificationCode: string) => {
  return `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Your Verification Code - FoodieExpress</title>
  <style>
    body {
      background-color: #fdfdfd;
      font-family: 'Segoe UI', Tahoma, sans-serif;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 500px;
      margin: 40px auto;
      background-color: #fff;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 0 10px rgba(0,0,0,0.08);
    }
    .logo {
      text-align: center;
      margin-bottom: 20px;
    }
    .logo img {
      width: 80px;
    }
    h1 {
      color: #ff5722;
      text-align: center;
      margin-bottom: 10px;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
      text-align: center;
    }
    .code-box {
      background-color: #fef3eb;
      border: 1px dashed #ff5722;
      color: #ff5722;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      letter-spacing: 8px;
      padding: 16px 0;
      border-radius: 8px;
      margin: 20px auto;
      width: 80%;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #aaa;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="https://example.com/logo.png" alt="FoodieExpress Logo">
    </div>
    <h1>Email Verification</h1>
    <p>Hey foodie! 🍕<br/>Use the code below to verify your email address and start ordering delicious meals.</p>

    <div class="code-box">{${verificationCode}}</div>

    <p>This code will expire in 10 minutes. If you didn’t request this, you can safely ignore this email.</p>

    <div class="footer">
      &copy; 2025 FoodieExpress. All rights reserved.
    </div>
  </div>
</body>
</html>



    
    `
}
export const htmlVerifySuccess = (name: string) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verified</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f6f6f6;">

  <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #f6f6f6; padding: 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600px" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 30px 20px; text-align: center; background-color: #ff7043; color: white;">
              <h1 style="margin: 0; font-size: 24px;">🍽️ FoodieApp</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 20px; text-align: center;">
              <h2 style="margin-top: 0; font-size: 22px; color: #333;">Hi, {${name}} 👋</h2>
              <p style="font-size: 16px; color: #555;">
                Your email has been successfully verified.
              </p>
              <p style="font-size: 16px; color: #555;">
                You're now ready to discover delicious meals, track your orders, and enjoy exclusive offers from FoodieApp!
              </p>
              <a href="https://your-food-app.com" style="display: inline-block; margin-top: 20px; padding: 12px 25px; background-color: #ff7043; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Go to App
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center; font-size: 12px; color: #aaa;">
              If you did not request this, please ignore this email.<br/><br/>
              &copy; 2025 FoodieApp. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>
</html>



    
    `
}