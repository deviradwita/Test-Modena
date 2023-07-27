import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
export default function Card({ detailDashboard }) {
  return (
    <>
      {detailDashboard?.map((el, index) => (
        <div
          key={index}
          className="border p-10 rounded-md border-slate-400 w-fit gap-10 flex justify-between items-center"
        >
          <div className="flex flex-col gap-2">
            <div>{el.title}</div>
            <div className="text-3xl font-bold text-gray-500">
              {el.total.toLocaleString("id-ID")}
            </div>
            <div className="flex gap-3 ">
              <span
                className={`flex  items-center font-bold ${
                  el.percentage >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {el.percentage >= 0 ? (
                  <AiOutlineArrowUp color="green" />
                ) : (
                  <AiOutlineArrowDown color="red" />
                )}
                {el.percentage} %
              </span>
              Last Month
            </div>
          </div>

          <div className="p-8">
            {el.percentage >= 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                fill="green"
                className="bi bi-graph-up-arrow"
                viewBox="0 0 16 16"
              >

                <path
                  fillRule="evenodd"
                  d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                fill="red"
                className="bi bi-graph-down-arrow"
                viewBox="0 0 16 16"
              >

                <path
                  fillRule="evenodd"
                  d="M0 0h1v15h15v1H0V0Zm10 11.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-1 0v2.6l-3.613-4.417a.5.5 0 0 0-.74-.037L7.06 8.233 3.404 3.206a.5.5 0 0 0-.808.588l4 5.5a.5.5 0 0 0 .758.06l2.609-2.61L13.445 11H10.5a.5.5 0 0 0-.5.5Z"
                />
              </svg>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
