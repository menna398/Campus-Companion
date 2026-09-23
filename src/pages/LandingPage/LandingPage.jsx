import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF9F6] text-[#1E2A3A]">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage: "radial-gradient(#D9D4CC 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="absolute left-1/2 top-[40%] h-[650px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-80 blur-3xl" />

        <div className="absolute left-[4%] top-[30%] h-[250px] w-[250px] rounded-full bg-[#DDE8E0] opacity-30 blur-3xl" />

        <div className="absolute right-[5%] top-[35%] h-[250px] w-[250px] rounded-full bg-[#E5DCEF] opacity-30 blur-3xl" />
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="relative z-40 mx-auto flex w-full max-w-[1250px] items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#7095BA] shadow-sm">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5.5C4 4.67 4.67 4 5.5 4H11v15H5.5A1.5 1.5 0 0 1 4 17.5v-12Z" />
              <path d="M20 5.5C20 4.67 19.33 4 18.5 4H13v15h5.5a1.5 1.5 0 0 0 1.5-1.5v-12Z" />
              <path d="M11 6h2" />
            </svg>
          </div>

          <div>
            <p className="font-serif text-[18px] font-bold leading-none">
              Campus
            </p>

            <p className="text-[11px] font-medium tracking-[1.5px] text-[#7095BA]">
              COMPANION
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-8 text-[14px] font-medium text-[#536275] md:flex">
          <a href="#features" className="transition hover:text-[#1E2A3A]">
            Features
          </a>

          <a href="#about" className="transition hover:text-[#1E2A3A]">
            About
          </a>

          <Link
            to="/login"
            className="rounded-lg border border-[#DCD7D0] bg-[#FEFCFA] px-5 py-2.5 text-[#263448] shadow-sm transition hover:bg-white"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-[1500px] items-center justify-center px-5 pb-20 pt-8 lg:px-10">
        {/* ================= DECORATIVE TOP LEFT ================= */}

        <div className="absolute left-[4%] top-[7%] hidden rotate-[-7deg] lg:block">
          <div className="relative h-[90px] w-[105px] border border-[#D9CFC1] bg-[#FFF8E9] p-3 shadow-[0_10px_20px_rgba(45,50,55,0.07)]">
            <p className="font-serif text-[12px] italic text-[#806D5C]">
              Don't forget:
            </p>

            <p className="mt-2 text-[10px] font-semibold text-[#806D5C]">
              Submit HW
            </p>

            <p className="text-[10px] text-[#806D5C]">Read Ch. 7</p>

            <div className="absolute -right-3 -top-3 h-6 w-2 rotate-[20deg] rounded-full bg-[#A6B89D]" />
          </div>
        </div>

        {/* ================= SCHEDULE CARD ================= */}

        <div className="absolute left-[7%] top-[17%] hidden w-[235px] rotate-[-3deg] rounded-[18px] border border-[#E4DED6] bg-[#FEFCFA] p-4 shadow-[0_15px_30px_rgba(45,50,55,0.09)] lg:block">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-[#8A9BA7]">
                THIS WEEK
              </p>

              <h3 className="font-serif text-[18px] font-bold text-[#263448]">
                My Schedule
              </h3>
            </div>

            <span className="rounded-full bg-[#EDF3F8] px-2 py-1 text-[9px] font-bold text-[#7095BA]">
              5 DAYS
            </span>
          </div>

          <div className="space-y-2 text-[10px]">
            <ScheduleRow day="MON" time="09:00" course="CS301" />
            <ScheduleRow day="TUE" time="11:30" course="MATH" warm />
            <ScheduleRow day="WED" time="14:00" course="LIT15" purple />
            <ScheduleRow day="THU" time="10:00" course="DB201" green />
          </div>

          <div className="mt-3 border-t border-[#ECE7E0] pt-2 text-[9px] text-[#8A9BA7]">
            4 classes today · 2 study sessions
          </div>

          <div className="absolute right-5 top-[-13px] h-7 w-3 rounded-b-md bg-[#91AA91]" />
        </div>

        {/* ================= LEFT NOTE ================= */}

        <div className="absolute left-[12%] top-[47%] hidden w-[145px] rotate-[4deg] border border-[#EADCCA] bg-[#FFF9F0] p-4 shadow-[0_12px_22px_rgba(45,50,55,0.07)] lg:block">
          <div className="absolute right-2 top-2 text-[#D3B58E]">✦</div>

          <p className="font-serif text-[14px] italic leading-[1.3] text-[#896F58]">
            Review Ch. 7
            <br />
            Algorithms,
            <br />
            before quiz!
          </p>

          <div className="mt-4 flex items-center gap-2 text-[9px] font-medium text-[#826C59]">
            <span className="h-3 w-3 rounded-sm border border-[#826C59]" />
            CS301
          </div>
        </div>

        {/* ================= RIGHT ASSIGNMENTS ================= */}

        <div className="absolute right-[6%] top-[14%] hidden w-[235px] rotate-[2deg] rounded-[18px] border border-[#E4DED6] bg-[#FEFCFA] p-4 shadow-[0_15px_30px_rgba(45,50,55,0.09)] lg:block">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-[#8A9BA7]">
                TASK BOARD
              </p>

              <h3 className="font-serif text-[18px] font-bold">Assignments</h3>
            </div>

            <span className="rounded-full bg-[#E9F0E9] px-2 py-1 text-[9px] font-bold text-[#769176]">
              1/3 DONE
            </span>
          </div>

          <div className="space-y-3">
            <TaskRow title="CS301 Homework 3" checked />
            <TaskRow title="Essay Final Draft" />
            <TaskRow title="Physics Lab Report" />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[#ECE7E0] pt-3">
            <span className="text-[9px] text-[#919DA7]">Next deadline</span>

            <span className="text-[10px] font-bold text-[#B36E4C]">2 days</span>
          </div>

          <div className="absolute -top-7 right-[32%] rotate-[-20deg] text-[#C8CFD1]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M8.5 12.5 15 6a3.5 3.5 0 0 1 5 5l-8 8a5 5 0 0 1-7-7l7.5-7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* ================= RIGHT MINI NOTE ================= */}

        <div className="absolute right-[13%] top-[39%] hidden w-[125px] rotate-[-5deg] border border-[#DCD3E5] bg-[#F8F2FC] p-3 shadow-[0_10px_20px_rgba(45,50,55,0.06)] xl:block">
          <p className="text-[9px] font-bold uppercase tracking-wide text-[#9A82AF]">
            REMEMBER
          </p>

          <p className="mt-2 font-serif text-[12px] italic leading-5 text-[#6F6178]">
            Bring calculator
            <br />
            to MATH exam!
          </p>

          <div className="mt-2 text-right text-[9px] text-[#B19EBE]">
            — future me
          </div>
        </div>

        {/* ================= GPA / PERFORMANCE ================= */}

        <div className="absolute right-[7%] top-[49%] hidden w-[215px] rotate-[-2deg] rounded-[18px] border border-[#E4DED6] bg-[#FEFCFA] p-4 shadow-[0_15px_30px_rgba(45,50,55,0.09)] lg:block">
          <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-[#8A9BA7]">
            PERFORMANCE HUB
          </p>

          <div className="mt-3 flex items-center gap-3">
            <div className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full border-[5px] border-[#E1E6DD]">
              <div className="absolute inset-[-5px] rounded-full border-[5px] border-transparent border-l-[#91AA91] border-t-[#91AA91]" />

              <span className="text-[12px] font-bold text-[#344356]">72%</span>
            </div>

            <div>
              <p className="font-serif text-[18px] font-bold text-[#263448]">
                GPA 3.72
              </p>

              <p className="mt-1 text-[9px] text-[#91A0AA]">Semester target</p>

              <div className="mt-2 h-1.5 w-[95px] overflow-hidden rounded-full bg-[#E8E6E0]">
                <div className="h-full w-[72%] rounded-full bg-[#91AA91]" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= CALENDAR ================= */}

        <div className="absolute bottom-[12%] left-[7%] hidden w-[205px] rotate-[-2deg] rounded-[17px] border border-[#E4DED6] bg-[#FEFCFA] p-4 shadow-[0_15px_30px_rgba(45,50,55,0.08)] lg:block">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-wide text-[#8A9BA7]">
                ACADEMIC CALENDAR
              </p>

              <h3 className="font-serif text-[15px] font-bold text-[#344356]">
                October 2026
              </h3>
            </div>

            <span className="rounded-full bg-[#EDF3F8] px-2 py-1 text-[8px] font-bold text-[#7095BA]">
              TODAY
            </span>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[7px] font-semibold text-[#A0A9B0]">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>

          <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[9px] text-[#657386]">
            <span>12</span>
            <span>13</span>
            <span>14</span>

            <span className="mx-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#7095BA] font-bold text-white">
              15
            </span>

            <span>16</span>
            <span>17</span>
            <span>18</span>
          </div>

          <div className="mt-3 flex items-center gap-2 text-[8px] text-[#91A0AA]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EABF9E]" />
            Exam Friday
          </div>
        </div>

        {/* ================= NOTES ================= */}

        <div className="absolute bottom-[10%] right-[7%] hidden w-[220px] rotate-[4deg] border border-[#E4DED6] bg-[#FEFCFA] p-4 shadow-[0_15px_30px_rgba(45,50,55,0.08)] lg:block">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-[#B39BC7]">
              QUICK SCRIBBLE
            </span>

            <span className="text-[#C8B5D7]">☆</span>
          </div>

          <h3 className="font-serif text-[16px] font-bold text-[#344356]">
            Lecture 4 Notes
          </h3>

          <div className="mt-3 space-y-1 text-[9px] text-[#536275]">
            <p>• Binary Search Trees</p>
            <p>• Left &lt; Node &lt; Right</p>
            <p>• Complexity: O(log n)</p>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-[#ECE7E0] pt-2">
            <span className="text-[8px] text-[#A0A9B0]">
              Last edited 2h ago
            </span>

            <span className="text-[10px] text-[#B39BC7]">✎</span>
          </div>
        </div>

        {/* ================= EXAM CARD ================= */}

        <div className="absolute bottom-[6%] left-[20%] hidden w-[265px] rotate-[2deg] rounded-[13px] border border-[#E4DED6] bg-[#FEFCFA] px-4 py-3 shadow-[0_12px_24px_rgba(45,50,55,0.07)] xl:block">
          <div className="flex items-center gap-3">
            <div className="h-9 w-1 rounded-full bg-[#EABF9E]" />

            <div className="flex-1">
              <p className="text-[8px] font-bold uppercase tracking-[1.5px] text-[#B36E4C]">
                UPCOMING EXAM
              </p>

              <p className="font-serif text-[14px] font-bold text-[#263448]">
                CS301 Midterm
              </p>

              <p className="text-[9px] text-[#8A97A3]">
                Friday · 10:00 AM · Hall B
              </p>
            </div>

            <span className="rounded-full bg-[#FFF1E7] px-2 py-1 text-[8px] font-bold text-[#B36E4C]">
              2 DAYS
            </span>
          </div>
        </div>

        {/* ================= STUDY SESSION ================= */}

        <div className="absolute bottom-[28%] left-[20%] hidden rotate-[-3deg] rounded-full border border-[#D8E2D8] bg-[#F4F8F3] px-4 py-2 shadow-sm xl:block">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#91AA91]" />

          <span className="text-[9px] font-semibold text-[#667B66]">
            45 min study session completed
          </span>
        </div>

        {/* ================= ACHIEVEMENT ================= */}

        <div className="absolute right-[22%] bottom-[28%] hidden rotate-[3deg] rounded-full border border-[#E5DCC7] bg-[#FFF9E9] px-4 py-2 shadow-sm xl:block">
          <span className="mr-2">✦</span>

          <span className="text-[9px] font-semibold text-[#8C7650]">
            7 day study streak
          </span>
        </div>

        {/* ================= HERO CENTER ================= */}

        <div className="relative z-30 mx-auto max-w-[800px] text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E1DDD6] bg-[#FEFCFA] px-4 py-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#7095BA] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#91AA91]" />
            Your Academic Companion
          </div>

          <h1 className="font-serif text-[50px] font-bold leading-[0.98] tracking-[-2px] text-[#1E2A3A] sm:text-[66px] lg:text-[78px] xl:text-[84px]">
            Your Academic Life,
            <br />
            <span className="relative inline-block">
              Beautifully Organized.
              <span className="absolute -bottom-2 left-[8%] h-[5px] w-[84%] rotate-[-1deg] rounded-full bg-[#D9C7A8] opacity-70" />
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-[660px] text-[16px] leading-7 text-[#536275] sm:text-[18px]">
            Courses, assignments, exams, schedules, notes, events, and academic
            progress — all in one beautifully organized place.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4">
            <Link
              to="/dashboard"
              className="group flex h-[58px] min-w-[235px] items-center justify-center gap-2 rounded-[11px] bg-[#1F2C3D] px-8 text-[16px] font-semibold text-white shadow-[0_10px_25px_rgba(31,44,61,0.18)] transition duration-200 hover:-translate-y-1 hover:bg-[#29394D]"
            >
              Go to Dashboard
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <a
              href="#features"
              className="text-[11px] font-semibold text-[#7095BA] transition hover:text-[#52779E]"
            >
              Everything you need for a better semester ↓
            </a>
          </div>

          {/* Tiny UI indicators under CTA */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <MiniBadge text="Courses" />
            <MiniBadge text="Assignments" />
            <MiniBadge text="Exams" />
            <MiniBadge text="Notes" />
            <MiniBadge text="Progress" />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="relative z-20 border-t border-[#E8E3DC] bg-[#FEFCFA] px-6 py-24"
      >
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[2px] text-[#7095BA]">
            Everything in one place
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold text-[#1E2A3A]">
            Built around your academic life.
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <FeatureCard
              title="Stay Organized"
              text="Keep your courses, assignments, exams, and schedule together."
              icon="◫"
            />

            <FeatureCard
              title="Track Progress"
              text="Understand your academic performance and semester goals."
              icon="◌"
            />

            <FeatureCard
              title="Never Miss Anything"
              text="Notes, deadlines, events, and important academic reminders."
              icon="✓"
            />
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section id="about" className="relative z-20 bg-[#F5F2ED] px-6 py-24">
        <div className="mx-auto max-w-[850px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[2px] text-[#7095BA]">
            About Campus Companion
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold text-[#1E2A3A]">
            Your semester, without the chaos.
          </h2>

          <p className="mx-auto mt-6 max-w-[680px] text-[16px] leading-8 text-[#536275]">
            Campus Companion gives students one simple space to organize
            everything that matters during university. From your weekly schedule
            and assignments to notes, exams, events, and academic progress —
            everything stays connected and easy to find.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex rounded-[10px] bg-[#1F2C3D] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#29394D]"
          >
            Begin Your Journey →
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ================= SCHEDULE ROW ================= */

function ScheduleRow({ day, time, course, warm, purple, green }) {
  let background = "bg-[#EDF3F8]";
  let text = "text-[#7095BA]";

  if (warm) {
    background = "bg-[#FAF5ED]";
    text = "text-[#8A765E]";
  }

  if (purple) {
    background = "bg-[#F3EFF8]";
    text = "text-[#9C86AF]";
  }

  if (green) {
    background = "bg-[#EFF5EF]";
    text = "text-[#769176]";
  }

  return (
    <div className="flex items-center gap-2">
      <span className="w-[30px] text-[8px] font-semibold text-[#8A9BA7]">
        {day}
      </span>

      <span
        className={`flex flex-1 items-center justify-between rounded-md px-2 py-1.5 ${background} ${text}`}
      >
        <b>{time}</b>
        <span>{course}</span>
      </span>
    </div>
  );
}

/* ================= TASK ROW ================= */

function TaskRow({ title, checked }) {
  return (
    <div className="flex items-center gap-2 text-[10px] text-[#344356]">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          checked
            ? "border-[#91AA91] bg-[#91AA91] text-white"
            : "border-[#BFC7CC]"
        }`}
      >
        {checked && "✓"}
      </span>

      <span className={checked ? "text-[#9AA4AC] line-through" : ""}>
        {title}
      </span>
    </div>
  );
}

/* ================= MINI BADGE ================= */

function MiniBadge({ text }) {
  return (
    <span className="rounded-full border border-[#E2DDD6] bg-[#FEFCFA] px-3 py-1.5 text-[9px] font-medium text-[#7D8994] shadow-sm">
      {text}
    </span>
  );
}

/* ================= FEATURE CARD ================= */

function FeatureCard({ title, text, icon }) {
  return (
    <div className="rounded-[18px] border border-[#E4DED6] bg-[#FAF9F6] p-7 text-left transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(45,50,55,0.07)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-[11px] bg-[#EAF0F5] text-[20px] text-[#7095BA]">
        {icon}
      </div>

      <h3 className="mt-5 font-serif text-xl font-bold text-[#263448]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#657386]">{text}</p>
    </div>
  );
}
