import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const shareUrl = process.env.EXCEL_SHARE_URL;

    if (!shareUrl) {
      throw new Error("EXCEL_SHARE_URL is not configured");
    }

    const separator = shareUrl.includes("?") ? "&" : "?";
    const downloadUrl = `${shareUrl}${separator}download=1`;

    const response = await fetch(downloadUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Unable to download Excel file. Status: ${response.status}`
      );
    }

    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, {
      type: "array",
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