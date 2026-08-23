"use client";

import { useEffect, useState } from "react";

type Employee = {
  Name: string;
  Address: string;
  Age: number;
  Gender: string;
  Department: string;
};

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [department, setDepartment] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/employees")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load Excel data");
        }

        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load employee data");
        setLoading(false);
      });
  }, []);

  const filteredEmployees =
    department === "All"
      ? employees
      : employees.filter(
          (employee) => employee.Department === department
        );

  const totalEmployees = filteredEmployees.length;

  const departmentCounts = {
    IT: filteredEmployees.filter(
      (employee) => employee.Department === "IT"
    ).length,

    HR: filteredEmployees.filter(
      (employee) => employee.Department === "HR"
    ).length,

    Finance: filteredEmployees.filter(
      (employee) => employee.Department === "Finance"
    ).length,
  };

  const genderCounts = {
    Male: filteredEmployees.filter(
      (employee) => employee.Gender === "Male"
    ).length,

    Female: filteredEmployees.filter(
      (employee) => employee.Gender === "Female"
    ).length,
  };

  const ageCounts = filteredEmployees.reduce<Record<number, number>>(
    (counts, employee) => {
      counts[employee.Age] = (counts[employee.Age] || 0) + 1;
      return counts;
    },
    {}
  );

  const ages = Object.keys(ageCounts)
    .map(Number)
    .sort((a, b) => a - b);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-lg font-medium text-slate-600">
          Loading employee data...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-lg font-medium text-red-600">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Employee Information Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Live data loaded from Excel
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between rounded-xl bg-white p-5 shadow-sm">

          <div>
            <h2 className="font-semibold text-slate-800">
              Department Filter
            </h2>

            <p className="text-sm text-slate-500">
              Filter the dashboard by department
            </p>
          </div>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 outline-none"
          >
            <option value="All">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>

        </div>

        <div className="mb-6 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Employees
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-900">
              {totalEmployees}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              IT Employees
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-900">
              {departmentCounts.IT}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              HR Employees
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-900">
              {departmentCounts.HR}
            </p>
          </div>

        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <section className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-bold text-slate-900">
              Employees by Department
            </h2>

            <div className="space-y-5">

              {Object.entries(departmentCounts).map(
                ([dept, count]) => (
                  <div key={dept}>

                    <div className="mb-2 flex justify-between text-sm">

                      <span className="font-medium text-slate-700">
                        {dept}
                      </span>

                      <span className="font-semibold text-slate-900">
                        {count}
                      </span>

                    </div>

                    <div className="h-3 rounded-full bg-slate-200">

                      <div
                        className="h-3 rounded-full bg-blue-600"
                        style={{
                          width: `${
                            totalEmployees
                              ? (count / totalEmployees) * 100
                              : 0
                          }%`,
                        }}
                      />

                    </div>

                  </div>
                )
              )}

            </div>

          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-bold text-slate-900">
              Employees by Gender
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-lg bg-slate-100 p-5 text-center">

                <p className="text-sm text-slate-500">
                  Male
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {genderCounts.Male}
                </p>

              </div>

              <div className="rounded-lg bg-slate-100 p-5 text-center">

                <p className="text-sm text-slate-500">
                  Female
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {genderCounts.Female}
                </p>

              </div>

            </div>

          </section>

        </div>

        <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-xl font-bold text-slate-900">
            Employees by Age
          </h2>

          <div className="flex h-64 items-end justify-around gap-4 border-b border-slate-200 px-4">

            {ages.map((age) => {

              const count = ageCounts[age];

              return (
                <div
                  key={age}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >

                  <span className="mb-2 text-sm font-semibold text-slate-700">
                    {count}
                  </span>

                  <div
                    className="w-full max-w-16 rounded-t-lg bg-blue-600"
                    style={{
                      height: `${count * 55}px`,
                    }}
                  />

                  <span className="mt-3 text-sm font-medium text-slate-600">
                    {age}
                  </span>

                </div>
              );

            })}

          </div>

          <p className="mt-3 text-center text-sm text-slate-500">
            Age
          </p>

        </section>

        <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-xl font-bold text-slate-900">
            Employee Details
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-slate-200 text-sm text-slate-500">

                  <th className="p-3">
                    Name
                  </th>

                  <th className="p-3">
                    Address
                  </th>

                  <th className="p-3">
                    Age
                  </th>

                  <th className="p-3">
                    Gender
                  </th>

                  <th className="p-3">
                    Department
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredEmployees.map((employee) => (

                  <tr
                    key={employee.Name}
                    className="border-b border-slate-100"
                  >

                    <td className="p-3 font-medium text-slate-800">
                      {employee.Name}
                    </td>

                    <td className="p-3 text-slate-600">
                      {employee.Address}
                    </td>

                    <td className="p-3 text-slate-600">
                      {employee.Age}
                    </td>

                    <td className="p-3 text-slate-600">
                      {employee.Gender}
                    </td>

                    <td className="p-3 text-slate-600">
                      {employee.Department}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      </div>
    </main>
  );
}