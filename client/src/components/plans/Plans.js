import './Plans.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Plan from './Plan';
import { useSelector, useDispatch } from 'react-redux';
import { addPlan, loadPlans } from '../../redux/actions/PlansActions';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { animateScroll as scroll } from 'react-scroll';
import AlertSnackBar from '../AlertSnackBar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Plans() {
  const executeReduxAction = useDispatch();
  const plans = useSelector((state) => state.plansReducer);
  const classes = useStyles();
  const [expandedPlan, setExpandedPlan] = React.useState();
  const [planName, setPlanName] = React.useState('');
  const [addPlanButtonDisable, toggleAddPlanButtonDisable] = React.useState(
    false
  );
  const [error, setError] = useState(null);
  const [errorKey, setErrorKey] = useState(null);
  const userId = useSelector((state) => state.authentication.userId);


  const addNewPlan = () => {
    const namesSet = new Set(plans.map((plan) => plan.planName));
    if (namesSet.has(planName)) {
      setError('Plan title should be unique');
      setErrorKey(Math.random());
    } else {
      const newPlan = {
        userId,
        planName,
        tasks: [],
      };

      const actionToExecute = addPlan(newPlan);

      executeReduxAction(actionToExecute).then(() => {
        setPlanName('');
        toggleAddPlanButtonDisable(true);
        setExpandedPlan(newPlan);
        scroll.scrollToBottom();
      });
    }
  };

  const toggleExpanded = (plan) => {
    if (expandedPlan && expandedPlan.planName === plan.planName) {
      setExpandedPlan(null);
    } else {
      setExpandedPlan(plan);
    }
  };

  const handlePlanNameOnChange = (event) => {
    setPlanName(event.target.value);
  };

  useEffect(() => {
    const actionToExecute = loadPlans(userId);
    executeReduxAction(actionToExecute);
  }, []);

  return (
    <div className={classes.root}>
      <div className="add-plan-container">
        <div className="empty-plan-container">
          <Card className={classes.root}>
            <CardContent>
              {plans.length > 0 ? (
                ''
              ) : (
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  You have no studies plan yet
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <AlertSnackBar key={errorKey} error={error} />
              <div className="new-plan-template">
                <TextField
                  id="standard-basic"
                  label="Enter a plan title"
                  value={planName}
                  onChange={handlePlanNameOnChange}
                />
                <div className="add-plan-button">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addNewPlan}
                    disabled={addPlanButtonDisable}
                  >
                    Add a new plan
                  </Button>
                </div>
              </div>
            </CardActions>
          </Card>
        </div>
      </div>
      {plans.map((plan, key) => (
        <Plan
          key={plan._id}
          plan={plan}
          isExpanded={expandedPlan && plan.planName === expandedPlan.planName}
          toggleExpanded={toggleExpanded}
          toggleAddPlanButtonDisable={toggleAddPlanButtonDisable}
        />
      ))}
    </div>
  );
}
