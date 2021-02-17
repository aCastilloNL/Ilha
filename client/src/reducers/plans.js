const plansReducer = (state = [], action) => {
  const plansArr = [...state] ;

  switch (action.type) {
    case 'ADD_PLAN':
      plansArr.push(action.value);
      return plansArr;

    case 'DELETE_PLAN':
      return plansArr.filter(plan => plan._id !== action.value);

    case 'ADD_TASK':
      const uselessPlan = plansArr.filter(plan => plan._id === action.value.planId);
      uselessPlan[0].tasks.push(action.value);
      plansArr.filter(plan => plan._id !== action.value.planId).push(uselessPlan);
       
      return plansArr;

    case 'DELETE_TASK':
      const planToDeleteTask = plansArr[action.value.planId];
      delete planToDeleteTask.tasks[action.value.id];
      return plansArr;

    case 'UPDATE_TASK':
      const planToUpdateTask = plansArr[action.value.planId];
      planToUpdateTask.tasks[action.value.id] = action.value;
      return plansArr;

    default:
      return state;
  }
};

export default plansReducer;
