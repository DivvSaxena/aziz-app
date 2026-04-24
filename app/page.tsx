import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "aziz-secret-key");

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    try {
      await jwtVerify(token, SECRET);
      redirect("/dashboard");
    } catch {
      redirect("/login");
    }
  }

  redirect("/login");
}
