import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const csvUrl = process.env.EXCEL_SHARE_URL;

    if (!csvUrl) {
      throw new Error("EXCEL_SHARE_URL is not configured");
    }

    const response = await fetch(csvUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Unable to download spreadsheet. Status: ${response.status}`
      );
    }

    const csvText = await response.text();

    const lines = csvText
      .trim()
      .split(/\r?\n/)
      .map((line) => line.split(","));

    if (lines.length < 2) {
      return NextResponse.json([]);
    }

    const headers = lines[0].map((header) =>
      header.trim().replace(/^"|"$/g, "")
    );

    const data = lines.slice(1).map((row) => {
      const employee: Record<string, string | number> = {};

      headers.forEach((header, index) => {
        const value = (row[index] || "")
          .trim()
          .replace(/^"|"$/g, "");

        employee[header] =
          header === "Age" ? Number(value) : value;
      });

      return employee;
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Spreadsheet error:", error);

    return NextResponse.json(
      {
        error: "Unable to load spreadsheet data",
        details: String(error),
      },
      { status: 500 }
    );
  }
}