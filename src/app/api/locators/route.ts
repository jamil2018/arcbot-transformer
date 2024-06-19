import prisma from "@/config/dbConfig";

export async function GET() {
  try {
    const res = await prisma.locator.findMany();
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}
