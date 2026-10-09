const MONTHS = {
  jan: 0,
  january: 0,

  feb: 1,
  february: 1,

  mar: 2,
  march: 2,

  apr: 3,
  april: 3,

  may: 4,

  jun: 5,
  june: 5,

  jul: 6,
  july: 6,

  aug: 7,
  august: 7,

  sep: 8,
  sept: 8,
  september: 8,

  oct: 9,
  october: 9,

  nov: 10,
  november: 10,

  dec: 11,
  december: 11,
};

function createDate(day, month, year) {
  const date = new Date(year, month, day, 23, 59, 59, 999);

  /*
   * Make sure JavaScript didn't normalize
   * an invalid date such as 31/02.
   */
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function parseAssignmentDueDate(dueDate) {
  if (!dueDate) return null;

  const value = String(dueDate).trim().toLowerCase();

  if (!value) return null;

  const currentYear = new Date().getFullYear();

  /*
   * =========================================
   * DD/MM/YYYY
   * Example: 11/11/2026
   * =========================================
   */

  let match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (match) {
    const day = Number(match[1]);
    const month = Number(match[2]) - 1;
    const year = Number(match[3]);

    return createDate(day, month, year);
  }

  /*
   * =========================================
   * DD/MM
   * Example: 11/11
   * Uses current year.
   * =========================================
   */

  match = value.match(/^(\d{1,2})\/(\d{1,2})$/);

  if (match) {
    const day = Number(match[1]);
    const month = Number(match[2]) - 1;

    return createDate(day, month, currentYear);
  }

  /*
   * =========================================
   * DD/MON/YYYY
   * Example: 11/nov/2026
   * =========================================
   */

  match = value.match(/^(\d{1,2})\/([a-z]+)\/(\d{4})$/);

  if (match) {
    const day = Number(match[1]);
    const monthName = match[2];
    const year = Number(match[3]);

    const month = MONTHS[monthName];

    if (month === undefined) {
      return null;
    }

    return createDate(day, month, year);
  }

  /*
   * =========================================
   * DD/MON
   * Example: 11/nov
   * Uses current year.
   * =========================================
   */

  match = value.match(/^(\d{1,2})\/([a-z]+)$/);

  if (match) {
    const day = Number(match[1]);
    const monthName = match[2];

    const month = MONTHS[monthName];

    if (month === undefined) {
      return null;
    }

    return createDate(day, month, currentYear);
  }

  return null;
}

export function getAssignmentDeadlineState(assignment) {
  if (!assignment?.dueDate) {
    return {
      date: null,
      isOverdue: false,
      isDueSoon: false,
      isMissed: false,
    };
  }

  /*
   * Completed assignments are never marked as missed.
   */
  if (assignment.status === "DONE") {
    return {
      date: parseAssignmentDueDate(assignment.dueDate),
      isOverdue: false,
      isDueSoon: false,
      isMissed: false,
    };
  }

  const date = parseAssignmentDueDate(assignment.dueDate);

  if (!date) {
    return {
      date: null,
      isOverdue: false,
      isDueSoon: false,
      isMissed: false,
    };
  }

  const now = new Date();

  const difference = date.getTime() - now.getTime();

  const hoursRemaining = difference / (1000 * 60 * 60);

  const isMissed = difference < 0;

  const isDueSoon =
    difference >= 0 &&
    hoursRemaining <= 48;

  return {
    date,
    isOverdue: isMissed,
    isDueSoon,
    isMissed,
  };
}

export function sortAssignmentsByDueDate(assignments) {
  return [...assignments].sort((a, b) => {
    const aState = getAssignmentDeadlineState(a);
    const bState = getAssignmentDeadlineState(b);

    /*
     * Missed assignments always go to the bottom.
     */

    if (aState.isMissed && !bState.isMissed) {
      return 1;
    }

    if (!aState.isMissed && bState.isMissed) {
      return -1;
    }

    /*
     * Both are missed.
     * Older missed deadline first.
     */

    if (aState.isMissed && bState.isMissed) {
      if (!aState.date) return 1;

      if (!bState.date) return -1;

      return (
        aState.date.getTime() -
        bState.date.getTime()
      );
    }

    /*
     * Invalid / unknown dates go last.
     */

    if (!aState.date && !bState.date) {
      return 0;
    }

    if (!aState.date) {
      return 1;
    }

    if (!bState.date) {
      return -1;
    }

    /*
     * Nearest deadline first.
     */

    return (
      aState.date.getTime() -
      bState.date.getTime()
    );
  });
}
