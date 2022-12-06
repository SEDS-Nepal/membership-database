import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


function Clubstepper({page }) {
 
  return (
    <div >
      <Stepper activeStep={page} >
        <Step >
          <StepLabel>Club Info</StepLabel>
        </Step>
        <Step>
          <StepLabel>Question</StepLabel>
        </Step>  
      </Stepper>
    </div>
  );
}

export default Clubstepper;