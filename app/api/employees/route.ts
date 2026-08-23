import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    const data = [
      {
        Name: "Ananya",
        Address: "Bangalore",
        Age: 20,
        Gender: "Female",
        Department: "IT",
      },
      {
        Name: "Rahul",
        Address: "Mysore",
        Age: 22,
        Gender: "Male",
        Department: "HR",
      },
      {
        Name: "Priya",
        Address: "Chennai",
        Age: 21,
        Gender: "Female",
        Department: "IT",
      },
      {
        Name: "Arjun",
        Address: "Hubli",
        Age: 23,
        Gender: "Male",
        Department: "Finance",
      },
      {
        Name: "Sneha",
        Address: "Bangalore",
        Age: 20,
        Gender: "Female",
        Department: "HR",
      },
      {
        Name: "Kiran",
        Address: "Mangalore",
        Age: 24,
        Gender: "Male",
        Department: "IT",
      },
      {
        Name: "Divya",
        Address: "Mysore",
        Age: 22,
        Gender: "Female",
        Department: "Finance",
      },
      {
        Name: "Rohan",
        Address: "Bangalore",
        Age: 21,
        Gender: "Male",
        Department: "IT",
      },
      {
        Name: "Kavya",
        Address: "Chennai",
        Age: 23,
        Gender: "Female",
        Department: "HR",
      },
      {
        Name: "Aditya",
        Address: "Hubli",
        Age: 25,
        Gender: "Male",
        Department: "Finance",
      },
    ];

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      { error: "Unable to load employee data" },
      { status: 500 }
    );
  }
}