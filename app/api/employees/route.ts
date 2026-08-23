import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import fs from "fs";

export async function GET() {
  try {
    const filePath =
      "C:\\Users\\Dell\\Desktop\\Internship_Dashboard.xlsx";

    const fileBuffer = fs.readFileSync(filePath);

    const workbook = XLSX.read(fileBuffer, {
      type: "buffer",
    });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const employees = XLSX.utils.sheet_to_json(worksheet);

    return NextResponse.json(employees);
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