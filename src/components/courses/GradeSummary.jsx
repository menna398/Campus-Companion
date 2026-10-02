export default function GradeSummary({ grades }) {
  const validGrades = grades.filter(
    (grade) =>
      Number(grade.total) > 0 &&
      Number(grade.weight) > 0 &&
      Number(grade.score) >= 0,
  );

  if (validGrades.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-[#e7e3de] bg-white p-6">
        <h2 className="font-serif text-base font-bold text-[#273545]">
          Grade Summary
        </h2>

        <p className="mt-2 text-[10px] text-[#89949d]">
          Add grades to see your current course progress.
        </p>
      </div>
    );
  }

  const gradedWeight = validGrades.reduce(
    (sum, grade) => sum + Number(grade.weight),
    0,
  );

  const earnedTowardFinal = validGrades.reduce((sum, grade) => {
    const score = Number(grade.score);
    const total = Number(grade.total);
    const weight = Number(grade.weight);

    return sum + (score / total) * weight;
  }, 0);

  const currentPerformance =
    gradedWeight > 0 ? (earnedTowardFinal / gradedWeight) * 100 : 0;

  const remainingWeight = Math.max(100 - gradedWeight, 0);

  const finalGrade = Math.min(earnedTowardFinal, 100);

  const performance = Math.min(currentPerformance, 100);

  return (
    <div className="mt-6 rounded-xl border border-[#e7e3de] bg-white p-6">
      {/* Header */}

      <div>
        <span className="text-[8px] uppercase tracking-wide text-[#89949d]">
          Course Performance
        </span>

        <h2 className="mt-1 font-serif text-base font-bold text-[#273545]">
          Grade Summary
        </h2>

        <p className="mt-1 text-[10px] text-[#89949d]">
          Calculated from your current grades and their weights.
        </p>
      </div>

      {/* Main Stats */}

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {/* Current Performance */}

        <div className="rounded-xl bg-[#faf9f7] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-[#89949d]">
              Current Performance
            </span>

            <span className="text-[10px] font-semibold text-[#6f8c6f]">
              {performance.toFixed(1)}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#eeeae5]">
            <div
              className="h-full rounded-full bg-[#91aa91] transition-all"
              style={{
                width: `${performance}%`,
              }}
            />
          </div>

          <p className="mt-2 text-[8px] text-[#89949d]">
            Performance on graded assessments
          </p>
        </div>

        {/* Earned Toward Final */}

        <div className="rounded-xl bg-[#faf9f7] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-[#89949d]">
              Earned Toward Final
            </span>

            <span className="text-[10px] font-semibold text-[#7094b8]">
              {finalGrade.toFixed(1)}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#eeeae5]">
            <div
              className="h-full rounded-full bg-[#7094b8] transition-all"
              style={{
                width: `${finalGrade}%`,
              }}
            />
          </div>

          <p className="mt-2 text-[8px] text-[#89949d]">
            Contribution to the final course grade
          </p>
        </div>

        {/* Graded Weight */}

        <div className="rounded-xl bg-[#faf9f7] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-[#89949d]">Graded Weight</span>

            <span className="text-[10px] font-semibold text-[#c28f6b]">
              {Math.min(gradedWeight, 100).toFixed(0)}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#eeeae5]">
            <div
              className="h-full rounded-full bg-[#edc39f] transition-all"
              style={{
                width: `${Math.min(gradedWeight, 100)}%`,
              }}
            />
          </div>

          <p className="mt-2 text-[8px] text-[#89949d]">
            {remainingWeight > 0
              ? `${remainingWeight.toFixed(0)}% remaining`
              : "All course weight graded"}
          </p>
        </div>
      </div>

      {/* Visual Summary */}

      <div className="mt-6 border-t border-[#eeeae5] pt-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold text-[#3d4a55]">
              Your current course standing
            </p>

            <p className="mt-1 text-[9px] text-[#89949d]">
              You have earned{" "}
              <span className="font-semibold text-[#596773]">
                {finalGrade.toFixed(1)}%
              </span>{" "}
              of the full course grade from the assessments completed so far.
            </p>
          </div>

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#f1f5f1]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <span className="text-[11px] font-bold text-[#6f8c6f]">
                {performance.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
