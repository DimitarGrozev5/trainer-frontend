import React from "react";
import styles from "./MonthView.module.css";

interface Props {
  targetDate: Date;
  // onChangeDate: (num: Date) => void;
}

const CalendarMonthView: React.FC<Props> = ({ targetDate }) => {
  //

  return (
    <div className={styles["calendar-container"]}>
      <header className={styles.header}>
        <button className={styles["header__nav"]}>{"<"}</button>
        <button className={styles["header__title"]}>August</button>
        <button className={styles["header__nav"]}>{">"}</button>
        <button className={styles["header__today"]}>19</button>
      </header>
      <table className={styles["calendar"]}>
        <thead>
          <tr>
            <th>Mon</th>
            <th>Thu</th>
            <th>Thi</th>
            <th>Wed</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
          <tr>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
          </tr>
          <tr>
            <td>15</td>
            <td>16</td>
            <td>17</td>
            <td>18</td>
            <td>19</td>
            <td>20</td>
            <td>21</td>
          </tr>
          <tr>
            <td>22</td>
            <td>23</td>
            <td>24</td>
            <td>25</td>
            <td>26</td>
            <td>27</td>
            <td>28</td>
          </tr>
          <tr>
            <td>29</td>
            <td>30</td>
            <td>31</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CalendarMonthView;
