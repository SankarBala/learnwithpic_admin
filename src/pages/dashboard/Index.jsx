import React, { memo, useState } from "react";
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import {
  cibCcMastercard,
  cifBd,
  cilArrowRight,
  cilArrowLeft,
  cilPeople,
} from "@coreui/icons";

import avatar1 from "src/assets/images/avatars/1.jpg";

import WidgetsBrand from "./widgets/WidgetsBrand";
import api from "src/api";
import { useEffect } from "react";

const Dashboard = () => {
  const [postCounter, setPostCounter] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  const [visitorCounter, setVisitorCounter] = useState([]);
  const [totalVisitor, setTotalVisitor] = useState();

  const [lineChartData, setLineChartData] = useState([]);
  const [lineChartLabels, setLineChartLabels] = useState([]);
  const [period, setPeriod] = useState("Daily");
  const [range, setRange] = useState("");

  const [visitors, setVisitors] = useState([]);
  const [chartPage, setChartPage] = useState({ total: 1, current: 0 });
  const [topFiveVisitingCountry, setTopFiveVisitingCountry] = useState([]);

  useEffect(() => {
    api
      .get("statistic/post")
      .then((res) => {
        setPostCounter(res.data.postCounter);
      })
      .catch((err) => console.log(err.response.message));

    api
      .get("statistic/user")
      .then((res) => {
        setUserRoles(res.data.userRoles);
      })
      .catch((err) => console.log(err.response.message));

    api
      .get("statistic/visitor")
      .then((res) => {
        setVisitorCounter(res.data.visitorCounter);
        setTotalVisitor(res.data.total);
      })
      .catch((err) => console.log(err.response.message));

    api
      .get("statistic/traffic_chart")
      .then((res) => {
        setVisitors(res.data.visitors);
      })
      .catch((err) => console.log(err.response.message));
  }, []);

  useEffect(() => {
    if (period == "Daily") {
      const endingTime = new Date(
        Date.now() - chartPage.current * 30 * 24 * 60 * 60 * 1000
      );
      const thirtyDaysAgo = new Date(endingTime - 30 * 24 * 60 * 60 * 1000);

      const visits = visitors.filter(
        (visitor, index) =>
          new Date(visitor.created_at) >= thirtyDaysAgo &&
          new Date(visitor.created_at) <= endingTime
      );

      if (visits.length > 0) {
        setRange(
          `${new Date(visits[0].created_at).toLocaleDateString("default", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })} 
            to
          ${new Date(visits.slice(-1)[0].created_at).toLocaleDateString(
            "default",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }
          )}`
        );
        // console.log(new Date(visits.slice(-1)[0].created_at).toLocaleDateString());
      }

      const countedByDay = visits.reduce((counts, item) => {
        const date = new Date(item.created_at).toLocaleDateString("default", {
          month: "long",
          day: "numeric",
        });
        if (!counts[date]) {
          counts[date] = 0;
        }
        counts[date]++;
        return counts;
      }, {});

      // console.log(countedByDay);

      // const countedArray = Object.entries(countedByDay).map(([label, count]) => ({ label, count })).sort((a, b) => b.date - a.date);

      setLineChartLabels(Object.keys(countedByDay));
      setLineChartData(Object.values(countedByDay));

      //Total day count
      const dayCount = visitors.reduce((count, item) => {
        const dates = new Date(item.created_at).toLocaleDateString("default", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        if (!count[dates]) {
          count[dates] = 0;
        }
        count[dates]++;
        return count;
      }, {});

      // console.log(dayCount);
    } else if (period == "Monthly") {

      const today = new Date();

      const endingMonth = new Date(
        today.getFullYear() - chartPage.current,
        today.getMonth() + 1,
        25
      );

      const tweelveMonthBefore = new Date(
        today.getFullYear() - chartPage.current,
        today.getMonth() - 11,
        1
      );

      const visits = visitors.filter(
        (visitor, index) =>
          new Date(visitor.created_at) >= tweelveMonthBefore &&
          new Date(visitor.created_at) <= endingMonth
      );

      const countedByMonth = visits.reduce((counts, item) => {
        const date = new Date(item.created_at).toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        });
        if (!counts[date]) {
          counts[date] = 0;
        }
        counts[date]++;
        return counts;
      }, {});

      setLineChartLabels(Object.keys(countedByMonth));
      setLineChartData(Object.values(countedByMonth));
    } else {
      const countedByYear = visitors.reduce((counts, item) => {
        const date = new Date(item.created_at).toLocaleDateString("default", {
          year: "numeric",
        });
        if (!counts[date]) {
          counts[date] = 0;
        }
        counts[date]++;
        return counts;
      }, {});

      setLineChartLabels(Object.keys(countedByYear));
      setLineChartData(Object.values(countedByYear));
    }
  }, [period, visitors, chartPage]);

  useEffect(() => {
    setChartPage({ ...chartPage, total: 0, current: 0 });
  }, [period]);


  useEffect(() => {
    const countedByCountry = visitors.reduce((counts, item) => {
      const date = item.countryName;
      if (!counts[date]) {
        counts[date] = 0;
      }
      counts[date]++;
      return counts;
    }, {});

    const topFive = Object.entries(countedByCountry)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setTopFiveVisitingCountry(topFive);
  }, [visitors]);

  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const tableExample = [
    {
      avatar: { src: avatar1, status: "success" },
      user: {
        name: "Yiorgos Avraamu",
        new: true,
        registered: "Jan 1, 2021",
      },
      country: { name: "USA", flag: cifBd },
      usage: {
        value: 50,
        period: "Jun 11, 2021 - Jul 10, 2021",
        color: "success",
      },
      payment: { name: "Mastercard", icon: cibCcMastercard },
      activity: "10 sec ago",
    },
  ];

  const changeChartPage = (direction) => {
    if (direction == 1) {
      setChartPage({ ...chartPage, current: [Number(chartPage.current) + 1] });
    } else {
      if (chartPage.current == 0) {
        return;
      } else {
        setChartPage({
          ...chartPage,
          current: [Number(chartPage.current) - 1],
        });
      }
    }
  };

  const lastDateOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  }

  return (
    <>
      <WidgetsBrand
        withCharts
        postCounter={postCounter}
        userRoles={userRoles}
        visitorCounter={visitorCounter}
        totalVisitor={totalVisitor}
      />

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                {period} Visitors
              </h4>
              <div className="text-danger"> {range}</div>
            </CCol>
            <CCol sm={7} className="d-block">
              <CButton
                color="secondary"
                className="float-end"
                onClick={() => changeChartPage(-1)}
                disabled={chartPage.current == 0}
              >
                <CIcon icon={cilArrowRight} />
              </CButton>
              <CButton
                color="secondary mx-2"
                className="float-end"
                onClick={() => changeChartPage(1)}
              >
                <CIcon icon={cilArrowLeft} />
              </CButton>
              <CButtonGroup className=" me-3">
                {["Daily", "Monthly", "Yearly"].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === period}
                    onClick={() => setPeriod(value)}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <LineChart labels={lineChartLabels} data={lineChartData} />
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {topFiveVisitingCountry.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.label}</div>
                <strong>
                  {`${item.count}(${(
                    (item.count * 100) /
                    visitors.length
                  ).toFixed(2)}%)`}
                </strong>
                <CProgress
                  thin
                  className="mt-2"
                  color={""}
                  value={(item.count * 100) / visitors.length}
                />
              </CCol>
            ))}
            {/* <CCol className="mb-sm-2 mb-0" key={6}>
              <div className="text-medium-emphasis">{"Others"}</div>
              <strong>
                {`${ visitors.length } (${ ((visitors.length * 100) / visitors.length).toFixed(2) }%)`}
              </strong>
              <CProgress thin className="mt-2" color={""} value={(visitors.length * 100) / visitors.length} />
            </CCol> */}
          </CRow>
        </CCardFooter>
      </CCard>
      {/* <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Staff</CCardHeader>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                  <CTableHeaderCell>Usage</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Posts</CTableHeaderCell>
                  <CTableHeaderCell>Activity</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tableExample.map((item, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.user.name}</div>
                      <div className="small text-medium-emphasis">
                        <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                        {item.user.registered}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-start">
                          <strong>{item.usage.value}%</strong>
                        </div>
                        <div className="float-end">
                          <small className="text-medium-emphasis">{item.usage.period}</small>
                        </div>
                      </div>
                      <CProgress thin color={item.usage.color} value={item.usage.value} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" icon={item.payment.icon} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="small text-medium-emphasis">Last login</div>
                      <strong>{item.activity}</strong>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCard>
        </CCol>
      </CRow>   */}
    </>
  );
};

export default Dashboard;

const LineChart = memo(({ labels, data }) => {
  return (
    <CChartLine
      style={{ height: "300px", marginTop: "10px" }}
      data={{
        labels: labels,
        datasets: [
          {
            label: "Visitors",
            backgroundColor: "#ddd",
            borderColor: "purple",
            pointHoverBackgroundColor: "#red",
            borderWidth: 1,
            borderDash: [10, 1],
            data: data,
            fill: true,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            grid: {
              drawOnChartArea: false,
            },
          },
          y: {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: 250,
            },
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
          },
        },
      }}
    />
  );
});
