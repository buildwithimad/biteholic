import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, phone, inquiryType, message } = await req.json();

    const data = await resend.emails.send({
      from: "BiteHolic <contact@biteholic.com>", // Make sure this domain is verified in Resend
      to: ["imaddeveloper0@gmail.com"],
      replyTo: email,
      subject: `New ${inquiryType} from ${name}`,
     html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BiteHolic Contact Form</title>
</head>

<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8f8f8;padding:40px 20px;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;background:#ffffff;;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#111111;padding:50px 40px;">

              <img
                src="http://www.biteholic.com/logo.png"
                alt="BiteHolic Logo"
                width="120"
                style="display:block;margin:0 auto 20px auto;"
              />

             

              <p style="margin:14px 0 0 0;color:#E88D15;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">
                New Contact Form Submission
              </p>

            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:40px;">

              <h2 style="margin:0 0 30px 0;color:#111111;font-size:24px;font-weight:800;">
                Customer Information
              </h2>

              <!-- Name -->
              <div style="padding-bottom:22px;border-bottom:1px solid #eeeeee;margin-bottom:22px;">
                <p style="margin:0;font-size:11px;color:#999999;text-transform:uppercase;font-weight:700;letter-spacing:1px;">
                  Name
                </p>

                <p style="margin:6px 0 0 0;font-size:18px;color:#111111;font-weight:600;">
                  ${name}
                </p>
              </div>

              <!-- Email -->
              <div style="padding-bottom:22px;border-bottom:1px solid #eeeeee;margin-bottom:22px;">
                <p style="margin:0;font-size:11px;color:#999999;text-transform:uppercase;font-weight:700;letter-spacing:1px;">
                  Email
                </p>

                <p style="margin:6px 0 0 0;">
                  <a
                    href="mailto:${email}"
                    style="color:#E88D15;text-decoration:none;font-size:18px;font-weight:600;"
                  >
                    ${email}
                  </a>
                </p>
              </div>

              <!-- Phone -->
              <div style="padding-bottom:22px;border-bottom:1px solid #eeeeee;margin-bottom:22px;">
                <p style="margin:0;font-size:11px;color:#999999;text-transform:uppercase;font-weight:700;letter-spacing:1px;">
                  Phone Number
                </p>

                <p style="margin:6px 0 0 0;font-size:18px;color:#111111;font-weight:600;">
                  ${phone}
                </p>
              </div>

              <!-- Inquiry -->
              <div style="padding-bottom:22px;margin-bottom:30px;">
                <p style="margin:0;font-size:11px;color:#999999;text-transform:uppercase;font-weight:700;letter-spacing:1px;">
                  Inquiry Type
                </p>

                <p style="margin:6px 0 0 0;font-size:18px;color:#111111;font-weight:600;">
                  ${inquiryType}
                </p>
              </div>

              <!-- Message -->
              <h2 style="margin:0 0 18px 0;color:#111111;font-size:24px;font-weight:800;">
                Message
              </h2>

              <div style="background:#fcf9f0;border:1px solid #f4ead5;border-radius:20px;padding:28px;">
                <p style="margin:0;color:#333333;font-size:15px;line-height:1.8;white-space:pre-wrap;">
                  ${message}
                </p>
              </div>

              <!-- Reply Button -->
              <div style="margin-top:35px;text-align:center;">
                <a
                  href="mailto:${email}"
                  style="
                    display:inline-block;
                    background:#E88D15;
                    color:#ffffff;
                    text-decoration:none;
                    padding:16px 34px;
                    border-radius:999px;
                    font-size:14px;
                    font-weight:700;
                  "
                >
                  Reply To Customer
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#fafafa;padding:30px;text-align:center;border-top:1px solid #eeeeee;">

              <p style="margin:0;color:#999999;font-size:13px;line-height:1.6;">
                This email was automatically generated from the BiteHolic website contact form.
              </p>

              <p style="margin:14px 0 0 0;color:#bbbbbb;font-size:12px;">
                © ${new Date().getFullYear()} BiteHolic. All Rights Reserved.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`,
    });

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to send email",
      },
      { status: 500 }
    );
  }
}