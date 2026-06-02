import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Preencha todos os campos" },
      { status: 400 },
    );
  }

  const existing = await prisma.agency.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 12);
  const agency = await prisma.agency.create({
    data: { name, email, password: hashed },
  });

  return NextResponse.json({ name: agency.name, email: agency.email });
}
