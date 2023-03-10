import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


function Progressbar({page }) {
 
  return (
    <div >
      <Stepper activeStep={page} >
        <Step >
          <StepLabel>Personal Info</StepLabel>
        </Step>
        <Step>
          <StepLabel>Education</StepLabel>
        </Step>
        <Step>
          <StepLabel>Job</StepLabel>
        </Step>
        <Step >
          <StepLabel>Question</StepLabel>
        </Step>
      </Stepper>
    </div>
  );
}

export default Progressbar;