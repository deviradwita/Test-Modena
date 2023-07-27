import React  from "react";
import  Chart  from "react-apexcharts";

export default function Piechart({revenue}) {
  const subject = ["Closed", "Open", "Reject", "Approve", "Pending"]

 

  return <div>

<React.Fragment>
            <div >
              
                <Chart 
                type="donut"
                width={549}
                height={550}

                series={ revenue }                

                options={{
                        
                       noData:{text:"Empty Data"},                        
                      // colors:["#f90000","#f0f"],
                      labels:subject                   

                 }}
                >
                </Chart>
            </div>
        </React.Fragment>
  </div>;
}
