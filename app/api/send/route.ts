import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_YwsdqRNd_9FrrZqHN6HuiWCH18vuk1Z9n");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "";
    const lastName = formData.get("lastName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const profession = formData.get("profession")?.toString() || "";
    const experience = formData.get("experience")?.toString() || "";

    const photoFile = formData.get("photo") as File | null;
    const videoFile = formData.get("video") as File | null;

    const attachments: {
      filename: string;
      content: string;
      encoding: "base64";
    }[] = [];

    if (photoFile) {
      const buffer = Buffer.from(await photoFile.arrayBuffer());
      attachments.push({
        filename: photoFile.name,
        content: buffer.toString("base64"),
        encoding: "base64",
      });
    }

    if (videoFile) {
      const buffer = Buffer.from(await videoFile.arrayBuffer());
      attachments.push({
        filename: videoFile.name,
        content: buffer.toString("base64"),
        encoding: "base64",
      });
    }

    const htmlContent = `
      <h2>New Volunteer Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Profession:</strong> ${profession}</p>
      <p><strong>Experience:</strong> ${experience}</p>
    `;

    const data = await resend.emails.send({
      from: "ახალი შეტყობინება <chvenia.ge>",
      to: ["ghachavatedo@gmail.com"],
      subject: "New Volunteer Application",
      html: htmlContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return NextResponse.json({ message: "success", data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
