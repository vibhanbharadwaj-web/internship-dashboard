import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "Internship_Dashboard.xlsx"
    );

    const fileBuffer = fs.readFileSync(filePath);

    const workbook = XLSX.read(fileBuffer, {
      type: "buffer",
    });

    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      throw new Error("No worksheet found in Excel file");
    }

    const worksheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(worksheet);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Excel error:", error);

    return NextResponse.json(
      {
        error: "Unable to read Excel file",
        details: String(error),
      },
      { status: 500 }
    );
  }
}