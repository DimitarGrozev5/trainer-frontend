import { TrainingProgram } from "../data-types";
import Input from "../../components/UI-elements/Input/Input";
import { useState } from "react";
import { useEffect } from "react";
import { isEqual } from "date-fns";
import { useSState } from "../../hooks/useSState";

import styles from "./Styles.module.css";

export const enduroGrip: TrainingProgram = {
  // Basic data
  id: "EnduroGrip",
  active: false,

  // Metadata
  name: "EnduroGrip",
  shortDesc: "Slow twitch endurance protocol for the grip",
  longDesc:
    "This training protocol uses hangs between 30s and 60s, always to failure. You will be in pain. You will be able to hang for longer in the end.",

  // Initializing training program
  InitComponent: ({ value, onChange }) => {
    const [startToday, setStartToday] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [weekly, , { setStateTo: setWeeklyTo }] = useSState<string>("weekly");

    // Run on first try to init the data
    useEffect(() => {
      onChange({ startDate, weekly });
    }, []);

    // Reset startDate to today when startToday is false
    useEffect(() => {
      !startToday && setStartDate(new Date());
    }, [startToday]);

    // Update value when settings change
    useEffect(() => {
      if (!isEqual(value.startDate, startDate) || value.weekly !== weekly) {
        onChange({ startDate, weekly });
      }
    }, [startDate, weekly, value.startDate, value.weekly, onChange]);

    // Visuals for Schedule
    const scheduleVisual =
      weekly === "weekly" ? (
        <div className={styles.week}>
          <div>
            <span>Mon</span>
            <span className={styles.workout}>1</span>
          </div>
          <div>
            <span>Thu</span>
            <span>2</span>
          </div>
          <div>
            <span>Thi</span>
            <span>3</span>
          </div>
          <div>
            <span>Wed</span>
            <span className={styles.workout}>4</span>
          </div>
          <div>
            <span>Fri</span>
            <span>5</span>
          </div>
          <div className={styles.weekend}>
            <span>Sat</span>
            <span>6</span>
          </div>
          <div className={styles.weekend}>
            <span>Sun</span>
            <span>7</span>
          </div>
          <div>
            <span>Mon</span>
            <span className={styles.workout}>8</span>
          </div>
          <div>
            <span>Thu</span>
            <span>9</span>
          </div>
          <div>
            <span>Thi</span>
            <span>10</span>
          </div>
          <div>
            <span>Wed</span>
            <span className={styles.workout}>11</span>
          </div>
          <div>
            <span>Fri</span>
            <span>12</span>
          </div>
          <div className={styles.weekend}>
            <span>Sat</span>
            <span>13</span>
          </div>
          <div className={styles.weekend}>
            <span>Sun</span>
            <span>14</span>
          </div>
        </div>
      ) : (
        <div className={styles.week}>
          <div>
            <span>Mon</span>
            <span className={styles.workout}>1</span>
          </div>
          <div>
            <span>Thu</span>
            <span>2</span>
          </div>
          <div>
            <span>Thi</span>
            <span>3</span>
          </div>
          <div>
            <span>Wed</span>
            <span>4</span>
          </div>
          <div>
            <span>Fri</span>
            <span className={styles.workout}>5</span>
          </div>
          <div className={styles.weekend}>
            <span>Sat</span>
            <span>6</span>
          </div>
          <div className={styles.weekend}>
            <span>Sun</span>
            <span>7</span>
          </div>
          <div>
            <span>Mon</span>
            <span>8</span>
          </div>
          <div>
            <span>Thu</span>
            <span className={styles.workout}>9</span>
          </div>
          <div>
            <span>Thi</span>
            <span>10</span>
          </div>
          <div>
            <span>Wed</span>
            <span>11</span>
          </div>
          <div>
            <span>Fri</span>
            <span>12</span>
          </div>
          <div className={styles.weekend}>
            <span>Sat</span>
            <span className={styles.workout}>13</span>
          </div>
          <div className={styles.weekend}>
            <span>Sun</span>
            <span>14</span>
          </div>
        </div>
      );

    return (
      <>
        <div>
          Test how long you can hang from a bar. If you can hang for longer than
          a minute, add weight so you'll be able to have sets between 30s and
          60s.
        </div>
        <Input
          label="Start today"
          type="checkbox"
          value={startToday}
          onChange={setStartToday}
        />
        {!startToday && (
          <Input
            label="Select start Date:"
            type="date"
            value={startDate}
            onChange={setStartDate}
          />
        )}
        <Input
          label="Schedule mode:"
          type="radio"
          options={[
            {
              label: "Two times a week",
              value: "weekly",
            },
            {
              label: "Every four days",
              value: "regular",
            },
          ]}
          value={weekly}
          onChange={setWeeklyTo}
        />
        {scheduleVisual}
      </>
    );
  },
  getInitData: (vals: any) => vals,
};
