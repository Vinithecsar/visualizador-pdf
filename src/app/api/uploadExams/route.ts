import { Exam } from "@/app/page";
import { NextRequest, NextResponse } from "next/server";

function generateRandomName() {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eva",
    "Frank",
    "Grace",
    "Henry",
  ];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json([{ success: false }]);
  }

  const NamesArray: [Exam] = [{ success: true, name: file.name, code: 0 }];
  for (let i = 1; i < 6; i++) {
    NamesArray.push({ name: generateRandomName(), code: i });
  }

  return NextResponse.json(NamesArray);
}
