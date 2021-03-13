import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import appointments from './today-appointments';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';
import Scheduler from 'devextreme-react/scheduler';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

const currentDate = new Date(2021, 4, 27);
const views = ['week', 'month'];


export default class Agenda extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
    };
  }

  render() {
    const { data } = this.state;

    return (
      <Paper>
      <Link to='/dashboard'>
          <ArrowBackIcon style={{marginTop:'10px', marginLeft:'10px'}}/>
      </Link>
      <Scheduler
        timeZone="America/Los_Angeles"
        dataSource={data}
        views={views}
        defaultCurrentView="week"
        defaultCurrentDate={currentDate}
        height={600}
        startDayHour={9} />
      </Paper>
    );
  }
}