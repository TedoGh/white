import { NextResponse } from "next/server";
import { Resend } from "resend";
// import { EmailTemplate } from "../../components/email-template";

const resend = new Resend("re_YNPDKXwc_KA33Zq5hRWTFYW7bykKZHNBc");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "";
    const lastName = formData.get("lastName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const profession = formData.get("profession")?.toString() || "";

    const photoFile = formData.get("photo") as File | null;
    const videoFile = formData.get("video") as File | null;

    // attachments
    const attachments = [];

    if (photoFile) {
      attachments.push({
        filename: photoFile.name,
        content: Buffer.from(await photoFile.arrayBuffer()),
      });
    }

    if (videoFile) {
      attachments.push({
        filename: videoFile.name,
        content: Buffer.from(await videoFile.arrayBuffer()),
      });
    }

    const htmlContent = `
      <h2>New Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Profession:</strong> ${profession}</p>
    `;

    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["ghachavatedo@gmail.com"],
      subject: "New Contact Form Submission",
      // react: EmailTemplate({ name, lastName, email, message }),
      html: htmlContent,
      attachments,
    });
    console.log(data);
    return NextResponse.json({ message: "success", data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
