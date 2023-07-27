import React from "react";
import Chart from "react-apexcharts";


export default function Login(){

    
    return (
        <React.Fragment>
      <div >
      

        <Chart
          type="bar"
          width={980}
          height={400}
          series={[
            {
              name: "Aging",
              data: [6578, 6787, 3245, 8876, 2324, 5123, 2435],
            },
          ]}
          options={{
           

            colors: ["#FD8D14"],
            theme: { mode: "light" },

            xaxis: {
              tickPlacement: "on",
         
             
            },

            yaxis: {
              labels: {
                formatter: (val) => {
                  return `${val}`;
                },
                style: { fontSize: "15", colors: ["black"] },
              },
            
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#f4f4f4"],
                fontSize: 15,
              },
            },

            plotOptions: {
                bar: {
                  columnWidth: "45%",
                },
              },
          }}
        ></Chart>
      </div>
    </React.Fragment>
    )
   
}

