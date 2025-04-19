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
    <a href="{${resetLink}}" class="btn">Reset Password</a>
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