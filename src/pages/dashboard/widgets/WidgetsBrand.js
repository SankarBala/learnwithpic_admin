import React, { memo , useMemo} from 'react'
import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilFeaturedPlaylist, cilGlobeAlt, cilPeople } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'

const chartOptions = {
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
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
}

const WidgetsBrand = ({ withCharts, postCounter, userRoles, visitorCounter, totalVisitor }) => {

  return (
    <CRow>
      <PostCard withCharts postCounter={postCounter} />
      <UserCard withCharts userRoles={userRoles} />
      <VisitorCard withCharts visitorCounter={visitorCounter} totalVisitor={totalVisitor} />
    </CRow>
  )
}

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
}

export default WidgetsBrand;


const PostCard = memo(({ withCharts, postCounter }) => {
  return (
    <CCol sm={12} lg={4}>
      <CWidgetStatsD
        className="mb-4"
        {...(withCharts && {
          chart: (
            <CChart
              className="position-absolute w-100 h-100"
              type="line"
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    backgroundColor: 'rgba(255,255,255,.1)',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [65, 59, 84, 84, 51, 55, 40],
                    fill: true,
                  },
                ],
              }}
              options={chartOptions}
            />
          ),
        })}
        icon={
          <>
            <CIcon icon={cilFeaturedPlaylist} height={36} className="my-4 text-white" />
            <h2 className="my-4 mx-2  text-white">POSTS&nbsp;({postCounter.reduce((total, count) => total + count.count, 0)})</h2>
          </>
        }
        values={postCounter.map((counter, index) => ({ title: counter.status, value: counter.count }))}
        color="primary"
      />
    </CCol>
  )
})

const UserCard = memo(({ withCharts, userRoles }) => {
  return (
    <CCol sm={12} lg={4}>
      <CWidgetStatsD
        className="mb-4"
        {...(withCharts && {
          chart: (
            <CChart
              className="position-absolute w-100 h-100"
              type="line"
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    backgroundColor: 'rgba(255,255,255,.1)',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [1, 13, 9, 17, 34, 41, 38],
                    fill: true,
                  },
                ],
              }}
              options={chartOptions}
            />
          ),
        })}
        icon={
          <>
            <CIcon icon={cilPeople} height={36} className="my-4 text-white" />
            <h2 className="my-4 mx-2  text-white">USERS&nbsp;({userRoles.reduce((total, count) => total + count.count, 0)})</h2>
          </>}

        values={userRoles.map((counter, index) => ({ title: counter.role, value: counter.count }))}
        color="primary"
      />
    </CCol>
  )
})

const VisitorCard = memo(({ withCharts, visitorCounter, totalVisitor }) => {
  return (
    <CCol sm={12} lg={4}>
      <CWidgetStatsD
        className="mb-4"
        {...(withCharts && {
          chart: (
            <CChart
              className="position-absolute w-100 h-100"
              type="line"
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    backgroundColor: 'rgba(255,255,255,.1)',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={chartOptions}
            />
          ),
        })}
        icon={
          <>
            <CIcon icon={cilGlobeAlt} height={36} className="my-4 text-white" />
            <h2 className="my-4 mx-2  text-white">VISITORS&nbsp;({totalVisitor})</h2>
          </>}
        values={visitorCounter.map((counter, index) => ({ title: counter.period, value: counter.count }))}
        color="primary"
      />
    </CCol>
  )
})