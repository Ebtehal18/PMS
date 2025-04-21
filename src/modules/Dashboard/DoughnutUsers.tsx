import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";

import { ChartOptions } from "chart.js";
import { axiosPrivateInstance } from "../../services/api/apiInstance";
import { USERS_URLS } from "../../services/api/apiConfig";

export default function DoughnutUsers() {
    const [chartData, setChartData] = useState({
        labels: ["Active", "Inactive"],
        datasets: [
          {
            label: "Users",
            data: [0, 0], // Default values
            backgroundColor: [
              "rgba(229, 230, 244, 1)",
              "rgba(244, 244, 229, 1)",
            ],
          },
        ],
      });
    
      const getTasksCount = async () => {
        try {
          const response = await axiosPrivateInstance.get(USERS_URLS.GET_USERS_COUNT);
       
          const { activatedEmployeeCount,deactivatedEmployeeCount } = response?.data;
    
          setChartData((prevChartData)=>({
            ...prevChartData,

            datasets:prevChartData.datasets.map((dataset)=>({
                ...dataset,

                data:[activatedEmployeeCount,deactivatedEmployeeCount]
            }))
          }))
         
 
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        getTasksCount();
      }, []);
    
      const options:ChartOptions<"doughnut"> = {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "User Status Distribution" },
        },
      };
      const userStatuses = [
        { title: "active", icon: "fa-solid fa-chart-line", className: "todo", Index: 0 },
        { title: "inactive", icon: "fa-solid fa-list-check", className: "progress", Index: 1 },
      ];
      return<>
      <div className="card-info py-3">
        <div className="card-heading ps-3">
          <span>Users</span>
          <p>Lorem ipsum dolor sit amet,consecteture</p>
        </div>
        <Row className="px-3 g-3">
            {userStatuses.map((user)=> <Col >
            <Card className={`${user.className} p-3 h-100` } >
            <span className="rounded-full d-flex justify-content-center align-items-center rounded-circle circle">   <i className={user.icon}></i></span>
    
          <Card.Body className="ps-0 pe-3 pb-0">
            <Card.Title>{user.title}</Card.Title>
            <Card.Text>
            <p>{chartData.datasets[0].data[user.Index]}</p>
            </Card.Text>
          </Card.Body>
        </Card>
            </Col>)}
           
     
       
        </Row>
      </div>
      

      <div >
      <Doughnut data={chartData} options={options}  />
      </div>
      
      </>;
}
