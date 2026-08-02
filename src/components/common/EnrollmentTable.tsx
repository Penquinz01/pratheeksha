import React from 'react';
import { studentEnrollment, studentEnrollmentTotal } from '../../data/content';

/**
 * Student enrollment by education level. The wrapper scrolls horizontally
 * rather than letting the table push past its container on narrow screens.
 */
export const EnrollmentTable: React.FC = () => (
  <div className="max-w-3xl">
    <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-plum mb-6">
      Student Enrollment Data
    </h3>

    <div className="overflow-x-auto rounded-2xl border border-brand-plum/5 bg-white shadow-sm">
      <table className="w-full min-w-[420px] border-collapse font-body text-sm">
        <caption className="sr-only">
          Student enrollment by education level, 2025
        </caption>

        <thead>
          <tr className="bg-brand-beige">
            <th
              scope="col"
              className="text-left font-semibold text-brand-plum px-5 py-3.5"
            >
              Education Level
            </th>
            <th
              scope="col"
              className="text-right font-semibold text-brand-plum px-5 py-3.5 whitespace-nowrap"
            >
              Enrolled Students
            </th>
          </tr>
        </thead>

        <tbody>
          {studentEnrollment.map((row) => (
            <tr key={row.level} className="border-t border-brand-plum/5">
              <th
                scope="row"
                className="text-left font-normal text-brand-plum/85 px-5 py-3"
              >
                {row.level}
              </th>
              <td className="text-right text-brand-plum/85 px-5 py-3 tabular-nums">
                {row.students}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="border-t-2 border-brand-violet/40 bg-brand-beige/70">
            <th
              scope="row"
              className="text-left font-bold text-brand-plum px-5 py-4"
            >
              {studentEnrollmentTotal.level}
            </th>
            <td className="text-right font-bold text-brand-plum px-5 py-4 tabular-nums">
              {studentEnrollmentTotal.students}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
);
